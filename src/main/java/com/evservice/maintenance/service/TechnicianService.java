package com.evservice.maintenance.service;

import com.evservice.maintenance.model.*;

import java.math.BigDecimal;
import java.util.List;

public interface TechnicianService {
    List<ServiceAppointment> getMyAssignedAppointments(Long technicianId);
    ServiceRecord startService(Long appointmentId);
    ServiceRecord updateServiceRecord(Long recordId, String vehicleCondition,
                                     String workPerformed, String notes,
                                     String batteryCheck, String motorCheck,
                                     String chargingSystemCheck);
    ServicePartsUsage useParts(Long recordId, Long partsId, Integer quantity);
    ServiceRecord completeService(Long recordId, BigDecimal laborCost);
    TechnicianSchedule createSchedule(Long technicianId,
                                      java.time.LocalDate workDate,
                                      java.time.LocalTime startTime,
                                      java.time.LocalTime endTime,
                                      String shiftType);
}


