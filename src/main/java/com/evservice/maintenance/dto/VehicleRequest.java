package com.evservice.maintenance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class VehicleRequest {
    @NotBlank
    private String vin;

    @NotBlank
    private String model;

    @NotBlank
    private String brand;

    @NotNull
    private Integer year;

    private String color;
    private String licensePlate;
    private Integer currentMileage = 0;
    private Integer maintenanceIntervalKm;
    private Integer maintenanceIntervalDays;
    private LocalDate servicePackageExpiry;
}


