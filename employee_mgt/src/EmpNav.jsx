import React from "react";
import { Link } from "react-router-dom";
// import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function EmpNav() {
  let navivagte = useNavigate();

  let logout = () => {
    localStorage.removeItem("userinfo");
    localStorage.clear();
    navivagte("/");
  };

  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-warning bg-dark">

        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            EMS
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/contactus" className="nav-link">
                  Contact Us
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/aboutus" className="nav-link">
                  About Us
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/services" className="nav-link">
                  Our Services
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/leaveapplication" className="nav-link">
                  Leave Application
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/viewleavestatus" className="nav-link">
                  View Leave Status
                </Link>
              </li>
              <li class="nav-item">
                <button className="nav-link btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </li>
              {/* */}
            </ul>
            {/* <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
