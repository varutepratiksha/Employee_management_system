import React from 'react'
import AdminNav from './AdminNav'
import EmpNav from './EmpNav';

export default function AboutUs() {
    let user=JSON.parse(localStorage.getItem("userinfo"));
  return (
    <div>
       {user?.role==="Admin"?<AdminNav></AdminNav>:<EmpNav></EmpNav>}
        <h1>This is our About Us Page..!!</h1>
    </div>
  )
}
