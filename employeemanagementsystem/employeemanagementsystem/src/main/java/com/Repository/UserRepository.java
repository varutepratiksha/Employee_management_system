package com.Repository;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByUsername(String username);
	//registration: This method check user can not enter same username again and again
	//During login:It checks username already exists or not if yes then user is valid
}
