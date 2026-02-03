import React from 'react'
import AdminNav from './AdminNav'

export default function AdminDashboard() {
  return (
    <div className='admindash w-100' style={{"height":"100vh"}}>
        <AdminNav></AdminNav>
        <h1>Welcome to Admin..!!</h1>
    </div>
  )
}
