package com.evservice.maintenance.service;

import com.evservice.maintenance.dto.PaymentRequest;
import com.evservice.maintenance.model.Invoice;
import com.evservice.maintenance.model.Payment;
import com.evservice.maintenance.model.enums.PaymentStatus;
import com.evservice.maintenance.repository.InvoiceRepository;
import com.evservice.maintenance.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PaymentServiceImpl implements PaymentService {
    
    @Autowired
    private InvoiceRepository invoiceRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Override
    @Transactional
    public Payment processPayment(PaymentRequest request) {
        Invoice invoice = invoiceRepository.findById(request.getInvoiceId())
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        
        if (invoice.getPaymentStatus() == PaymentStatus.COMPLETED) {
            throw new RuntimeException("Invoice already paid");
        }
        
        Payment payment = new Payment();
        payment.setInvoice(invoice);
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setAmount(invoice.getTotalAmount());
        payment.setPaymentReference(request.getPaymentReference());
        payment.setPaymentProvider(request.getPaymentProvider());
        payment.setStatus(PaymentStatus.PENDING);
        
        payment = paymentRepository.save(payment);
        
        if (processPaymentGateway(payment)) {
            payment.setStatus(PaymentStatus.COMPLETED);
            payment.setPaidAt(LocalDateTime.now());
            invoice.setPaymentStatus(PaymentStatus.COMPLETED);
            
            paymentRepository.save(payment);
            invoiceRepository.save(invoice);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            throw new RuntimeException("Payment processing failed");
        }
        
        return payment;
    }
    
    private boolean processPaymentGateway(Payment payment) {
        return true;
    }
    
    @Override
    public Payment getPaymentByInvoice(Long invoiceId) {
        return paymentRepository.findByInvoiceId(invoiceId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    @Transactional
    public Payment markInvoicePaidOffline(Long invoiceId, String reference) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        
        if (invoice.getPaymentStatus() == PaymentStatus.COMPLETED) {
            return invoice.getPayment();
        }
        
        Payment payment = new Payment();
        payment.setInvoice(invoice);
        payment.setPaymentMethod(com.evservice.maintenance.model.enums.PaymentMethod.BANK_TRANSFER);
        payment.setAmount(invoice.getTotalAmount());
        payment.setPaymentReference(reference != null ? reference : "OFFLINE-" + System.currentTimeMillis());
        payment.setPaymentProvider("OFFLINE");
        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setPaidAt(java.time.LocalDateTime.now());
        
        payment = paymentRepository.save(payment);
        invoice.setPaymentStatus(PaymentStatus.COMPLETED);
        invoiceRepository.save(invoice);
        return payment;
    }
}


