package com.evservice.maintenance.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    
    public static String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        return null;
    }
    
    public static Long getCurrentUserId() {
        // TODO: Extract from JWT claims if needed
        // For now, we'll use username to find user
        String username = getCurrentUsername();
        return null; // Will be implemented in controller using repository
    }
}