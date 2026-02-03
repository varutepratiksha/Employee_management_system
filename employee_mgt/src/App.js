import './App.css';

import GetEmployee from './GetEmployee';
import Home from './Home';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Service from './Service';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';

import LeaveApplicationForm from './LeaveApplicationForm';
import UpdateLeaveStatus from './UpdateLeaveStatus';
import AddEmployee from './AddEmployee';
import RegisterUser from './RegisterUser';
import LoginUser from './LoginUser';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewLeavestatus from './ViewLeavestatus';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/addemp" element={<AddEmployee />} />
          <Route path="/getemp" element={<GetEmployee />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/service" element={<Service />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/employeedashboard" element={<EmployeeDashboard />} />
          <Route path="/login" element={<LoginUser></LoginUser>}></Route>
          <Route
          path="/"
          element={
            // passing props to the register and for login

            <RegisterUser path="/"></RegisterUser>
          }
        ></Route>
          <Route
          path="/leaveapplication"
          element={<LeaveApplicationForm></LeaveApplicationForm>}
        ></Route>
          <Route
          path="/viewleavestatus"
          element={<ViewLeavestatus></ViewLeavestatus>}
        ></Route>
          <Route path="/update" element={<UpdateLeaveStatus />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
          <Route path="/viewemp" element={<GetEmployee></GetEmployee>}></Route>
          <Route path='/updateleavestatus' element={<UpdateLeaveStatus></UpdateLeaveStatus>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
