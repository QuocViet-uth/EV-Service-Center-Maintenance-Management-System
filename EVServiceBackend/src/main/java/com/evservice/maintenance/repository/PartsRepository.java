package com.evservice.maintenance.repository;

import com.evservice.maintenance.model.Parts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PartsRepository extends JpaRepository<Parts, Long> {
    Optional<Parts> findByPartCode(String partCode);
    List<Parts> findByServiceCenterId(Long serviceCenterId);
    List<Parts> findByQuantityInStockLessThan(Integer stockLevel);
    @Query("SELECT p FROM Parts p WHERE p.quantityInStock <= p.minimumStockLevel")
    List<Parts> findLowStockParts();
}


