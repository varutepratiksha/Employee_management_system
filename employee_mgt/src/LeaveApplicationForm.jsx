import React, { useEffect, useState } from "react";
import axios from "axios";
import EmpNav from "./EmpNav";


export default function LeaveApplicationForm() {
 


  let [empid, setEmpid] = useState(0);
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [fromdate, setFromdate] = useState("");
  let [todate, setTodate] = useState("");
  let [reason, setReason] = useState("");
  const today = new Date().toISOString().split("T")[0]; // date validation

  let user = JSON.parse(localStorage.getItem("userinfo"));
  useEffect(() => {
    setEmpid(user.empid);
    setFirstname(user.firstname);
    setLastname(user.lastname);
  }, []);

  let applyForLeave = (e) => {
    e.preventDefault();

    if (!fromdate || !todate) {
      alert("Please select both from date and to date");
      return;
    }

    if (fromdate > todate) {
      alert("From date cannot be greater than to date");
      return;
    }

    let leaveData = {
      firstname,
      lastname,
      fromdate,
      todate,
      reason,
      employee: { empid },
      status: "Pending",
    };

    axios
      .post(`http://localhost:8080/leaves/applyLeave?empid=${empid}`, leaveData)

      .then((response) => {
        console.log("----------------");
        if (response.data === "Leave applied successfully...!") {
       alert ("Leave Application Submitted Successfully!");
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        alert("Server error while applying leave!");
      });
  };

  return (
    <div className="container mt-5">
      <EmpNav></EmpNav>
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h4>Leave Application</h4>
        </div>

        <div className="card-body">
          <form onSubmit={applyForLeave}>
            {/* Employee ID */}
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Employee ID"
              value={empid}
              readOnly
            />

            {/* First Name */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="First Name"
              value={firstname}
              readOnly
            />

            {/* Last Name */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Last Name"
              value={lastname}
              readOnly
            />

            {/* From Date */}
            <input
              type="date"
              className="form-control mb-3"
              value={fromdate}
              min={today}
              onChange={(e) => setFromdate(e.target.value)}
              required
            />

            {/* To Date */}
            <input
              type="date"
              className="form-control mb-3"
              value={todate}
              min={today}
              onChange={(e) => setTodate(e.target.value)}
              required
            />

            {/* Reason */}
            <textarea
              className="form-control mb-3"
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>

            {/* Apply Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
