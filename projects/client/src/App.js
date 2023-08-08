import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import StorePage from "./components/store/StorePage";
import Homepage from "./Layout/Homepage";
import AdminReportAll from "./pages/AdminReportAll";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "./pages/AdminProductAll";
import TransactionList, {
  currentTransactionLoader,
  transactionId,
} from "./pages/AdminReportPage";
import ReportLayout from "./Layout/reports";
import ProductList, {
  currentProductLoader,
  productId,
} from "./pages/AdminProductPage";
import ProductAdd from "./pages/AdminProductAdd";
import ProductLayout from "./Layout/AdminProducts";
import TransactionUnpaid from "./pages/AdminReportUnpaid";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPasswordPage";
import AdminEmployee from "./pages/AdminEmployeePage";

function checkIsAdmin() {
  const role = localStorage.getItem("isAdmin");
  return role === "true";
}

function ProtectedAdminRoute() {
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/user");
    }
  }, [isAdmin, navigate]);

  return <Outlet />;
}

function ProtectedUserRoute() {
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  return <Outlet />;
}

function checkIsAuthenticated() {
  const token = localStorage.getItem("token");
  return token !== null;
}

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = checkIsAuthenticated();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return children;
}

function AdminDashboard() {
  return <h1>AdminDashboard</h1>;
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
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="admin" element={<ProtectedAdminRoute />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <ProductLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <ProductTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoute>
                <ProductAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
            loader={currentProductLoader}
          />
          <Route path="employee" element={<AdminEmployee />} />
        </Route>
        <Route
          path="reports"
          element={
            <ProtectedRoute>
              <ReportLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <AdminReportAll />
              </ProtectedRoute>
            }
          />
          <Route
            path="unpaid"
            element={
              <ProtectedRoute>
                <TransactionUnpaid />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <TransactionList />{" "}
              </ProtectedRoute>
            }
            loader={currentTransactionLoader}
          />
        </Route>
      </Route>
      <Route path="user" element={<ProtectedUserRoute />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <StorePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="board"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
