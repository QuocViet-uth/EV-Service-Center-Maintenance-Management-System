package com.evservice.maintenance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("ADMIN")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends User {

    private String accessLevel; // SUPER_ADMIN, ADMIN, MANAGER

    // Constructor với thông tin cơ bản
    public Admin(String username, String email, String password, String fullName, String phoneNumber) {
        super();
        this.setUsername(username);
        this.setEmail(email);
        this.setPassword(password);
        this.setFullName(fullName);
        this.setPhoneNumber(phoneNumber);
        this.setAccessLevel("ADMIN");
    }
}


