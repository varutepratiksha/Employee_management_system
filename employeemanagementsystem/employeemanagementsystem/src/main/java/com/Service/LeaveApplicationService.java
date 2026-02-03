package com.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Entity.EmployeeManagement;
import com.Entity.LeaveApplication;
import com.Repository.EmployeeRepository;
import com.Repository.LeaveApplicationRepository;



@Service
public class LeaveApplicationService {

	@Autowired
	private LeaveApplicationRepository leaveRepo;

	@Autowired
	private EmployeeRepository empRepo;

	// Show leaves by Employee id
	public List<LeaveApplication> findLeavesByEmployeeId(int empid) {
		return leaveRepo.findByEmployee_Empid(empid);
	}

	// Apply Leave
	public String applyLeave(int empid, LeaveApplication leave) {

		EmployeeManagement emp = empRepo.findByEmpid(empid);

		if (emp != null) {
			leave.setEmployee(emp);
			leave.setStatus("Pending");
			leaveRepo.save(leave);
			return "Leave applied successfully...!";
		} else {
			return "Employee not found with ID: " + empid;
		}
	}

	// Get All Leaves
	public List<LeaveApplication> getAllLeaves() {
		return leaveRepo.findAll();
	}

	// Update Leave Details
	public String updateLeave(int id, LeaveApplication leaveData) {
		LeaveApplication leave = leaveRepo.findById(id).orElse(null);

		if (leave != null) {
			leave.setFromdate(leaveData.getFromdate());
			leave.setTodate(leaveData.getTodate());
			leave.setReason(leaveData.getReason());
			leaveRepo.save(leave);
			return "Leave details updated successfully...!";
		} else {
			return "Leave application not found with ID: " + id;
		}
	}

	// Approve / Reject Leave
	public String updateStatus(int id, String status) {
		LeaveApplication leave = leaveRepo.findById(id).orElse(null);

		if (leave != null) {
			leave.setStatus(status);
			leaveRepo.save(leave);
			return "Leave status updated successfully...!";
		} else {
			return "Leave application not found with ID: " + id;
		}
	}

	// Cancel Leave
	public String cancelLeave(int id) {
		LeaveApplication leave = leaveRepo.findById(id).orElse(null);

		if (leave != null) {
			leaveRepo.deleteById(id);
			return "Leave application cancelled successfully...!";
		} else {
			return "Leave application not found with ID: " + id;
		}
	}

}