package com.evservice.maintenance.service;

import com.evservice.maintenance.dto.ServiceAppointmentRequest;
import com.evservice.maintenance.dto.VehicleRequest;
import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.AppointmentStatus;
import com.evservice.maintenance.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ServiceAppointmentRepository appointmentRepository;

    @Autowired
    private ServiceRecordRepository serviceRecordRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private MaintenanceReminderRepository reminderRepository;

    @Autowired
    private ServiceCenterRepository serviceCenterRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Vehicle addVehicle(Long userId, VehicleRequest request) {
        if (vehicleRepository.existsByVin(request.getVin())) {
            throw new RuntimeException("VIN already exists");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vehicle vehicle = new Vehicle();
        vehicle.setVin(request.getVin());
        vehicle.setModel(request.getModel());
        vehicle.setBrand(request.getBrand());
        vehicle.setYear(request.getYear());
        vehicle.setColor(request.getColor());
        vehicle.setLicensePlate(request.getLicensePlate());
        vehicle.setCurrentMileage(request.getCurrentMileage());
        vehicle.setMaintenanceIntervalKm(request.getMaintenanceIntervalKm());
        vehicle.setMaintenanceIntervalDays(request.getMaintenanceIntervalDays());
        vehicle.setServicePackageExpiry(request.getServicePackageExpiry());
        vehicle.setUser(user);

        return vehicleRepository.save(vehicle);
    }

    @Override
    public List<Vehicle> getMyVehicles(Long userId) {
        return vehicleRepository.findByUserId(userId);
    }

    @Override
    public List<ServiceRecord> getServiceHistory(Long userId, Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (!vehicle.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to vehicle");
        }

        return serviceRecordRepository.findByVehicleId(vehicleId);
    }

    @Override
    @Transactional
    public ServiceAppointment createAppointment(Long userId, ServiceAppointmentRequest request) {
        User customer = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (!vehicle.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to vehicle");
        }

        ServiceCenter serviceCenter = serviceCenterRepository.findById(request.getServiceCenterId())
                .orElseThrow(() -> new RuntimeException("Service center not found"));

        ServiceAppointment appointment = new ServiceAppointment();
        appointment.setCustomer(customer);
        appointment.setVehicle(vehicle);
        appointment.setServiceCenter(serviceCenter);
        appointment.setServiceType(request.getServiceType());
        appointment.setScheduledDateTime(request.getScheduledDateTime());
        appointment.setDescription(request.getDescription());
        appointment.setCustomerNotes(request.getCustomerNotes());
        appointment.setStatus(AppointmentStatus.PENDING);

        return appointmentRepository.save(appointment);
    }

    @Override
    public List<ServiceAppointment> getMyAppointments(Long userId) {
        return appointmentRepository.findByCustomerId(userId);
    }

    @Override
    public List<Invoice> getMyInvoices(Long userId) {
        return invoiceRepository.findByCustomerId(userId);
    }
}


