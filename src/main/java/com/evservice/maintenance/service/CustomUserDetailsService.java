package com.evservice.maintenance.service;

import com.evservice.maintenance.model.*;
import com.evservice.maintenance.model.enums.UserRole;
import com.evservice.maintenance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        // Xác định role từ class type
        UserRole role = determineUserRole(user);
        
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isActive(),
                true,
                true,
                true,
                getAuthorities(role.name())
        );
    }
    
    private Collection<? extends GrantedAuthority> getAuthorities(String role) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }
    
    // Helper method để xác định role từ class type
    private UserRole determineUserRole(User user) {
        if (user instanceof Customer) return UserRole.CUSTOMER;
        if (user instanceof Staff) return UserRole.STAFF;
        if (user instanceof Technician) return UserRole.TECHNICIAN;
        if (user instanceof Admin) return UserRole.ADMIN;
        return UserRole.CUSTOMER; // Default
    }
}