package com.evservice.maintenance.service;

import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.AppointmentStatus;
import com.evservice.maintenance.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {
    
    @Autowired
    private ServiceAppointmentRepository appointmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    @Autowired
    private ServiceCenterRepository serviceCenterRepository;
    
    @Autowired
    private ServiceRecordRepository serviceRecordRepository;
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    @Override
    public List<ServiceAppointment> getPendingAppointments(Long serviceCenterId) {
        return appointmentRepository.findByServiceCenterIdAndStatus(serviceCenterId, AppointmentStatus.PENDING);
    }
    
    @Override
    public ServiceAppointment confirmAppointment(Long appointmentId, Long technicianId) {
        ServiceAppointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        User technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new RuntimeException("Technician not found"));
        
        appointment.setTechnician(technician);
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        
        return appointmentRepository.save(appointment);
    }
    
    @Override
    public ServiceAppointment updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        ServiceAppointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
    
    @Override
    public List<User> getAllCustomers() {
        return userRepository.findAll().stream()
                .filter(user -> user instanceof Customer)
                .toList();
    }
    
    @Override
    public Vehicle getVehicleDetails(Long vehicleId) {
        return vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }
    
    @Override
    public List<ServiceRecord> getVehicleServiceHistory(Long vehicleId) {
        return serviceRecordRepository.findByVehicleId(vehicleId);
    }
    
    @Override
    public ChatMessage sendMessage(Long senderId, Long receiverId, Long appointmentId, String message) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));
        
        ServiceAppointment appointment = null;
        if (appointmentId != null) {
            appointment = appointmentRepository.findById(appointmentId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));
        }
        
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setSender(sender);
        chatMessage.setReceiver(receiver);
        chatMessage.setAppointment(appointment);
        chatMessage.setMessage(message);
        chatMessage.setRead(false);
        
        return chatMessageRepository.save(chatMessage);
    }
    
    @Override
    public List<ChatMessage> getMessagesForAppointment(Long appointmentId) {
        return chatMessageRepository.findByAppointmentId(appointmentId);
    }

    @Override
    public List<ServiceAppointment> getWaitingQueue(Long serviceCenterId) {
        return appointmentRepository.findByServiceCenterIdAndStatus(serviceCenterId, AppointmentStatus.PENDING);
    }
}