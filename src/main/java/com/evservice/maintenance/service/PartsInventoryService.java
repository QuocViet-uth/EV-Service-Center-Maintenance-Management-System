package com.evservice.maintenance.service;

import com.evservice.maintenance.model.ServicePartsUsage;
import com.evservice.maintenance.repository.PartsRepository;
import com.evservice.maintenance.repository.ServicePartsUsageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PartsInventoryService {
    
    @Autowired
    private PartsRepository partsRepository;
    
    @Autowired
    private ServicePartsUsageRepository partsUsageRepository;
    
    /**
     * AI gợi ý mức tồn kho tối thiểu dựa trên:
     * - Lịch sử sử dụng phụ tùng
     * - Tần suất sử dụng
     * - Thời gian giao hàng (ước tính)
     */
    public Integer suggestStockLevel(String partCode, String category) {
        // Tìm phụ tùng
        var partsOpt = partsRepository.findByPartCode(partCode);
        
        if (partsOpt.isEmpty()) {
            // Nếu chưa có lịch sử, đề xuất mức mặc định
            return getDefaultStockLevel(category);
        }
        
        var parts = partsOpt.get();
        
        // Phân tích lịch sử sử dụng trong 3 tháng gần nhất
        LocalDateTime threeMonthsAgo = LocalDateTime.now().minusMonths(3);
        
        List<ServicePartsUsage> recentUsage = partsUsageRepository.findAll()
                .stream()
                .filter(usage -> usage.getParts().getId().equals(parts.getId()))
                .filter(usage -> usage.getCreatedAt().isAfter(threeMonthsAgo))
                .toList();
        
        if (recentUsage.isEmpty()) {
            return getDefaultStockLevel(category);
        }
        
        // Tính tổng số lượng đã sử dụng trong 3 tháng
        int totalUsed = recentUsage.stream()
                .mapToInt(ServicePartsUsage::getQuantity)
                .sum();
        
        // Tính trung bình sử dụng/tháng
        double avgMonthlyUsage = totalUsed / 3.0;
        
        // Đề xuất mức tồn kho = sử dụng trung bình/tháng * 2 (đủ cho 2 tháng)
        // + buffer 20%
        int suggested = (int) Math.ceil(avgMonthlyUsage * 2 * 1.2);
        
        // Tối thiểu là 10, tối đa là 1000
        return Math.max(10, Math.min(suggested, 1000));
    }
    
    private Integer getDefaultStockLevel(String category) {
        // Mức mặc định theo danh mục
        return switch (category != null ? category.toLowerCase() : "") {
            case "pin", "battery" -> 20;
            case "motor" -> 10;
            case "charger", "sạc" -> 15;
            case "phụ tùng tiêu hao" -> 50;
            default -> 25;
        };
    }
}


