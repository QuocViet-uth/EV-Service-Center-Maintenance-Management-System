package com.evservice.maintenance.repository;

import com.evservice.maintenance.model.Payment;
import com.evservice.maintenance.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByTransactionId(String transactionId);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByInvoiceId(Long invoiceId);
}


