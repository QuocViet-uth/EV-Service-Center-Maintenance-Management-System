package com.evservice.maintenance.dto;

import com.evservice.maintenance.model.enums.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentRequest {
    @NotNull
    private Long invoiceId;

    @NotNull
    private PaymentMethod paymentMethod;

    private String paymentReference;
    private String paymentProvider;
}


