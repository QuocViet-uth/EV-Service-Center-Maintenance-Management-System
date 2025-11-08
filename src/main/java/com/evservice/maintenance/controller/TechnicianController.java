package com.evservice.maintenance.controller;

import com.evservice.maintenance.model.*;
import com.evservice.maintenance.repository.UserRepository;
import com.evservice.maintenance.service.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/technician")
@CrossOrigin(origins = "*")
public class TechnicianController {
    
    @Autowired
    private TechnicianService technicianService;
    
    @Autowired
    private UserRepository userRepository;
    
    // Lấy danh sách công việc
    @GetMapping("/appointments")
    public ResponseEntity<List<ServiceAppointment>> getMyAppointments(Authentication authentication) {
        Long technicianId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(technicianService.getMyAssignedAppointments(technicianId));
    }
    
    // Bắt đầu bảo dưỡng
    @PostMapping("/service/start/{appointmentId}")
    public ResponseEntity<ServiceRecord> startService(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(technicianService.startService(appointmentId));
    }
    
    // Ghi nhận tình trạng và công việc
    @PutMapping("/service/{recordId}")
    public ResponseEntity<ServiceRecord> updateServiceRecord(
            @PathVariable Long recordId,
            @RequestParam(required = false) String vehicleCondition,
            @RequestParam(required = false) String workPerformed,
            @RequestParam(required = false) String notes,
            @RequestParam(required = false) String batteryCheck,
            @RequestParam(required = false) String motorCheck,
            @RequestParam(required = false) String chargingSystemCheck) {
        return ResponseEntity.ok(technicianService.updateServiceRecord(
                recordId, vehicleCondition, workPerformed, notes,
                batteryCheck, motorCheck, chargingSystemCheck));
    }
    
    // Sử dụng phụ tùng
    @PostMapping("/service/{recordId}/parts")
    public ResponseEntity<ServicePartsUsage> useParts(
            @PathVariable Long recordId,
            @RequestParam Long partsId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(technicianService.useParts(recordId, partsId, quantity));
    }
    
    // Hoàn thành bảo dưỡng
    @PostMapping("/service/{recordId}/complete")
    public ResponseEntity<ServiceRecord> completeService(
            @PathVariable Long recordId,
            @RequestParam BigDecimal laborCost) {
        return ResponseEntity.ok(technicianService.completeService(recordId, laborCost));
    }
    
    // Quản lý lịch làm việc
    @PostMapping("/schedule")
    public ResponseEntity<TechnicianSchedule> createSchedule(
            Authentication authentication,
            @RequestParam LocalDate workDate,
            @RequestParam LocalTime startTime,
            @RequestParam LocalTime endTime,
            @RequestParam String shiftType) {
        Long technicianId = getUserIdFromAuthentication(authentication);
        return ResponseEntity.ok(technicianService.createSchedule(
                technicianId, workDate, startTime, endTime, shiftType));
    }
    
    private Long getUserIdFromAuthentication(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .map(user -> user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

