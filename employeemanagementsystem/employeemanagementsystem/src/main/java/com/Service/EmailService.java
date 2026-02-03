package com.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	

	    @Autowired
	    private JavaMailSender mailSender;

	    public void sendBirthdayEmail(String toEmail, String employeeName) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(toEmail);
	        message.setSubject("🎉 Happy Birthday!");
	        message.setText("Dear " + employeeName + ",\n\nWishing you a very Happy Birthday!\n\nBest regards,\nEmployee Management System");

	        mailSender.send(message);
	    }
	}


