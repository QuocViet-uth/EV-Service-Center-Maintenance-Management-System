package com.evservice.maintenance.service;

import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.ServiceType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface AdminService {
    Parts addParts(Long serviceCenterId, String partCode, String name,
                   String description, String category, String manufacturer,
                   Integer quantity, Integer minimumStockLevel, BigDecimal unitPrice);
    Parts updatePartsStock(Long partsId, Integer newQuantity);
    List<Parts> getLowStockParts(Long serviceCenterId);
    Technician createTechnician(String username, String email, String password,
                                String fullName, String phoneNumber, String certifications);
    Staff createStaff(String username, String email, String password,
                      String fullName, String phoneNumber, String department);
    ServiceCenter createServiceCenter(String name, String address,
                                      String phoneNumber, String email);
    Map<String, Object> getFinancialReport(LocalDateTime startDate, LocalDateTime endDate);
    Map<ServiceType, Long> getPopularServiceTypes(LocalDateTime startDate, LocalDateTime endDate);
    Map<String, Long> getFailureTrends();
    Map<String, Object> getProfitReport(LocalDateTime startDate, LocalDateTime endDate);
    Map<String, Object> getTechnicianPerformance(LocalDateTime startDate, LocalDateTime endDate);
    Map<String, Object> estimateQuotation(Long serviceCenterId, java.util.List<Long> partsIds,
                                          java.util.List<Integer> quantities, java.math.BigDecimal laborCost,
                                          java.math.BigDecimal serviceFee,
                                          java.math.BigDecimal discount,
                                          java.math.BigDecimal tax);
}

