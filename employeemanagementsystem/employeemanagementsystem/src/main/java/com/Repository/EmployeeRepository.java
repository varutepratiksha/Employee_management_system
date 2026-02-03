package com.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Entity.EmployeeManagement;



@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeManagement, Integer> {

	public List<EmployeeManagement> findByFirstname(String firstname);

	public List<EmployeeManagement> findByLastname(String lastname);

	public List<EmployeeManagement> findByDesignation(String designation);

	public List<EmployeeManagement> findByDepartment(String department);

	EmployeeManagement findByEmpid(int empid);

}
