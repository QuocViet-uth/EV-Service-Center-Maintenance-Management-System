package com.evservice.maintenance.repository;

import com.evservice.maintenance.model.Invoice;
import com.evservice.maintenance.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
    List<Invoice> findByCustomerId(Long customerId);
    List<Invoice> findByPaymentStatus(PaymentStatus status);
    List<Invoice> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}


