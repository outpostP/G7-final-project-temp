// import axios from "axios";
// import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate, Outlet } from "react-router-dom";
import StorePage from "./components/store/StorePage";
import Sidebar from "./Layout/Sidebar";
import Homepage from "./Layout/Homepage";
import LoginForm, { Login } from "./components/login/Login";

import { useNavigate } from 'react-router-dom';

function checkIsAdmin() {
  const role = localStorage.getItem('isAdmin');
  return role === 'true';
}

function ProtectedAdminRoute() {
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin();

  if (!isAdmin) {
    navigate('/admin');
    return null;
  }

  return <Outlet />;
}

function ProtectedUserRoute() {
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin();

  if (isAdmin) {
    navigate('/user');
    return null;
  }

  return <Outlet />;
}


function AdminDashboard() {
  return <h1>AdminDashboard</h1>;
}

function AdminSettings() {
  return <h1>AdminSettings</h1>;
}

function AdminReports() {
  return <h1>AdminReports</h1>;
}

function UserDashboard() {
  return <h1>UserDashboard</h1>;
}

function UserSettings() {
  return <h1>UserSettings</h1>;
}

function UserProfile() {
  return <h1>UserProfile</h1>;
}


const router = createBrowserRouter(
  createRoutesFromElements(
    
      <Route path="/" element={<Homepage />}>
        <Route index element={<LoginForm />} />
      
        <Route path="admin" element={<ProtectedAdminRoute/>}>
          <Route index element={<AdminDashboard />} /> 
          <Route path="settings" element={<AdminSettings />} /> 
          <Route path="reports" element={<AdminReports />} /> 
        </Route>

        <Route path="user" element={<ProtectedUserRoute/>}>
          <Route index element={<StorePage />}/> 
          <Route path="store" element={<UserDashboard />} /> 
          <Route path="settings" element={<UserSettings />} /> 
          <Route path="profile" element={<UserProfile />} /> 
        </Route>

      </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
