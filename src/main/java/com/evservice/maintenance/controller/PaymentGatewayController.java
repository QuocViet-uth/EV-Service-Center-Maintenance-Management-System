package com.evservice.maintenance.controller;

import com.evservice.maintenance.service.PaymentGatewayClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/api/payment/gateway")
@CrossOrigin(origins = "*")
public class PaymentGatewayController {

    @Autowired
    private PaymentGatewayClient gatewayClient;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> create(@RequestParam Long invoiceId, HttpServletRequest request) {
        String ip = request.getRemoteAddr();
        String payUrl = gatewayClient.startVnPayPayment(invoiceId, ip);
        return ResponseEntity.ok(Map.of("payUrl", payUrl));
    }

    @PostMapping("/ipn")
    public ResponseEntity<String> ipn(@RequestParam Map<String, String> params) {
        boolean ok = gatewayClient.handleVnPayIpn(params);
        return ResponseEntity.ok(ok ? "OK" : "INVALID" );
    }
}


