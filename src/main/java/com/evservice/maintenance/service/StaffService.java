package com.evservice.maintenance.service;

import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.AppointmentStatus;

import java.util.List;

public interface StaffService {
    List<ServiceAppointment> getPendingAppointments(Long serviceCenterId);
    ServiceAppointment confirmAppointment(Long appointmentId, Long technicianId);
    ServiceAppointment updateAppointmentStatus(Long appointmentId, AppointmentStatus status);
    List<User> getAllCustomers();
    Vehicle getVehicleDetails(Long vehicleId);
    List<ServiceRecord> getVehicleServiceHistory(Long vehicleId);
    ChatMessage sendMessage(Long senderId, Long receiverId, Long appointmentId, String message);
    List<ChatMessage> getMessagesForAppointment(Long appointmentId);
    List<ServiceAppointment> getWaitingQueue(Long serviceCenterId);
}