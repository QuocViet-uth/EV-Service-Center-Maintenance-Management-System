package com.evservice.maintenance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("STAFF")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Staff extends User {
    
    @Column(unique = true)
    private String staffId;
    
    private String position; // Receptionist, Manager, Coordinator, etc.
    private String department; // Sales, Service, Customer Service
    private String workShift; // Morning, Afternoon, Night, Full-time
    
    // Constructor với thông tin cơ bản
    public Staff(String username, String email, String password, String fullName, String phoneNumber, String department) {
        super();
        this.setUsername(username);
        this.setEmail(email);
        this.setPassword(password);
        this.setFullName(fullName);
        this.setPhoneNumber(phoneNumber);
        this.setDepartment(department);
        this.setStaffId("STAFF-" + System.currentTimeMillis());
        this.setPosition("Staff");
        this.setWorkShift("Full-time");
    }
}


