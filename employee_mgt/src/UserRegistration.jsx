import React, { useState } from "react";
import axios from "axios";

export default function UserRegistration() {

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    gender: "",
    empid: "",
    username: "",
    password: "",
    condfirmpassword: "",
    role: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("Invalid Email Format");
      return;
    }

    // Contact validation
    if (!/^\d{10}$/.test(user.contact)) {
      alert("Contact number must be 10 digits");
      return;
    }

    // Password match validation
    if (user.password !== user.condfirmpassword) {
      alert("Password and Confirm Password must match");
      return;
    }

    // ✅ DIRECT API CALL (no app variable)
    axios
      .post("http://localhost:8080/saveuser", user)
      .then(() => {
        alert("User Registered Successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Error while registering user");
      });
  };

  return (
    <div style={{ width: "400px", margin: "auto" }} className="form-container">
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="firstname"
          placeholder="First Name"
          value={user.firstname}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="lastname"
          placeholder="Last Name"
          value={user.lastname}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="contact"
          placeholder="Contact Number"
          value={user.contact}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Gender:</label><br />
        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={handleChange}
          required
        /> Male
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={handleChange}
          required
        /> Female
        <br /><br />

        <input
          name="empid"
          placeholder="Employee ID"
          value={user.empid}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="password"
          name="condfirmpassword"
          placeholder="Confirm Password"
          value={user.condfirmpassword}
          onChange={handleChange}
          required
        /><br /><br />

        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </select>
        <br /><br />

        <button type="submit">Register</button>

      </form>
    </div>
  );
}
