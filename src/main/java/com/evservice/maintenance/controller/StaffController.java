package com.evservice.maintenance.controller;

import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.AppointmentStatus;
import com.evservice.maintenance.repository.UserRepository;
import com.evservice.maintenance.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*")
public class StaffController {
    
    @Autowired
    private StaffService staffService;
    
    @Autowired
    private UserRepository userRepository;
    
    // Quản lý lịch hẹn
    @GetMapping("/appointments/pending")
    public ResponseEntity<List<ServiceAppointment>> getPendingAppointments(
            @RequestParam Long serviceCenterId) {
        return ResponseEntity.ok(staffService.getPendingAppointments(serviceCenterId));
    }

    @GetMapping("/appointments/queue")
    public ResponseEntity<List<ServiceAppointment>> getWaitingQueue(
            @RequestParam Long serviceCenterId) {
        return ResponseEntity.ok(staffService.getWaitingQueue(serviceCenterId));
    }
    
    @PutMapping("/appointments/{appointmentId}/confirm")
    public ResponseEntity<ServiceAppointment> confirmAppointment(
            @PathVariable Long appointmentId,
            @RequestParam Long technicianId) {
        return ResponseEntity.ok(staffService.confirmAppointment(appointmentId, technicianId));
    }
    
    @PutMapping("/appointments/{appointmentId}/status")
    public ResponseEntity<ServiceAppointment> updateAppointmentStatus(
            @PathVariable Long appointmentId,
            @RequestParam AppointmentStatus status) {
        return ResponseEntity.ok(staffService.updateAppointmentStatus(appointmentId, status));
    }
    
    // Quản lý khách hàng
    @GetMapping("/customers")
    public ResponseEntity<List<User>> getAllCustomers() {
        return ResponseEntity.ok(staffService.getAllCustomers());
    }
    
    @GetMapping("/vehicles/{vehicleId}")
    public ResponseEntity<Vehicle> getVehicleDetails(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(staffService.getVehicleDetails(vehicleId));
    }
    
    @GetMapping("/vehicles/{vehicleId}/history")
    public ResponseEntity<List<ServiceRecord>> getVehicleServiceHistory(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(staffService.getVehicleServiceHistory(vehicleId));
    }
    
    // Chat với khách hàng
    @PostMapping("/chat/send")
    public ResponseEntity<ChatMessage> sendMessage(
            Authentication authentication,
            @RequestParam Long receiverId,
            @RequestParam(required = false) Long appointmentId,
            @RequestBody String message) {
        Long senderId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(staffService.sendMessage(senderId, receiverId, appointmentId, message));
    }
    
    @GetMapping("/chat/appointment/{appointmentId}")
    public ResponseEntity<List<ChatMessage>> getMessagesForAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(staffService.getMessagesForAppointment(appointmentId));
    }
    
    private Long getUserIdFromAuthentication(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .map(user -> user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

