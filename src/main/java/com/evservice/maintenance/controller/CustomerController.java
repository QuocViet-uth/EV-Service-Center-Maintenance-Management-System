package com.evservice.maintenance.controller;

import com.evservice.maintenance.dto.ServiceAppointmentRequest;
import com.evservice.maintenance.dto.VehicleRequest;
import com.evservice.maintenance.model.*;
import com.evservice.maintenance.repository.UserRepository;
import com.evservice.maintenance.service.CustomerService;
import com.evservice.maintenance.service.MaintenanceReminderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "*")
public class CustomerController {
    
    @Autowired
    private CustomerService customerService;
    
    @Autowired
    private MaintenanceReminderService reminderService;
    
    @Autowired
    private UserRepository userRepository;
    
    // Quản lý xe
    @PostMapping("/vehicles")
    public ResponseEntity<Vehicle> addVehicle(Authentication authentication, 
                                             @Valid @RequestBody VehicleRequest request) {
        Long userId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(customerService.addVehicle(userId, request));
    }
    
    @GetMapping("/vehicles")
    public ResponseEntity<List<Vehicle>> getMyVehicles(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(customerService.getMyVehicles(userId));
    }
    
    @GetMapping("/vehicles/{vehicleId}/history")
    public ResponseEntity<List<ServiceRecord>> getServiceHistory(Authentication authentication,
                                                                 @PathVariable Long vehicleId) {
        Long userId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(customerService.getServiceHistory(userId, vehicleId));
    }
    
    // Đặt lịch dịch vụ
    @PostMapping("/appointments")
    public ResponseEntity<ServiceAppointment> createAppointment(Authentication authentication,
                                                               @Valid @RequestBody ServiceAppointmentRequest request) {
        Long userId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(customerService.createAppointment(userId, request));
    }
    
    @GetMapping("/appointments")
    public ResponseEntity<List<ServiceAppointment>> getMyAppointments(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(customerService.getMyAppointments(userId));
    }
    
    // Theo dõi và nhắc nhở
    @GetMapping("/reminders")
    public ResponseEntity<List<MaintenanceReminder>> getReminders(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(reminderService.getRemindersForUser(userId));
    }
    
    // Quản lý hóa đơn và thanh toán
    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getMyInvoices(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(customerService.getMyInvoices(userId));
    }
    
    private Long getUserIdFromAuthentication(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .map(user -> user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

