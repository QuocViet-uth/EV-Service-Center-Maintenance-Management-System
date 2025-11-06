package com.evservice.maintenance.repository;

import com.evservice.maintenance.model.MaintenanceReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MaintenanceReminderRepository extends JpaRepository<MaintenanceReminder, Long> {
    List<MaintenanceReminder> findByUserId(Long userId);
    List<MaintenanceReminder> findByVehicleId(Long vehicleId);
    List<MaintenanceReminder> findByActiveTrueAndSentFalse();
    List<MaintenanceReminder> findByReminderDateTimeLessThanEqualAndSentFalse(LocalDateTime dateTime);
}


