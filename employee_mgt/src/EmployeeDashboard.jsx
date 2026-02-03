import React, { useEffect, useState } from "react";
import axios from "axios";
import EmpNav from "./EmpNav";



export default function EmployeeDashboard() {

   

  let [employees, setEmployees] = useState([]);
  let [reload, setReload] = useState(false);
  let [searchType, setSearchType] = useState("");
  let [searchValue, setSearchValue] = useState("");
  let [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/findallempdata`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch(() => {
        alert("Error in get Method...");
      });
  }, [reload]);

  let searchEmployees = (e) => {
    e.preventDefault();
    let url = "";

    if (searchType === "firstname") {
      url = `http://localhost:8080/findbyfirstname?firstname=${searchValue}`;
    } else if (searchType === "lastname") {
      url = `http://localhost:8080/findbylastname?lastname=${searchValue}`;
    } else if (searchType === "designation") {
      url = `http://localhost:8080/findbydesignation?designation=${searchValue}`;
    } else if (searchType === "department") {
      url = `http://localhost:8080/findbbydepartment?department=${searchValue}`;
    }

    axios.get(url).then((response) => {
      if (response.data.length === 0) {
        alert(
          `No records found for ${searchType}: "${searchValue}"\nShowing all employees.`,
        );
        setSearchResults([]);
        setReload(!reload);
      } else {
        setSearchResults(response.data);
      }
    });
  };

  return (
    <div>
      <EmpNav />

      <div className="container text-center mt-4">
        <h1 className="text-danger mb-2">Employee Dashboard</h1>
        <p className="">
          Welcome to the Employee dashboard. Here you can see all employees.
        </p>
      </div>

      {/* Search Bar */}
      <form
        className="d-flex flex-wrap align-items-center gap-2 bg-white p-3 rounded shadow-sm mx-3 mb-4"
        onSubmit={searchEmployees}
      >
        <span className="fw-semibold text-secondary">Search:</span>

        <select
          className="form-select w-auto"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="firstname">First Name</option>
          <option value="lastname">Last Name</option>
          <option value="designation">Designation</option>
          <option value="department">Department</option>
        </select>

        {searchType && (
          <>
            <input
              className="form-control form-control-sm w-auto"
              type="search"
              placeholder={`Enter ${searchType}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
            <button className="btn btn-sm btn-primary fw-semibold" type="submit">
              Search
            </button>
          </>
        )}
      </form>

      {/* Employee Cards */}
      <div
        className="container-fluid py-4"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #48c18c, #a36366)",
        }}
      >
        <div className="row g-4">
          {(searchResults.length > 0 ? searchResults : employees).map((emp) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3"
              key={emp.empid}
            >
              <div
                className="card shadow-sm h-100"
                style={{ borderRadius: "12px", overflow: "hidden" }}
              >
                <img
                  src={emp.profile}
                  className="card-img-top"
                  alt="Employee"
                  style={{ height: "180px", objectFit: "cover" }}
                />

                <div className="card-body p-3">
                  <h6 className="card-title text-primary mb-2">
                    {emp.firstname} {emp.lastname}
                  </h6>

                  <p className="small mb-1">
                    Email: <strong>{emp.email}</strong>
                  </p>
                  <p className="small mb-1">
                    Contact: <strong>{emp.contactno}</strong>
                  </p>
                  <p className="small mb-1">
                    Department: <strong>{emp.department}</strong>
                  </p>
                  <p className="small mb-0">
                    Designation: <strong>{emp.designation}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
