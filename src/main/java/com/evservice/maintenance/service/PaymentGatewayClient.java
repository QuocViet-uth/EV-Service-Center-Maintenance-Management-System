package com.evservice.maintenance.service;

import com.evservice.maintenance.config.PaymentGatewayProperties;
import com.evservice.maintenance.model.Invoice;
import com.evservice.maintenance.model.Payment;
import com.evservice.maintenance.model.enums.PaymentStatus;
import com.evservice.maintenance.repository.InvoiceRepository;
import com.evservice.maintenance.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PaymentGatewayClient {
    @Autowired
    private PaymentGatewayProperties props;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public String startVnPayPayment(Long invoiceId, String ipAddress) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        String vnp_TmnCode = props.getVnpTmnCode();
        String vnp_HashSecret = props.getVnpHashSecret();
        String vnp_Url = props.getVnpPayUrl();
        String vnp_ReturnUrl = props.getReturnUrl();

        Map<String, String> vnp_Params = new LinkedHashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", invoice.getTotalAmount().multiply(java.math.BigDecimal.valueOf(100)).toBigInteger().toString());
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", invoice.getInvoiceNumber());
        vnp_Params.put("vnp_OrderInfo", "Payment for invoice " + invoice.getInvoiceNumber());
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        if (ipAddress != null) {
            vnp_Params.put("vnp_IpAddr", ipAddress);
        }
        LocalDateTime now = LocalDateTime.now();
        vnp_Params.put("vnp_CreateDate", now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));
        vnp_Params.put("vnp_ExpireDate", now.plusMinutes(props.getExpireMinutes()).format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));

        String query = buildQuery(vnp_Params);
        String secureHash = hmacSHA512(vnp_HashSecret, query);
        String payUrl = vnp_Url + "?" + query + "&vnp_SecureHash=" + secureHash;

        Payment payment = new Payment();
        payment.setInvoice(invoice);
        payment.setAmount(invoice.getTotalAmount());
        payment.setPaymentMethod(com.evservice.maintenance.model.enums.PaymentMethod.E_WALLET);
        payment.setPaymentProvider("VNPAY");
        payment.setStatus(PaymentStatus.PENDING);
        paymentRepository.save(payment);

        return payUrl;
    }

    public boolean handleVnPayIpn(Map<String, String> params) {
        String vnp_SecureHash = params.remove("vnp_SecureHash");
        String vnp_SecureHashType = params.remove("vnp_SecureHashType");
        String invoiceNumber = params.get("vnp_TxnRef");
        String responseCode = params.get("vnp_ResponseCode");

        String signData = buildQuery(new TreeMap<>(params));
        String checkHash = hmacSHA512(props.getVnpHashSecret(), signData);
        if (!Objects.equals(checkHash, vnp_SecureHash)) {
            return false;
        }

        Invoice invoice = invoiceRepository.findByInvoiceNumber(invoiceNumber)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        if ("00".equals(responseCode)) {
            invoice.setPaymentStatus(com.evservice.maintenance.model.enums.PaymentStatus.COMPLETED);
            invoiceRepository.save(invoice);

            Payment payment = new Payment();
            payment.setInvoice(invoice);
            payment.setAmount(invoice.getTotalAmount());
            payment.setPaymentMethod(com.evservice.maintenance.model.enums.PaymentMethod.E_WALLET);
            payment.setPaymentProvider("VNPAY");
            payment.setStatus(PaymentStatus.COMPLETED);
            payment.setPaidAt(LocalDateTime.now());
            paymentRepository.save(payment);
        }
        return true;
    }

    private String buildQuery(Map<String, String> params) {
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        for (Map.Entry<String, String> entry : new TreeMap<>(params).entrySet()) {
            if (!first) sb.append('&');
            sb.append(entry.getKey()).append('=')
              .append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
            first = false;
        }
        return sb.toString();
    }

    private String hmacSHA512(String key, String data) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            hmac.init(secretKey);
            byte[] hash = hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder(hash.length * 2);
            for (byte b : hash) {
                String h = Integer.toHexString(0xFF & b);
                if (h.length() == 1) hex.append('0');
                hex.append(h);
            }
            return hex.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}


