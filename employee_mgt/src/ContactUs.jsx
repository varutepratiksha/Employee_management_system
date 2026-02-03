import React from 'react'
import AdminNav from './AdminNav'
import EmpNav from './EmpNav';

export default function ContactUs() {
    let user=JSON.parse(localStorage.getItem("userinfo"));
  return (
    <div>
      {user?.role==="Admin"?<AdminNav></AdminNav>:<EmpNav></EmpNav>}
        <h1>ContactUs Page..!!</h1>
    </div>
  )
}
    let user=JSON.parse(localStorage.getItem("userinfo"));
    {user?.role==="Admin"?<AdminNav></AdminNav>:<EmpNav></EmpNav>}