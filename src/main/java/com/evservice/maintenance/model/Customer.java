package com.evservice.maintenance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@DiscriminatorValue("CUSTOMER")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Customer extends User {

    private Integer loyaltyPoints = 0;
    private String customerType; // REGULAR, VIP, PREMIUM
    private String tier; // BRONZE, SILVER, GOLD, PLATINUM

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ServiceAppointment> appointments = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<MaintenanceReminder> reminders = new HashSet<>();

    // Constructor với thông tin cơ bản
    public Customer(String username, String email, String password, String fullName, String phoneNumber) {
        super();
        this.setUsername(username);
        this.setEmail(email);
        this.setPassword(password);
        this.setFullName(fullName);
        this.setPhoneNumber(phoneNumber);
        this.setCustomerType("REGULAR");
        this.setTier("BRONZE");
    }
}


