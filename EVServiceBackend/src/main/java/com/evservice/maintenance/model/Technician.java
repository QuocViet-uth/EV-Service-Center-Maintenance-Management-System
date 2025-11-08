package com.evservice.maintenance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@DiscriminatorValue("TECHNICIAN")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Technician extends User {
    
    @Column(unique = true)
    private String technicianId;
    
    private String specialization; // Battery, Motor, Charging System, General
    private String certificateLevel; // Beginner, Intermediate, Advanced, Expert
    private String certifications; // Chứng chỉ EV, JSON format hoặc text
    
    @OneToMany(mappedBy = "technician", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ServiceAppointment> appointments = new HashSet<>();
    
    @OneToMany(mappedBy = "technician", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<TechnicianSchedule> schedules = new HashSet<>();
    
    // Constructor với thông tin cơ bản
    public Technician(String username, String email, String password, String fullName, String phoneNumber, String specialization) {
        super();
        this.setUsername(username);
        this.setEmail(email);
        this.setPassword(password);
        this.setFullName(fullName);
        this.setPhoneNumber(phoneNumber);
        this.setSpecialization(specialization);
        this.setTechnicianId("TECH-" + System.currentTimeMillis());
        this.setCertificateLevel("Intermediate");
    }
}


