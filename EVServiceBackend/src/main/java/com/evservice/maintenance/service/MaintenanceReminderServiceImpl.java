package com.evservice.maintenance.service;

import com.evservice.maintenance.model.MaintenanceReminder;
import com.evservice.maintenance.model.Vehicle;
import com.evservice.maintenance.model.enums.ReminderType;
import com.evservice.maintenance.repository.MaintenanceReminderRepository;
import com.evservice.maintenance.repository.InvoiceRepository;
import com.evservice.maintenance.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MaintenanceReminderServiceImpl implements MaintenanceReminderService {
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    @Autowired
    private MaintenanceReminderRepository reminderRepository;
    
    @Autowired
    private InvoiceRepository invoiceRepository;
    
    @Override
    @Scheduled(cron = "0 0 8 * * ?")
    @Transactional
    public void checkMileageBasedReminders() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        
        for (Vehicle vehicle : vehicles) {
            if (vehicle.getMaintenanceIntervalKm() != null && vehicle.getCurrentMileage() != null) {
                int mileageDifference = vehicle.getCurrentMileage() - 
                        (vehicle.getLastMaintenanceMileage() != null ? vehicle.getLastMaintenanceMileage() : 0);
                
                if (mileageDifference >= vehicle.getMaintenanceIntervalKm() * 0.9) {
                    createReminder(vehicle, ReminderType.MILEAGE_BASED,
                            "Đã đến lúc bảo dưỡng định kỳ theo km cho xe " + vehicle.getModel());
                }
            }
        }
    }
    
    @Override
    @org.springframework.scheduling.annotation.Scheduled(cron = "0 0 9 * * ?")
    @Transactional
    public void checkPaymentReminders() {
        var pendingInvoices = invoiceRepository.findByPaymentStatus(com.evservice.maintenance.model.enums.PaymentStatus.PENDING);
        for (var invoice : pendingInvoices) {
            var user = invoice.getCustomer();
            var vehicle = invoice.getServiceRecord() != null ? invoice.getServiceRecord().getVehicle() : null;
            var existing = reminderRepository.findByUserId(user.getId())
                    .stream()
                    .filter(r -> r.getReminderType() == ReminderType.PAYMENT && !r.isSent() && r.isActive())
                    .toList();
            if (existing.isEmpty()) {
                MaintenanceReminder reminder = new MaintenanceReminder();
                reminder.setUser(user);
                reminder.setVehicle(vehicle);
                reminder.setReminderType(ReminderType.PAYMENT);
                reminder.setTitle("Nhắc thanh toán hóa đơn");
                reminder.setMessage("Hóa đơn " + invoice.getInvoiceNumber() + " chưa được thanh toán.");
                reminder.setReminderDateTime(java.time.LocalDateTime.now());
                reminder.setSent(false);
                reminder.setActive(true);
                reminderRepository.save(reminder);
            }
        }
    }

    @Override
    @Scheduled(cron = "0 0 8 * * ?")
    @Transactional
    public void checkTimeBasedReminders() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        LocalDate today = LocalDate.now();
        
        for (Vehicle vehicle : vehicles) {
            if (vehicle.getMaintenanceIntervalDays() != null && vehicle.getLastMaintenanceDate() != null) {
                long daysSince = java.time.temporal.ChronoUnit.DAYS.between(
                        vehicle.getLastMaintenanceDate(), today);
                
                if (daysSince >= vehicle.getMaintenanceIntervalDays() * 0.9) {
                    createReminder(vehicle, ReminderType.TIME_BASED,
                            "Đã đến lúc bảo dưỡng định kỳ theo thời gian cho xe " + vehicle.getModel());
                }
            }
            
            if (vehicle.getServicePackageExpiry() != null &&
                    vehicle.getServicePackageExpiry().isBefore(today.plusDays(7))) {
                createReminder(vehicle, ReminderType.SERVICE_PACKAGE,
                        "Gói dịch vụ của xe " + vehicle.getModel() + " sắp hết hạn. Vui lòng gia hạn!");
            }
        }
    }
    
    private void createReminder(Vehicle vehicle, ReminderType type, String message) {
        List<MaintenanceReminder> existing = reminderRepository.findByVehicleId(vehicle.getId())
                .stream()
                .filter(r -> r.getReminderType() == type && !r.isSent() && r.isActive())
                .toList();
        
        if (existing.isEmpty()) {
            MaintenanceReminder reminder = new MaintenanceReminder();
            reminder.setUser(vehicle.getUser());
            reminder.setVehicle(vehicle);
            reminder.setReminderType(type);
            reminder.setTitle("Nhắc nhở bảo dưỡng");
            reminder.setMessage(message);
            reminder.setReminderDateTime(LocalDateTime.now());
            reminder.setSent(false);
            reminder.setActive(true);
            
            reminderRepository.save(reminder);
        }
    }
    
    @Override
    public List<MaintenanceReminder> getRemindersForUser(Long userId) {
        return reminderRepository.findByUserId(userId);
    }
    
    @Override
    public void markAsSent(Long reminderId) {
        MaintenanceReminder reminder = reminderRepository.findById(reminderId)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
        reminder.setSent(true);
        reminder.setSentAt(LocalDateTime.now());
        reminderRepository.save(reminder);
    }
}


