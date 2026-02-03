package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.LeaveApplication;
import com.Service.LeaveApplicationService;



@RestController
@RequestMapping("/leaves")
@CrossOrigin
public class LeaveApplicationController {

	@Autowired
	private LeaveApplicationService service;

	// Get Leaves by Employee ID
	@GetMapping("/getLeaveByEmpId")
	public List<LeaveApplication> getLeaveByEmpId(@RequestParam int empid) {
		return service.findLeavesByEmployeeId(empid);
	}

	// Apply Leave
	@PostMapping("/applyLeave")
	public String applyLeave(@RequestParam int empid, @RequestBody LeaveApplication leave) {
		return service.applyLeave(empid, leave);
	}

	// Get All Leaves
	@GetMapping("/findallleaves")
	public List<LeaveApplication> getAllLeaves() {
		return service.getAllLeaves();
	}

	// Update Leave Details
	@PutMapping("/updateLeave")
	public String updateLeave(@RequestParam int id, @RequestBody LeaveApplication leave) {
		return service.updateLeave(id, leave);
	}

	// Approve / Reject Leave
	@PutMapping("/updateStatus")
	public String updateStatus(@RequestParam int id, @RequestParam String status) {
		return service.updateStatus(id, status);
	}

	// Cancel Leave
	@DeleteMapping("/cancelLeave")
	public String cancelLeave(@RequestParam int id) {
		return service.cancelLeave(id);
	}
}
