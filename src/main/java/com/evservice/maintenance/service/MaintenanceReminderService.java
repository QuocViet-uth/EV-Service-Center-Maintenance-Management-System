package com.evservice.maintenance.service;

import com.evservice.maintenance.model.MaintenanceReminder;

import java.util.List;

public interface MaintenanceReminderService {
    void checkMileageBasedReminders();
    void checkTimeBasedReminders();
    void checkPaymentReminders();
    List<MaintenanceReminder> getRemindersForUser(Long userId);
    void markAsSent(Long reminderId);
}


