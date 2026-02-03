package com.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Entity.EmployeeManagement;
import com.Repository.EmployeeRepository;



@Service
public class EmployeeService {

	@Autowired 
	EmployeeRepository emprepo;

	public String add(EmployeeManagement emp) {
		// emprepo.saveAll(emp); no need to add all coz one emp can add one data at a
		// time
		emprepo.save(emp);
		return "Employee data added successfully..!!";
	}

	public List<EmployeeManagement> findAll() {
		return emprepo.findAll();
	}

	// find employee by empid
	public EmployeeManagement findbyempid(int empid) {
		return emprepo.findById(empid).orElse(null);
	}

	// delete employee by empid
	public String deleteById(int empid) {
		EmployeeManagement existingemp = emprepo.findById(empid).orElse(null);
		if (existingemp == null) {
			return "No matching record found for the given empid";
		} else {

			emprepo.deleteById(empid);
			return "Employee " + empid + " deleted successfully..!!";
		}
	}

	// Update employee by id

	public String update(int empid, EmployeeManagement newemp) {
		EmployeeManagement existingemp = emprepo.findById(empid).orElse(null);
		if (existingemp == null) {
			return "No record found for the given empid";
		}
		if (newemp.getFirstname() == null && newemp.getLastname() == null && newemp.getAddress() == null
				&& newemp.getAdharcardno() == 0 && newemp.getContactno() == 0 && newemp.getDepartment() == null
				&& newemp.getDesignation() == null && newemp.getDob() == null && newemp.getEmail() == null
				&& newemp.getExp() == 0 && newemp.getGender() == null && newemp.getJoiningdate() == null
				&& newemp.getPanno() == null && newemp.getProfile() == null && newemp.getReportingmanager() == null
				&& newemp.getSalary() == 0.0 && newemp.getStatus() == null) {
			return "No record found for the updation..!!";
		}

		if (newemp.getFirstname() != null) {
			existingemp.setFirstname(newemp.getFirstname());
		}
		if (newemp.getLastname() != null) {
			existingemp.setLastname(newemp.getLastname());
		}

		if (newemp.getAddress() != null) {
			existingemp.setAddress(newemp.getAddress());
		}
		if (newemp.getAdharcardno() != 0) {
			existingemp.setAdharcardno(newemp.getAdharcardno());
		}
		if (newemp.getContactno() != 0) {
			existingemp.setContactno(newemp.getContactno());
		}
		if (newemp.getDepartment() != null) {
			existingemp.setDepartment(newemp.getDepartment());
		}
		if (newemp.getDesignation() != null) {
			existingemp.setDesignation(newemp.getDesignation());
		}
		if (newemp.getDob() != null) {
			existingemp.setDob(newemp.getDob());
		}
		if (newemp.getEmail() != null) {
			existingemp.setEmail(newemp.getEmail());
		}
		if (newemp.getExp() != 0) {
			existingemp.setExp(newemp.getExp());
		}
		if (newemp.getGender() != null) {
			existingemp.setGender(newemp.getGender());
		}
		if (newemp.getJoiningdate() != null) {
			existingemp.setJoiningdate(newemp.getJoiningdate());
		}
		if (newemp.getPanno() != null) {
			existingemp.setPanno(newemp.getPanno());
		}
		if (newemp.getProfile() != null) {
			existingemp.setProfile(newemp.getProfile());
		}
		if (newemp.getReportingmanager() != null) {
			existingemp.setReportingmanager(newemp.getReportingmanager());
		}
		if (newemp.getSalary() != 0.0) {
			existingemp.setSalary(newemp.getSalary());
		}
		if (newemp.getStatus() != null) {
			existingemp.setStatus(newemp.getStatus());
		}

		emprepo.save(existingemp);
		return "Employee data updated successfully..!!";
	}

	// searching code

	public List<EmployeeManagement> findByFirstname(String firstname) {
		return emprepo.findByFirstname(firstname);
	}

	public List<EmployeeManagement> findByLastname(String lastname) {
		return emprepo.findByLastname(lastname);
	}

	public List<EmployeeManagement> findByDesignation(String designation) {
		return emprepo.findByDesignation(designation);
	}

	public List<EmployeeManagement> findByDepartment(String department) {
		return emprepo.findByDepartment(department);
	}
}
