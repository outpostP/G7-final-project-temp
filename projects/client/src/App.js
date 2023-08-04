// import axios from "axios";
// import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import StorePage from "./components/store/StorePage";
import Homepage from "./Layout/Homepage";
import LoginPage from "./pages/LoginPage";

function checkIsAdmin() {
  const role = JSON.parse(localStorage.getItem("isAdmin"));
  return role;
}

function ProtectedAdminRoute() {
  const isAdmin = checkIsAdmin();
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

// ProtectedRoute for non-admin users
function ProtectedUserRoute() {
  const isAdmin = checkIsAdmin();
  return !isAdmin ? <Outlet /> : <Navigate to="/" />;
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
      <Route index element={<LoginPage />} />
      <Route path="store" element={<StorePage />} />

      <Route path="admin" element={<ProtectedAdminRoute />}>
        <Route index element={<AdminDashboard />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      <Route path="user" element={<ProtectedUserRoute />}>
        <Route index element={<UserDashboard />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
