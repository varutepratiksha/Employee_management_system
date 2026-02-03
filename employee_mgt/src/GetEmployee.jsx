import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";



export default function GetEmployee() {
  


  let [employee, setEmployee] = useState([]);
  let [reload, setReload] = useState(false);
  let [isvisible, setIsvisible] = useState(false);
  let [empid, setEmpid] = useState();
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastnme] = useState("");
  let [department, setDepartment] = useState("");
  let [salary, setSalary] = useState(0.0);
  let [email, setEmail] = useState("");
  let [contactno, setContactno] = useState(0);
  let [joiningdate, setJoiningdate] = useState("");
  let [dob, setDob] = useState("");
  let [designation, setDesignation] = useState("");
  let [exp, setExp] = useState(0);
  let [address, setAddress] = useState("");
  let [gender, setGender] = useState("");
  let [status, setStatus] = useState("");
  let [profile, setProfile] = useState("");
  let [reportingmanager, setReportingmanager] = useState("");
  let [adharcardno, setAdharcardno] = useState(0);
  let [panno, setPanno] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/findallempdata`)
      .then((res) => {
        setEmployee(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert("Operation failed in Get Operations..!!");
      });
  }, [reload]);

  // Delete emp

  let deleteemp = (empid) =>
    axios
      .delete(`http://localhost:8080/deletebyempid?empid=${empid}`)
      .then((res) => {
        if (res.data) {
          alert(res.data);
          setReload(!reload);
        }
      })
      .catch((err) => {
        alert("Operation failed in delete..!!");
      });

  // Update..

  let readytoupdate = (emp) => {
    setIsvisible(true);
    setFirstname(emp.firstname);
    setLastnme(emp.lastname);
    setDepartment(emp.department);
    setSalary(emp.salary);
    setEmail(emp.email);
    setContactno(emp.contactno);
    setJoiningdate(emp.joiningdate);
    setDob(emp.dob);
    setDesignation(emp.designation);
    setExp(emp.exp);
    setAddress(emp.address);
    setGender(emp.gender);
    setStatus(emp.status);
    setProfile(emp.profile);
    setReportingmanager(emp.reportingmanager);
    setAdharcardno(emp.adharcardno);
    setPanno(emp.panno);
    setEmpid(emp.empid);
  };

  let update = (e) => {
    e.preventDefault();
    let empupdate = {
      firstname,
      lastname,
      department,
      salary,
      email,
      contactno,
      joiningdate,
      dob,
      designation,
      exp,
      address,
      gender,
      status,
      profile,
      reportingmanager,
      adharcardno,
      panno,
    };
    axios
      .put(`http://localhost:8080/updateempdata?empid=${empid}`, empupdate)
      .then((res) => {
        if (res.data === "Employee data updated successfully..!!") {
         alert("Record Updated successfully..!!");
          setIsvisible(false);
          setReload(!reload);
        }
      })
      .catch((err) => {
        alert("failed to update record");
        //  setIsvisible(false);
      });
  };

  let handleprofile = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    let filepath = `/Images/${file.name}`;
    // alert(filepath);
    console.log(filepath);
    setProfile(filepath);
  };

  return (
    <div>
      <AdminNav></AdminNav>
      <div className="container-fluid">
        <div className="row">
          {employee.map((emp) => (
            <div className="col-3">
              <div className="card col-3" style={{ width: "18rem" }}>
                {/* <img
                  src={emp.profile}
                  class="card-img-top"
                  alt={emp.profile}
                ></img> */}
                <div className="card-body">
                  <h5 className="card-title">
                    {emp.firstname} {emp.lastname}
                  </h5>
                  <p class="card-text">
                    <p>
                      Email: <strong>{emp.email}</strong>
                    </p>
                    <p>
                      Contact No: <strong>{emp.contactno}</strong>
                    </p>
                    <p>
                      Department: <strong>{emp.department}</strong>
                    </p>
                    <p>
                      Designation: <strong>{emp.designation}</strong>
                    </p>
                  </p>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this employee?",
                        )
                      ) {
                        deleteemp(emp.empid);
                      }
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => readytoupdate(emp)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isvisible ?
        <div class="modal show d-block">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Update Employee Data Here...</h5>
                <button
                  type="button"
                  class="btn-close"
                  onClick={() => setIsvisible(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={update}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastnme(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Salary"
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Experience (Years)"
                        onChange={(e) => setExp(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Joining Date</label>
                      <input
                        className="form-control"
                        type="date"
                        value={joiningdate}
                        onChange={(e) => setJoiningdate(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Date of Birth</label>
                      <input
                        className="form-control"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Contact Number"
                        onChange={(e) => setContactno(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <select
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        Upload Profile Picture
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        placeholder="Profile"
                        onChange={(e) => {
                          handleprofile(e);
                        }}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Reporting Manager"
                        value={reportingmanager}
                        onChange={(e) => setReportingmanager(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Aadhar Card No"
                        onChange={(e) => setAdharcardno(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="PAN Number"
                        value={panno}
                        onChange={(e) => setPanno(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      UPDATE 
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      : null}
    </div>
  );
}
