package com.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Entity.User;
import com.Repository.UserRepository;

import DTO.UserDTO;




@Service
public class UserService {
	@Autowired
	UserRepository urepo;

	public String registration(User u) {
		User existinguser = urepo.findByUsername(u.getUsername());
		if (existinguser == null) {
			urepo.save(u);
			return "Registration successful";
		} else {
			return "This username already exists. Please use another one!";
		}
	}

	public User Login(UserDTO dto) {
		User existinguser = urepo.findByUsername(dto.getUsername());
		if (existinguser != null && existinguser.getPassword().equals(dto.getPassword())) {
			return existinguser;
		} else {
			return null;
		}
	}
}
