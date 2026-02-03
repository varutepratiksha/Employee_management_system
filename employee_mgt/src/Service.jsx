import React from "react";
import AdminNav from "./AdminNav";
import EmpNav from "./EmpNav";

export default function Service() {
  let user = JSON.parse(localStorage.getItem("userinfo"));
  return (
    <div>
      {user?.role === "Admin" ?
        <AdminNav></AdminNav>
      : <EmpNav></EmpNav>}
      <h1>Service Page..!!</h1>
    </div>
  );
}
