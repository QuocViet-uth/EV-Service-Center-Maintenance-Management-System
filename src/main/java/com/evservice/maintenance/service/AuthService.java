package com.evservice.maintenance.service;

import com.evservice.maintenance.dto.AuthRequest;
import com.evservice.maintenance.dto.AuthResponse;
import com.evservice.maintenance.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
}