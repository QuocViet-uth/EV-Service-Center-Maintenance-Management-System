package com.evservice.maintenance.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloController {

    @GetMapping("/api/hello")
    public String hello() {
        return "🚗 EV Service Center Backend is working!";
    }
}