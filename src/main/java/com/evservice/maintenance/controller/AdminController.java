package com.evservice.maintenance.controller;

import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.ServiceType;
import com.evservice.maintenance.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    // Quản lý phụ tùng
    @PostMapping("/parts")
    public ResponseEntity<Parts> addParts(
            @RequestParam Long serviceCenterId,
            @RequestParam String partCode,
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam String category,
            @RequestParam(required = false) String manufacturer,
            @RequestParam Integer quantity,
            @RequestParam Integer minimumStockLevel,
            @RequestParam BigDecimal unitPrice) {
        return ResponseEntity.ok(adminService.addParts(
                serviceCenterId, partCode, name, description, category,
                manufacturer, quantity, minimumStockLevel, unitPrice));
    }
    
    @PutMapping("/parts/{partsId}/stock")
    public ResponseEntity<Parts> updatePartsStock(
            @PathVariable Long partsId,
            @RequestParam Integer newQuantity) {
        return ResponseEntity.ok(adminService.updatePartsStock(partsId, newQuantity));
    }
    
    @GetMapping("/parts/low-stock")
    public ResponseEntity<List<Parts>> getLowStockParts(@RequestParam Long serviceCenterId) {
        return ResponseEntity.ok(adminService.getLowStockParts(serviceCenterId));
    }
    
    // Quản lý nhân sự
    @PostMapping("/technicians")
    public ResponseEntity<User> createTechnician(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String fullName,
            @RequestParam String phoneNumber,
            @RequestParam(required = false) String certifications) {
        return ResponseEntity.ok(adminService.createTechnician(
                username, email, password, fullName, phoneNumber, certifications));
    }
    
    @PostMapping("/staff")
    public ResponseEntity<User> createStaff(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String fullName,
            @RequestParam String phoneNumber,
            @RequestParam String department) {
        return ResponseEntity.ok(adminService.createStaff(
                username, email, password, fullName, phoneNumber, department));
    }
    
    // Quản lý trung tâm dịch vụ
    @PostMapping("/service-centers")
    public ResponseEntity<ServiceCenter> createServiceCenter(
            @RequestParam String name,
            @RequestParam String address,
            @RequestParam String phoneNumber,
            @RequestParam String email) {
        return ResponseEntity.ok(adminService.createServiceCenter(name, address, phoneNumber, email));
    }
    
    // Báo cáo tài chính
    @GetMapping("/reports/financial")
    public ResponseEntity<Map<String, Object>> getFinancialReport(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        return ResponseEntity.ok(adminService.getFinancialReport(startDate, endDate));
    }
    
    // Thống kê loại dịch vụ phổ biến
    @GetMapping("/reports/popular-services")
    public ResponseEntity<Map<ServiceType, Long>> getPopularServiceTypes(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        return ResponseEntity.ok(adminService.getPopularServiceTypes(startDate, endDate));
    }
    
    // Thống kê xu hướng hỏng hóc
    @GetMapping("/reports/failure-trends")
    public ResponseEntity<Map<String, Long>> getFailureTrends() {
        return ResponseEntity.ok(adminService.getFailureTrends());
    }

    // Báo cáo lợi nhuận
    @GetMapping("/reports/profit")
    public ResponseEntity<Map<String, Object>> getProfitReport(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        return ResponseEntity.ok(adminService.getProfitReport(startDate, endDate));
    }

    // Hiệu suất kỹ thuật viên
    @GetMapping("/reports/technician-performance")
    public ResponseEntity<Map<String, Object>> getTechnicianPerformance(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        return ResponseEntity.ok(adminService.getTechnicianPerformance(startDate, endDate));
    }

    // Ước tính báo giá
    @PostMapping("/quotes/estimate")
    public ResponseEntity<Map<String, Object>> estimateQuotation(
            @RequestParam Long serviceCenterId,
            @RequestParam(required = false) java.util.List<Long> partsIds,
            @RequestParam(required = false) java.util.List<Integer> quantities,
            @RequestParam(required = false) java.math.BigDecimal laborCost,
            @RequestParam(required = false) java.math.BigDecimal serviceFee,
            @RequestParam(required = false) java.math.BigDecimal discount,
            @RequestParam(required = false) java.math.BigDecimal tax) {
        return ResponseEntity.ok(adminService.estimateQuotation(serviceCenterId, partsIds, quantities, laborCost, serviceFee, discount, tax));
    }
}


