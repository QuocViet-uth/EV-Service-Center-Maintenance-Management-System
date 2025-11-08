package com.evservice.maintenance.repository;

import com.evservice.maintenance.model.ServicePartsUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicePartsUsageRepository extends JpaRepository<ServicePartsUsage, Long> {
    List<ServicePartsUsage> findByServiceRecordId(Long serviceRecordId);
}


