package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.EmployeeManagement;
import com.Service.EmployeeService;



@RestController
@CrossOrigin
public class EmployeeController {

	@Autowired
	EmployeeService empservice;

	@PostMapping("/addempdata")
	public String add(@RequestBody EmployeeManagement emp) { 
		return empservice.add(emp);
	}

	@GetMapping("/findallempdata")
	public List<EmployeeManagement> findAll() {
		return empservice.findAll();
	}

	@GetMapping("/findbyempid")
	public EmployeeManagement findbyempid(@RequestParam int empid) {
		return empservice.findbyempid(empid);
	}

	@DeleteMapping("/deletebyempid")
	public String deleteById(@RequestParam int empid) {
		return empservice.deleteById(empid);
	}

	@PutMapping("/updateempdata")
	public String update(@RequestParam int empid, @RequestBody EmployeeManagement newemp) {
//		em.setEmpid(empid);
		return empservice.update(empid, newemp);
	}

	@GetMapping("/findbyfirstname")
	public List<EmployeeManagement> findByFirstname(@RequestParam String firstname) {
		return empservice.findByFirstname(firstname);
	}

	@GetMapping("/findbylastname")
	public List<EmployeeManagement> findByLastname(@RequestParam String lastname) {
		return empservice.findByLastname(lastname);
	}

	@GetMapping("/findbydesignation")
	public List<EmployeeManagement> findByDesignation(@RequestParam String designation) {
		return empservice.findByDesignation(designation);
	}

	@GetMapping("/findbbydepartment")
	public List<EmployeeManagement> findByDepartment(@RequestParam String department) {
		return empservice.findByDepartment(department);
	}
}
