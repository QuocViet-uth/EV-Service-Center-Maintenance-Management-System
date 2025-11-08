package com.evservice.maintenance.service;

import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.AppointmentStatus;
import com.evservice.maintenance.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TechnicianServiceImpl implements TechnicianService {
    
    @Autowired
    private ServiceAppointmentRepository appointmentRepository;
    
    @Autowired
    private ServiceRecordRepository serviceRecordRepository;
    
    @Autowired
    private ServicePartsUsageRepository partsUsageRepository;
    
    @Autowired
    private InvoiceRepository invoiceRepository;
    
    @Autowired
    private PartsRepository partsRepository;
    
    @Autowired
    private TechnicianScheduleRepository scheduleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public List<ServiceAppointment> getMyAssignedAppointments(Long technicianId) {
        return appointmentRepository.findByTechnicianId(technicianId);
    }
    
    @Override
    @Transactional
    public ServiceRecord startService(Long appointmentId) {
        ServiceAppointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        if (appointment.getStatus() != AppointmentStatus.CONFIRMED) {
            throw new RuntimeException("Appointment must be confirmed before starting");
        }
        
        appointment.setStatus(AppointmentStatus.IN_PROGRESS);
        appointmentRepository.save(appointment);
        
        ServiceRecord record = new ServiceRecord();
        record.setAppointment(appointment);
        record.setVehicle(appointment.getVehicle());
        record.setMileageAtService(appointment.getVehicle().getCurrentMileage());
        record.setStartTime(LocalDateTime.now());
        
        return serviceRecordRepository.save(record);
    }
    
    @Override
    @Transactional
    public ServiceRecord updateServiceRecord(Long recordId, String vehicleCondition,
                                            String workPerformed, String notes,
                                            String batteryCheck, String motorCheck,
                                            String chargingSystemCheck) {
        ServiceRecord record = serviceRecordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Service record not found"));
        
        record.setVehicleCondition(vehicleCondition);
        record.setWorkPerformed(workPerformed);
        record.setNotes(notes);
        record.setBatteryCheck(batteryCheck);
        record.setMotorCheck(motorCheck);
        record.setChargingSystemCheck(chargingSystemCheck);
        
        return serviceRecordRepository.save(record);
    }
    
    @Override
    @Transactional
    public ServicePartsUsage useParts(Long recordId, Long partsId, Integer quantity) {
        ServiceRecord record = serviceRecordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Service record not found"));
        
        Parts parts = partsRepository.findById(partsId)
                .orElseThrow(() -> new RuntimeException("Parts not found"));
        
        if (parts.getQuantityInStock() < quantity) {
            throw new RuntimeException("Insufficient stock for part: " + parts.getName());
        }
        
        parts.setQuantityInStock(parts.getQuantityInStock() - quantity);
        partsRepository.save(parts);
        
        ServicePartsUsage usage = new ServicePartsUsage();
        usage.setServiceRecord(record);
        usage.setParts(parts);
        usage.setQuantity(quantity);
        usage.setUnitPrice(parts.getUnitPrice());
        
        return partsUsageRepository.save(usage);
    }
    
    @Override
    @Transactional
    public ServiceRecord completeService(Long recordId, BigDecimal laborCost) {
        ServiceRecord record = serviceRecordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Service record not found"));
        
        record.setEndTime(LocalDateTime.now());
        serviceRecordRepository.save(record);
        
        Invoice invoice = new Invoice();
        invoice.setServiceRecord(record);
        invoice.setCustomer(record.getAppointment().getCustomer());
        
        BigDecimal partsTotal = record.getPartsUsed().stream()
                .map(ServicePartsUsage::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        invoice.setPartsTotal(partsTotal);
        invoice.setLaborCost(laborCost);
        invoice.setServiceFee(BigDecimal.ZERO);
        invoice.setDiscount(BigDecimal.ZERO);
        invoice.setTax(BigDecimal.ZERO);
        invoice.setTotalAmount(partsTotal.add(laborCost));
        invoice.setPaymentStatus(com.evservice.maintenance.model.enums.PaymentStatus.PENDING);
        
        invoiceRepository.save(invoice);
        
        ServiceAppointment appointment = record.getAppointment();
        appointment.setStatus(AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);
        
        Vehicle vehicle = record.getVehicle();
        vehicle.setLastMaintenanceDate(LocalDateTime.now().toLocalDate());
        vehicle.setLastMaintenanceMileage(vehicle.getCurrentMileage());
        
        return record;
    }
    
    @Override
    public TechnicianSchedule createSchedule(Long technicianId,
                                             java.time.LocalDate workDate,
                                             java.time.LocalTime startTime,
                                             java.time.LocalTime endTime,
                                             String shiftType) {
        User technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new RuntimeException("Technician not found"));
        
        TechnicianSchedule schedule = new TechnicianSchedule();
        schedule.setTechnician(technician);
        schedule.setWorkDate(workDate);
        schedule.setStartTime(startTime);
        schedule.setEndTime(endTime);
        schedule.setShiftType(shiftType);
        schedule.setAvailable(true);
        
        return scheduleRepository.save(schedule);
    }
}


