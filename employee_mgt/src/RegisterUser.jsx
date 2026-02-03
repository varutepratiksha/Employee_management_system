import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
 
let navigate=useNavigate();
  let [isregister, setIsregister] = useState(false);
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [email, setEmail] = useState("");
  let [contactno, setContactno] = useState("");
  let [gender, setGender] = useState("");
  let [empid, setEmpid] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");
  let [role, setRole] = useState("");

  let validationForm = () => {
    if (password.length < 8 || password.length > 13) {
      alert("Plz enter pass between 8 to 13");
      return false;
    } else if (confirmpassword !== password) {
      alert("Plz enter same password..!!");
      return false;
    } else if (!/^\d{10}$/.test(contactno)) {
      alert("Please Enter Valid Phone number with 10 Digits..!!!");
      return false;
    }
    // satya123@gmail.com
    //    @yahoo  .in, .org, .gov
    //    @radif {2,} it means min 2 and maximum not limitations + indicates more values can enter
    else if (!/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$/.test(email)) {
      alert("Please enter valid emailid...!!");
      return false;
    } else {
      return true;
    }
  };

  let registration = (e) => {
    e.preventDefault();
    if (!validationForm()) {
      // if come false then it becomes true and if true it becomes false
      return; // executio stop means not go for post method
    }

    axios
      .get(`http://localhost:8080/findbyempid?empid=${empid}`)
      .then((res) => {
        // this condition will says if any matched value from emp id then will move for registration
        if (res.data) {
          // if emp id exists
          let u = {
            firstname,
            lastname,
            contactno,
            email,
            gender,
            empid,
            username,
            password,
            confirmpassword,
            role,
          };
          axios
            .post(`http://localhost:8080/registration`, u)
            .then((res) => {
              if (res.data === "Registration successful") {
                alert(
                  `Dear ${firstname} ${lastname}, Registration successfully done...!`,
                );
                setIsregister(true);
                navigate("/login")

                //    setFirstname(""),setLastname(""),setContactno(""),
                //    setEmail(""),setGender(""),setEmpid(""),setUsername(""),setPassword(""),setConfirmpassword(""),setRole("");
              } else {
                alert(res.data);
              }
            })
            .catch((err) => {
              alert("Server error, please try again later.");
            });
        }
        // if empid does not exists
        else {
          alert("Employee Id Does not belongs to our data.");
        }
      })
      // findbyempid block
      .catch((err) => {
        alert("Server error, please try again later.");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg border-0 rounded-4 w-100"
        style={{ maxWidth: "520px" }}
      >
        <div className="card-body p-4 p-md-5">
        

          {!isregister ?
            <form onSubmit={registration}>
                <h3 className="text-center mb-4 fw-bold">Employee Registration</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Contact No</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={contactno}
                    onChange={(e) => setContactno(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={empid}
                    onChange={(e) => setEmpid(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Register
                </button>
              </div>

              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate("/login")}
                >
                  Already Registered? Click here for Login
                </button>
              </div>
            </form>
          : null}
        </div>
      </div>
    </div>
  );
}
