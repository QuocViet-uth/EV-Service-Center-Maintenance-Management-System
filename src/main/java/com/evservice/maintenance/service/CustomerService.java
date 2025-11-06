package com.evservice.maintenance.service;

import com.evservice.maintenance.dto.ServiceAppointmentRequest;
import com.evservice.maintenance.dto.VehicleRequest;
import com.evservice.maintenance.model.*;

import java.util.List;

public interface CustomerService {
    Vehicle addVehicle(Long userId, VehicleRequest request);
    List<Vehicle> getMyVehicles(Long userId);
    List<ServiceRecord> getServiceHistory(Long userId, Long vehicleId);
    ServiceAppointment createAppointment(Long userId, ServiceAppointmentRequest request);
    List<ServiceAppointment> getMyAppointments(Long userId);
    List<Invoice> getMyInvoices(Long userId);
}


