package com.evservice.maintenance.repository;

import com.evservice.maintenance.model.TechnicianSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TechnicianScheduleRepository extends JpaRepository<TechnicianSchedule, Long> {
    List<TechnicianSchedule> findByTechnicianId(Long technicianId);
    List<TechnicianSchedule> findByTechnicianIdAndWorkDate(Long technicianId, LocalDate workDate);
    List<TechnicianSchedule> findByWorkDateAndAvailableTrue(LocalDate workDate);
}