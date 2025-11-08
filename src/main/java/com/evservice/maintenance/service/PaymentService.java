package com.evservice.maintenance.service;

import com.evservice.maintenance.dto.PaymentRequest;
import com.evservice.maintenance.model.Payment;

public interface PaymentService {
    Payment processPayment(PaymentRequest request);
    Payment getPaymentByInvoice(Long invoiceId);
    Payment markInvoicePaidOffline(Long invoiceId, String reference);
}


