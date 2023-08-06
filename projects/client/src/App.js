// import axios from "axios";
// import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider,  Outlet } from "react-router-dom";
import StorePage from "./components/store/StorePage";
// import Sidebar from "./Layout/Sidebar";
import Homepage from "./Layout/Homepage";
import LoginForm from "./components/login/Login";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function checkIsAdmin() {
  const role = localStorage.getItem('isAdmin');
  return role === 'true';
}

function ProtectedAdminRoute() {
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/user');
    }
  }, [isAdmin, navigate]);

  return <Outlet />;
}

function ProtectedUserRoute() {
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  return <Outlet />;
}

  function checkIsAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null;
  }
  
  function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const isAuthenticated = checkIsAuthenticated();
  
    if (!isAuthenticated) {
      navigate('/login');
      return null;
    }
  
    return children;
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
      <Route path="admin" element={<ProtectedAdminRoute />}>
        <Route index element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> 
        <Route path="settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} /> 
        <Route path="reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} /> 
      </Route>
      <Route path="user" element={<ProtectedUserRoute />}>
        <Route index element={<ProtectedRoute><StorePage /></ProtectedRoute>} /> 
        <Route path="board" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} /> 
        <Route path="settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} /> 
        <Route path="profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} /> 
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
