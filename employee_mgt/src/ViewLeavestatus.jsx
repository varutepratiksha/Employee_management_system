import React, { useEffect, useState } from "react";
import axios from "axios";
import EmpNav from "./EmpNav";


export default function ViewLeavestatus() {



  const [leaves, setLeaves] = useState([]);
  const [reload, setReload] = useState(false);

  const [leaveId, setLeaveId] = useState(null);
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [reason, setReason] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [empid, setEmpid] = useState("");
  const [status, setStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("userinfo") || "{}");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/leaves/getLeaveByEmpId?empid=${user.empid}`)
      .then((res) => setLeaves(res.data))
      .catch(() => alert("Error fetching leaves"));
  }, [reload]);

  const readyToUpdate = (leave) => {
    setLeaveId(leave.id);
    setFromdate(leave.fromdate);
    setTodate(leave.todate);
    setReason(leave.reason);
    setEmpid(leave.employee?.empid);
    setFirstname(leave.firstname);
    setLastname(leave.lastname);
    setStatus(leave.status);
  };

  const readyToDelete = (leave) => {
    setLeaveId(leave.id);
  };

  const updateLeave = () => {
    axios
      .put(`http://localhost:8080/leaves/updateLeave?id=${leaveId}`, {
        fromdate,
        todate,
        reason,
      })
      .then((res) => {
       alert(res.data);
        setReload(!reload);
      })
      .catch(() => alert("Error while updating leave"));
  };

  const cancelLeave = () => {
    axios
      .delete(`http://localhost:8080/leaves/cancelLeave?id=${leaveId}`)
      .then((res) => {
        alert(res.data);
        setReload(!reload);
      })
      .catch(() => alert("Error while cancelling leave"));
  };

  return (
    <div className="container mt-4">
      <EmpNav></EmpNav>
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h4>My Leave Status</h4>
        </div>

        <div className="card-body">
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Leave ID</th>
                <th>Emp Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr>
                  <td>{leave.id}</td>
                  <td>{leave.employee?.empid}</td>
                  <td>{leave.firstname}</td>
                  <td>{leave.lastname}</td>
                  <td>{leave.fromdate}</td>
                  <td>{leave.todate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span
                      className={
                        leave.status === "Pending" ? "badge bg-primary"
                        : leave.status === "rejected" ?
                          "badge bg-danger"
                        : "badge bg-success"
                      }
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                      onClick={() => readyToUpdate(leave)}
                      disabled={leave.status !== "Pending"}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => readyToDelete(leave)}
                      disabled={leave.status !== "Pending"}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPDATE MODAL */}
      <div className="modal fade" id="updateModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Update Leave</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="date"
                className="form-control mb-2"
                value={fromdate}
                onChange={(e) => setFromdate(e.target.value)}
              />
              <input
                type="date"
                className="form-control mb-2"
                value={todate}
                onChange={(e) => setTodate(e.target.value)}
              />
              <textarea
                className="form-control"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={updateLeave}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Cancel Leave</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body text-center">
              Are you sure you want to cancel this leave?
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                No
              </button>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={cancelLeave}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
