import React, { useEffect, useState } from "react";
import axios from "axios";
//import { toast } from "react-toastify";
import AdminNav from "./AdminNav";

export default function UpdateLeaveStatus() {
 


  let [leaves, setLeaves] = useState([]);
  let [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/leaves/findallleaves`)
      .then((response) => {
        setLeaves(response.data);
      })
      .catch((error) => {
        alert("Error in get Method...");
      });
  }, [reload]);

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:8080/leaves/updateStatus`, null, {
        params: {
          id: id,
          status: status,
        },
      })
      .then((res) => {
        alert(res.data);
        setReload(!reload);
      })
      .catch((err) => {
        alert("Failed to update leave status");
      });
  };

  return (
    <div>
      <AdminNav></AdminNav>
      <h2 className="text-center mt-4">Update Leave Status</h2>

      <div className="container mt-4">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
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
            {leaves.length > 0 ?
              leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.id}</td>
                  <td>{leave.firstname}</td>
                  <td>{leave.lastname}</td>
                  <td>{leave.fromdate}</td>
                  <td>{leave.todate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span
                      className={
                        leave.status === "approved" ? "badge bg-success"
                        : leave.status === "rejected" ?
                          "badge bg-danger"
                        : "badge bg-warning text-dark"
                      }
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => updateStatus(leave.id, "approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => updateStatus(leave.id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            : <tr>
                <td colSpan="8" className="text-center">
                  No Leave Applications Found
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
