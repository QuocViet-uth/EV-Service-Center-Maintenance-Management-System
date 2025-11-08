package com.evservice.maintenance.dto;

import com.evservice.maintenance.model.enums.ServiceType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ServiceAppointmentRequest {
    @NotNull
    private Long vehicleId;
    
    @NotNull
    private Long serviceCenterId;
    
    @NotNull
    private ServiceType serviceType;
    
    @NotNull
    private LocalDateTime scheduledDateTime;
    
    private String description;
    private String customerNotes;
}


