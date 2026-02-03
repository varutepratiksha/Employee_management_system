package com.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Entity.LeaveApplication;
//import org.springframework.data.jpa.repository.Query;



public interface LeaveApplicationRepository extends JpaRepository<LeaveApplication, Integer> {

//	@Query(value = "SELECT * FROM leave_applications WHERE empid = :empid", nativeQuery = true)
//	List<LeaveApplication> findLeavesByEmployeeId(@org.springframework.data.repository.query.Param("empid") int empid);

	public List<LeaveApplication> findByEmployee_Empid(int empid);

}
