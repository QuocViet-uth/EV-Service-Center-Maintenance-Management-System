package com.evservice.maintenance.repository;

import com.evservice.maintenance.model.ServiceAppointment;
import com.evservice.maintenance.model.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ServiceAppointmentRepository extends JpaRepository<ServiceAppointment, Long> {
    List<ServiceAppointment> findByCustomerId(Long customerId);
    List<ServiceAppointment> findByVehicleId(Long vehicleId);
    List<ServiceAppointment> findByServiceCenterId(Long serviceCenterId);
    List<ServiceAppointment> findByTechnicianId(Long technicianId);
    List<ServiceAppointment> findByStatus(AppointmentStatus status);
    List<ServiceAppointment> findByScheduledDateTimeBetween(LocalDateTime start, LocalDateTime end);
    List<ServiceAppointment> findByServiceCenterIdAndStatus(Long serviceCenterId, AppointmentStatus status);
}