import axios from "axios";
import React, { useState } from "react";
//import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {



  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let navigate = useNavigate();

  let handlelogin = (e) => {
    e.preventDefault();

    let u = { username, password };

    // for understanding
    //   Axios flow:

    // 200 OK        → then()
    // 401 / 403     → catch()
    // 500 / server  → catch()

    axios
      .post(`http://localhost:8080/login`, u)
      .then((res) => {
        // Only SUCCESS responses come here
        // toast.success(`Welcome ${res.data.firstname}! Login Successful`);
        localStorage.setItem("userinfo", JSON.stringify(res.data)); // this is used to save user session data directly in the browser.
        if (res.data.role === "Admin") {
          navigate("/admindashboard");
          alert("Login Successful as an Admin!");
        } else {
          navigate("/employeedashboard");
          alert("Login Successful as an Employee!");
        }
      })
      .catch((err) => {
        //  Error responses come here
        if (err.response && err.response.data) {
          alert(err.response.data);
        } else {
          alert("Server error. Please try again later.");
        }
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg border-0 rounded-4 w-100"
        style={{ maxWidth: "420px" }}
      >
        <div className="card-body p-4 p-md-5">
          <h3 className="text-center mb-4 fw-bold">User Login</h3>

          <form onSubmit={handlelogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                required
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
            </div>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => navigate("/")}
              >
                New User? Click here for Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
