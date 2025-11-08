package com.evservice.maintenance.dto;

import com.evservice.maintenance.model.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String username;
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    private String password;
    
    @NotBlank
    private String fullName;
    
    @NotBlank
    private String phoneNumber;
    
    private String address;
    
    private UserRole role = UserRole.CUSTOMER;
}


