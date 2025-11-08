package com.evservice.maintenance.service;

import com.evservice.maintenance.dto.AuthRequest;
import com.evservice.maintenance.dto.AuthResponse;
import com.evservice.maintenance.dto.RegisterRequest;
import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.UserRole;
import com.evservice.maintenance.repository.UserRepository;
import com.evservice.maintenance.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user;
        UserRole role = request.getRole() != null ? request.getRole() : UserRole.CUSTOMER;
        
        switch (role) {
            case CUSTOMER:
                Customer customer = new Customer();
                customer.setUsername(request.getUsername());
                customer.setEmail(request.getEmail());
                customer.setPassword(passwordEncoder.encode(request.getPassword()));
                customer.setFullName(request.getFullName());
                customer.setPhoneNumber(request.getPhoneNumber());
                customer.setAddress(request.getAddress());
                customer.setCustomerType("REGULAR");
                customer.setTier("BRONZE");
                user = customer;
                break;
            case STAFF:
                Staff staff = new Staff();
                staff.setUsername(request.getUsername());
                staff.setEmail(request.getEmail());
                staff.setPassword(passwordEncoder.encode(request.getPassword()));
                staff.setFullName(request.getFullName());
                staff.setPhoneNumber(request.getPhoneNumber());
                staff.setAddress(request.getAddress());
                staff.setStaffId("STAFF-" + System.currentTimeMillis());
                user = staff;
                break;
            case TECHNICIAN:
Technician technician = new Technician();
                technician.setUsername(request.getUsername());
                technician.setEmail(request.getEmail());
                technician.setPassword(passwordEncoder.encode(request.getPassword()));
                technician.setFullName(request.getFullName());
                technician.setPhoneNumber(request.getPhoneNumber());
                technician.setAddress(request.getAddress());
                technician.setTechnicianId("TECH-" + System.currentTimeMillis());
                technician.setSpecialization("General");
                user = technician;
                break;
            case ADMIN:
                Admin admin = new Admin();
                admin.setUsername(request.getUsername());
                admin.setEmail(request.getEmail());
                admin.setPassword(passwordEncoder.encode(request.getPassword()));
                admin.setFullName(request.getFullName());
                admin.setPhoneNumber(request.getPhoneNumber());
                admin.setAddress(request.getAddress());
                admin.setAccessLevel("ADMIN");
                user = admin;
                break;
            default:
                throw new RuntimeException("Invalid user role");
        }
        
        user.setActive(true);
        user = userRepository.save(user);
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("userId", user.getId());
        extraClaims.put("role", role.name());
        String token = jwtUtil.generateToken(userDetails, extraClaims);
        
        return new AuthResponse(token, "Bearer", user.getId(), user.getUsername(), user.getEmail(), role);
    }
    
    @Override
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        UserRole userRole = determineUserRole(user);
        
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("userId", user.getId());
        extraClaims.put("role", userRole.name());
        String token = jwtUtil.generateToken(userDetails, extraClaims);
        
        return new AuthResponse(token, "Bearer", user.getId(), user.getUsername(), user.getEmail(), userRole);
    }
    
    private UserRole determineUserRole(User user) {
        if (user instanceof Customer) return UserRole.CUSTOMER;
        if (user instanceof Staff) return UserRole.STAFF;
        if (user instanceof Technician) return UserRole.TECHNICIAN;
if (user instanceof Admin) return UserRole.ADMIN;
        return UserRole.CUSTOMER;
    }
}