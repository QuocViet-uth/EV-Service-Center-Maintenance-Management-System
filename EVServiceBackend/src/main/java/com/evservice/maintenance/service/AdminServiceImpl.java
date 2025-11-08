package com.evservice.maintenance.service;

import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.ServiceType;
import com.evservice.maintenance.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ServiceCenterRepository serviceCenterRepository;
    
    @Autowired
    private PartsRepository partsRepository;
    
    @Autowired
    private InvoiceRepository invoiceRepository;
    
    @Autowired
    private ServiceAppointmentRepository appointmentRepository;
    
    @Autowired
    private ServiceRecordRepository serviceRecordRepository;
    
    @Autowired
    private PartsInventoryService partsInventoryService;
    
    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    
    @Override
    public Parts addParts(Long serviceCenterId, String partCode, String name,
                          String description, String category, String manufacturer,
                          Integer quantity, Integer minimumStockLevel, BigDecimal unitPrice) {
        ServiceCenter serviceCenter = serviceCenterRepository.findById(serviceCenterId)
                .orElseThrow(() -> new RuntimeException("Service center not found"));
        
        Parts parts = new Parts();
        parts.setPartCode(partCode);
        parts.setName(name);
        parts.setDescription(description);
        parts.setCategory(category);
        parts.setManufacturer(manufacturer);
        parts.setQuantityInStock(quantity);
        parts.setMinimumStockLevel(minimumStockLevel);
        parts.setUnitPrice(unitPrice);
        parts.setServiceCenter(serviceCenter);
        
        Integer aiSuggested = partsInventoryService.suggestStockLevel(partCode, category);
        parts.setAiSuggestedStockLevel(aiSuggested);
        
        return partsRepository.save(parts);
    }
    
    @Override
    public Parts updatePartsStock(Long partsId, Integer newQuantity) {
        Parts parts = partsRepository.findById(partsId)
                .orElseThrow(() -> new RuntimeException("Parts not found"));
        
        parts.setQuantityInStock(newQuantity);
        Integer aiSuggested = partsInventoryService.suggestStockLevel(
                parts.getPartCode(), parts.getCategory());
        parts.setAiSuggestedStockLevel(aiSuggested);
        
        return partsRepository.save(parts);
    }
    
    @Override
    public List<Parts> getLowStockParts(Long serviceCenterId) {
        return partsRepository.findByServiceCenterId(serviceCenterId)
                .stream()
                .filter(p -> p.getQuantityInStock() <= p.getMinimumStockLevel())
                .collect(Collectors.toList());
    }
    
    @Override
    public Technician createTechnician(String username, String email, String password,
                                       String fullName, String phoneNumber, String certifications) {
        Technician technician = new Technician();
        technician.setUsername(username);
        technician.setEmail(email);
        technician.setPassword(passwordEncoder.encode(password));
        technician.setFullName(fullName);
        technician.setPhoneNumber(phoneNumber);
        technician.setTechnicianId("TECH-" + System.currentTimeMillis());
        technician.setSpecialization("General");
        technician.setCertifications(certifications);
        technician.setCertificateLevel("Intermediate");
        technician.setActive(true);
        
        return (Technician) userRepository.save(technician);
    }
    
    @Override
    public Staff createStaff(String username, String email, String password,
                             String fullName, String phoneNumber, String department) {
        Staff staff = new Staff();
        staff.setUsername(username);
        staff.setEmail(email);
        staff.setPassword(passwordEncoder.encode(password));
        staff.setFullName(fullName);
        staff.setPhoneNumber(phoneNumber);
        staff.setStaffId("STAFF-" + System.currentTimeMillis());
        staff.setDepartment(department);
        staff.setPosition("Staff");
        staff.setWorkShift("Full-time");
        staff.setActive(true);
        
        return (Staff) userRepository.save(staff);
    }
    
    @Override
    public ServiceCenter createServiceCenter(String name, String address,
                                            String phoneNumber, String email) {
        ServiceCenter center = new ServiceCenter();
        center.setName(name);
        center.setAddress(address);
        center.setPhoneNumber(phoneNumber);
        center.setEmail(email);
        center.setActive(true);
        
        return serviceCenterRepository.save(center);
    }
    
    @Override
    public Map<String, Object> getFinancialReport(LocalDateTime startDate, LocalDateTime endDate) {
        List<Invoice> invoices = invoiceRepository.findByCreatedAtBetween(startDate, endDate);
        
        java.math.BigDecimal totalRevenue = invoices.stream()
                .filter(inv -> inv.getPaymentStatus() == com.evservice.maintenance.model.enums.PaymentStatus.COMPLETED)
                .map(Invoice::getTotalAmount)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
        
        java.math.BigDecimal pendingAmount = invoices.stream()
                .filter(inv -> inv.getPaymentStatus() == com.evservice.maintenance.model.enums.PaymentStatus.PENDING)
                .map(Invoice::getTotalAmount)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
        
        return Map.of(
                "totalRevenue", totalRevenue,
                "pendingAmount", pendingAmount,
                "totalInvoices", invoices.size(),
                "periodStart", startDate,
                "periodEnd", endDate
        );
    }
    
    @Override
    public Map<String, Object> getProfitReport(LocalDateTime startDate, LocalDateTime endDate) {
        List<Invoice> invoices = invoiceRepository.findByCreatedAtBetween(startDate, endDate);
        java.math.BigDecimal revenue = invoices.stream()
                .filter(inv -> inv.getPaymentStatus() == com.evservice.maintenance.model.enums.PaymentStatus.COMPLETED)
                .map(Invoice::getTotalAmount)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
        java.math.BigDecimal labor = invoices.stream()
                .map(Invoice::getLaborCost)
                .filter(java.util.Objects::nonNull)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
        java.math.BigDecimal parts = invoices.stream()
                .map(Invoice::getPartsTotal)
                .filter(java.util.Objects::nonNull)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
        java.math.BigDecimal cost = labor.add(parts);
        java.math.BigDecimal profit = revenue.subtract(cost);
        return Map.of(
                "revenue", revenue,
                "laborCostTotal", labor,
                "partsCostTotal", parts,
                "grossProfit", profit,
                "periodStart", startDate,
                "periodEnd", endDate
        );
    }
    
    @Override
    public Map<String, Object> getTechnicianPerformance(LocalDateTime startDate, LocalDateTime endDate) {
        List<ServiceRecord> records = serviceRecordRepository.findAll();
        var filtered = records.stream()
                .filter(r -> r.getStartTime() != null && r.getEndTime() != null)
                .filter(r -> !r.getStartTime().isBefore(startDate) && !r.getEndTime().isAfter(endDate))
                .toList();
        var byTech = filtered.stream().collect(java.util.stream.Collectors.groupingBy(
                r -> r.getAppointment().getTechnician().getId()
        ));
        java.util.Map<Long, java.util.Map<String, Object>> stats = new java.util.HashMap<>();
        for (var entry : byTech.entrySet()) {
            var list = entry.getValue();
            long totalMinutes = list.stream()
                    .mapToLong(r -> java.time.Duration.between(r.getStartTime(), r.getEndTime()).toMinutes())
                    .sum();
            stats.put(entry.getKey(), Map.of(
                    "jobs", list.size(),
                    "totalMinutes", totalMinutes,
                    "avgMinutesPerJob", list.isEmpty() ? 0 : totalMinutes / list.size()
            ));
        }
        return Map.of("technicianStats", stats);
    }
    
    @Override
    public Map<String, Object> estimateQuotation(Long serviceCenterId, java.util.List<Long> partsIds,
                                                  java.util.List<Integer> quantities, java.math.BigDecimal laborCost,
                                                  java.math.BigDecimal serviceFee,
                                                  java.math.BigDecimal discount,
                                                  java.math.BigDecimal tax) {
        java.math.BigDecimal partsTotal = java.math.BigDecimal.ZERO;
        if (partsIds != null && quantities != null && partsIds.size() == quantities.size()) {
            for (int i = 0; i < partsIds.size(); i++) {
                var parts = partsRepository.findById(partsIds.get(i))
                        .orElseThrow(() -> new RuntimeException("Parts not found"));
                int qty = quantities.get(i) != null ? quantities.get(i) : 1;
                partsTotal = partsTotal.add(parts.getUnitPrice().multiply(java.math.BigDecimal.valueOf(qty)));
            }
        }
        laborCost = laborCost != null ? laborCost : java.math.BigDecimal.ZERO;
        serviceFee = serviceFee != null ? serviceFee : java.math.BigDecimal.ZERO;
        discount = discount != null ? discount : java.math.BigDecimal.ZERO;
        tax = tax != null ? tax : java.math.BigDecimal.ZERO;
        java.math.BigDecimal subtotal = partsTotal.add(laborCost).add(serviceFee).subtract(discount);
        java.math.BigDecimal total = subtotal.add(tax);
        return Map.of(
                "partsTotal", partsTotal,
                "laborCost", laborCost,
                "serviceFee", serviceFee,
                "discount", discount,
                "tax", tax,
                "totalAmount", total
        );
    }
    
    @Override
    public Map<ServiceType, Long> getPopularServiceTypes(LocalDateTime startDate, LocalDateTime endDate) {
        List<ServiceAppointment> appointments = appointmentRepository
                .findByScheduledDateTimeBetween(startDate, endDate);
        
        return appointments.stream()
                .collect(Collectors.groupingBy(
                        ServiceAppointment::getServiceType,
                        Collectors.counting()
                ));
    }
    
    @Override
    public Map<String, Long> getFailureTrends() {
        List<ServiceRecord> records = serviceRecordRepository.findAll();
        
        return records.stream()
                .filter(r -> r.getVehicleCondition() != null && r.getVehicleCondition().contains("hỏng"))
                .collect(Collectors.groupingBy(
                        ServiceRecord::getVehicleCondition,
                        Collectors.counting()
                ));
    }
}


