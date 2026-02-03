package com.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.Entity.EmployeeManagement;
import com.Repository.EmployeeRepository;


@Component
public class BirthdayScheduler {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private EmailService emailService;

	// Runs every day at 8 AM
	@Scheduled(cron = "0 12 10 * * ?")

	public void sendBirthdayEmails() {
		LocalDate today = LocalDate.now();
		List<EmployeeManagement> employees = employeeRepository.findAll();

		for (EmployeeManagement emp : employees) {
			if (emp.getDob() != null && emp.getDob().getMonth() == today.getMonth()
					&& emp.getDob().getDayOfMonth() == today.getDayOfMonth()) {

				emailService.sendBirthdayEmail(emp.getEmail(), emp.getFirstname());
			}
		}
	}
}
