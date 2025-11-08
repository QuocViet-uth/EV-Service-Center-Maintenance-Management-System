package com.evservice.maintenance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "parts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Parts {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(unique = true)
    private String partCode; // Mã phụ tùng
    
    @NotBlank
    private String name;
    
    private String description;
    private String category; // Danh mục (Pin, Motor, Charger, etc.)
    private String manufacturer; // Nhà sản xuất
    
    @NotNull
    private Integer quantityInStock = 0;
    
    @NotNull
    private Integer minimumStockLevel = 10; // Mức tồn kho tối thiểu
    
    @NotNull
    private BigDecimal unitPrice;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_center_id")
    private ServiceCenter serviceCenter;
    
    // AI gợi ý
    private Integer aiSuggestedStockLevel; // Mức tồn kho AI đề xuất
    
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


