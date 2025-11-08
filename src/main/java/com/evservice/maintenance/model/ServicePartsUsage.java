package com.evservice.maintenance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_parts_usage")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicePartsUsage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_record_id", nullable = false)
    private ServiceRecord serviceRecord;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parts_id", nullable = false)
    private Parts parts;
    
    @NotNull
    private Integer quantity;
    
    @NotNull
    private BigDecimal unitPrice;
    
    private BigDecimal totalPrice; // quantity * unitPrice
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (unitPrice != null && quantity != null) {
            totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));
        }
    }
}


