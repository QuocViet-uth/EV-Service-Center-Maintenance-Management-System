package com.evservice.maintenance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(unique = true)
    private String vin; // Vehicle Identification Number
    
    @NotBlank
    private String model;
    
    @NotBlank
    private String brand;
    
    @NotNull
    private Integer year;
    
    private String color;
    private String licensePlate;
    
    // Thông tin bảo dưỡng
    private Integer currentMileage = 0;
    private Integer lastMaintenanceMileage = 0;
    private LocalDate lastMaintenanceDate;
    
    // Gói bảo dưỡng
    private Integer maintenanceIntervalKm; // Khoảng cách bảo dưỡng (km)
    private Integer maintenanceIntervalDays; // Khoảng thời gian bảo dưỡng (ngày)
    private LocalDate servicePackageExpiry; // Hết hạn gói dịch vụ
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ServiceAppointment> appointments = new HashSet<>();
    
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ServiceRecord> serviceRecords = new HashSet<>();
    
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


