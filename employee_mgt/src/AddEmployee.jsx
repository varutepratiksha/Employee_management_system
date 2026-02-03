import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';

export default function AddEmployee() {
  let app=process.env.REACT_APP_SERVER_IP;
    let[firstname,setFirstname]=useState("");
    let[lastname,setLastname]=useState("");
    let[department,setDepartment]=useState("");
    let[salary,setSalary]=useState(0.0);
    let[joiningdate,setJoiningdate]=useState("");
    let[dob,setDob]=useState("");
    let[email,setEmail]=useState("");
    let[exp,setExp]=useState(0);
    let[address,setAddress]=useState("");
    let[gender,setGender]=useState("");
    let[status,setStatus]=useState("");
    let[profile,setProfile]=useState("");
    let[contactno,setContactno]=useState(0);
    let[reportingmanager,setReportingmanager]=useState("");
    let[adharcardno,setAdharcardno]=useState(0);
    let[panno,setPanno]=useState(0);
    let[designation,setDesignation]=useState("");
    let [errors, setErrors] = useState({});


    let handleprofile=(event)=>
    {
        console.log(event.target.files[0]);
        let file=event.target.files[0];

        let filepath = `/Images/${file.name}`;

        console.log(filepath);
        setProfile(filepath);
        
    }
    let addemp=(event)=>
    {
        event.preventDefault();
        let employee={firstname,lastname,department,salary,joiningdate,dob,email,exp,address,gender,status,profile,contactno,reportingmanager,adharcardno,panno,designation}
        axios.post(`http://localhost:8080/addempdata`,employee)
        .then((response)=>
        {
           
                alert(response.data)
            
        }
        )
        .catch((error)=>
        {
            alert("Error in post opeartion");
        }
        )
    }
    // form validation
    const validateForm = () => {
  let temp = {};


  if (!firstname.trim())
    temp.firstname = "First Name is required";

  if (!lastname.trim())
    temp.lastname = "Last Name is required";

  if (!email.trim())
    temp.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(email))
    temp.email = "Invalid email format";

  if (!salary || salary <= 0)
    temp.salary = "Salary must be greater than 0";

  setErrors(temp);
  return Object.keys(temp).length === 0;
};
const isFormValid =
  firstname && lastname && email && salary > 0 && Object.keys(errors).length === 0;



  return (
    <div>
      <AdminNav></AdminNav>
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add Employee</h4>
        </div>

        <div className="card-body">
          <form onSubmit={addemp}>
            <div className="row g-3">

              <div className="col-md-6">
                <input className="form-control" type="text" placeholder="First Name" onChange={(event)=>{setFirstname(event.target.value)}}/>
                {errors.firstname && <small className="text-danger">{errors.firstname}</small>}

              </div>

              <div className="col-md-6">
                <input className="form-control" type="text" placeholder="Last Name" onChange={(event)=>{setLastname(event.target.value)}}/>
                {errors.lastname && <small className="text-danger">{errors.lastname}</small>}


              </div>


              <div className="col-md-6">
                <input className="form-control" type="text" placeholder="Department" onChange={(event)=>{setDepartment(event.target.value)}}/>
              </div>

              <div className="col-md-6">
                <input className="form-control" type="text" placeholder="Designation" onChange={(event)=>{setDesignation(event.target.value)}}/>
              </div>

              <div className="col-md-6">
                <input className="form-control" type="number" placeholder="Salary" onChange={(event)=>{setSalary(event.target.value)}}/>
                {errors.salary && <small className="text-danger">{errors.salary}</small>}

              </div>

              <div className="col-md-6">
                <input className="form-control" type="number" placeholder="Experience (Years)" onChange={(event)=>{setExp(event.target.value)}}/>
              </div>

              <div className="col-md-6">
                <label className="form-label">Joining Date</label>
                <input className="form-control" type="date" onChange={(event)=>{setJoiningdate(event.target.value)}}/>
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input className="form-control" type="date" onChange={(event)=>{setDob(event.target.value)}}/>
              </div>

              <div className="col-md-6">
                <input className="form-control" type="email" placeholder="Email" onChange={(event)=>{setEmail(event.target.value)}}/>
                {errors.email && <small className="text-danger">{errors.email}</small>}

              </div>

              <div className="col-md-6">
                <input className="form-control" type="number" placeholder="Contact Number" onChange={(event)=>{setContactno(event.target.value)}}/>
              </div>

              <div className="col-md-6">
                <select className="form-select"onChange={(event)=>{setGender(event.target.value)}}>
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <select className="form-select"onChange={(event)=>{setStatus(event.target.value)}}>
                  <option>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="col-md-6">
                <input type='file' accept='image/*' class="form-control" onChange={(event)=>{handleprofile(event)}}/>
              </div>

              <div className="col-md-6">
                <input className="form-control" type="text" placeholder="Reporting Manager" onChange={(event)=>{setReportingmanager(event.target.value)}}/>
              </div>

              <div className="col-md-6">
                <input className="form-control" type="number" placeholder="Aadhar Card No" onChange={(event)=>{setAdharcardno(event.target.value)}}/>
              </div>

              <div className="col-md-6">
                <input className="form-control" type="text" placeholder="PAN Number" onChange={(event)=>{setPanno(event.target.value)}}/>
              </div>

              <div className="col-12">
                <textarea className="form-control" rows="3" placeholder="Address"onChange={(event)=>{setAddress(event.target.value)}}></textarea>
              </div>

              <div className="col-12 text-center mt-3">
                <button className="btn btn-success px-5" type="submit"disabled={!isFormValid}>
                  
                  Add Employee
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}