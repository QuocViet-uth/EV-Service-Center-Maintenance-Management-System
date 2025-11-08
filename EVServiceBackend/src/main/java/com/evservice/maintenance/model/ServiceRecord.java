package com.evservice.maintenance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "service_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false)
    private ServiceAppointment appointment;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
    
    private Integer mileageAtService;
    private String vehicleCondition; // Tình trạng xe
    private String workPerformed; // Công việc đã thực hiện
    private String notes; // Ghi chú kỹ thuật
    
    // Checklist EV
    private String batteryCheck; // Kiểm tra pin
    private String motorCheck; // Kiểm tra động cơ
    private String chargingSystemCheck; // Kiểm tra hệ thống sạc
    private String otherChecks; // Các kiểm tra khác (JSON format)
    
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    
    @OneToMany(mappedBy = "serviceRecord", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ServicePartsUsage> partsUsed = new HashSet<>();
    
    @OneToOne(mappedBy = "serviceRecord", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Invoice invoice;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}


