package com.evservice.maintenance.controller;

import com.evservice.maintenance.dto.PaymentRequest;
import com.evservice.maintenance.model.Payment;
import com.evservice.maintenance.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/process")
    public ResponseEntity<Payment> processPayment(@Valid @RequestBody PaymentRequest request) {
        return ResponseEntity.ok(paymentService.processPayment(request));
    }

    @GetMapping("/invoice/{invoiceId}")
    public ResponseEntity<Payment> getPaymentByInvoice(@PathVariable Long invoiceId) {
        return ResponseEntity.ok(paymentService.getPaymentByInvoice(invoiceId));
    }

    @PostMapping("/invoice/{invoiceId}/mark-offline-paid")
    public ResponseEntity<Payment> markOfflinePaid(
            @PathVariable Long invoiceId,
            @RequestParam(required = false) String reference) {
        return ResponseEntity.ok(paymentService.markInvoicePaidOffline(invoiceId, reference));
    }
}


