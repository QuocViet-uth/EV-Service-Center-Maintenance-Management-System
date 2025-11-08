package com.evservice.maintenance.controller;

import com.evservice.maintenance.model.ServiceCenter;
import com.evservice.maintenance.repository.ServiceCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-centers")
@CrossOrigin(origins = "*")
public class ServiceCenterController {
    
    @Autowired
    private ServiceCenterRepository serviceCenterRepository;
    
    @GetMapping
    public ResponseEntity<List<ServiceCenter>> getAllServiceCenters() {
        return ResponseEntity.ok(serviceCenterRepository.findByActiveTrue());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ServiceCenter> getServiceCenter(@PathVariable Long id) {
        return ResponseEntity.of(serviceCenterRepository.findById(id));
    }
}


