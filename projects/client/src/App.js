// import axios from "axios";
// import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, createRoutesFromElements,useNavigate, Route, RouterProvider, Redirect, Outlet } from "react-router-dom";
import StorePage from "./components/store/StorePage";
// import Sidebar from "./Layout/Sidebar";
import Homepage from "./Layout/Homepage";
import LoginForm from "./components/login/Login";
import AdminReportAll from './pages/AdminReportAll'
import { useEffect } from 'react';
import ProductTable from "./pages/AdminProductAll";
import TransactionList, {currentTransactionLoader} from "./pages/AdminReportPage";
import ReportLayout from "./Layout/reports";
import ProductList, { currentProductLoader } from "./pages/AdminProductPage";
import ProductAdd from "./pages/AdminProductAdd";
import ProductLayout from "./Layout/AdminProducts";
import TransactionUnpaid from "./pages/AdminReportUnpaid";
import CategoryTable from "./pages/AdminCategoryPage";
import CategoryEdit, { currentCategoryLoader } from "./pages/AdminCategoryEdit";
import CategoryLayout from "./Layout/Category";
import AddCategoryForm from "./pages/AdminProductAdd";
import AdminLayout from "./Layout/AdminLayouts";
import EmployeePage from "./pages/AdminEmployeePage";
import ResetPasswordPage from "./pages/ResetPasswordPage"
import Checkout, {checkoutLoader} from "./pages/CashierCheckout";
import CategoryAdd from "./pages/AdminCategoryAdd";

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



// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   const isAuthenticated = checkIsAuthenticated();

//   if (!isAuthenticated) {
//     navigate("/login");
//     return null;
//   }

//   return children;
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Homepage />}>
  <Route path="reset-password/:token" element={<ResetPasswordPage />} />
<Route index element={<LoginForm />} />
<Route path="admin" element={<ProtectedAdminRoute />}>
  <Route index element={<ProtectedRoute><EmployeePage /></ProtectedRoute>} /> 
  <Route path="reports" element={<ProtectedRoute><ReportLayout /></ProtectedRoute>}>
    <Route index element={<ProtectedRoute><AdminReportAll /></ProtectedRoute>} /> 
    <Route path="unpaid" element={<ProtectedRoute><TransactionUnpaid />  </ProtectedRoute>} /> 
    <Route path=":id" element={<ProtectedRoute><TransactionList />  </ProtectedRoute>} loader={currentTransactionLoader} /> 
</Route>
    <Route path="products" element={<ProtectedRoute><ProductLayout /></ProtectedRoute>} > 
      <Route index element={<ProtectedRoute><ProductTable /></ProtectedRoute>} /> 
      <Route path="add" element={<ProtectedRoute><ProductAdd /></ProtectedRoute>}  /> 
      <Route path=":id" element={<ProtectedRoute><ProductList /></ProtectedRoute>} loader={currentProductLoader}/> 
  </Route>
  <Route path="category" element={<ProtectedRoute><CategoryLayout /></ProtectedRoute>}>
    <Route index element={<ProtectedRoute><CategoryTable /></ProtectedRoute>}/>
    <Route path="add" element={<ProtectedRoute><CategoryAdd /></ProtectedRoute>}/>
    <Route path=":id" element={<ProtectedRoute><CategoryEdit /></ProtectedRoute>} loader={currentCategoryLoader} />
  </Route>
</Route>
<Route path="user" element={<ProtectedUserRoute />}>
  <Route index element={<ProtectedRoute><StorePage /></ProtectedRoute>} /> 
  <Route path="checkout/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} loader={checkoutLoader} /> 
</Route>
</Route>
  )
  );
  

function App() {
  return <RouterProvider router={router} />;
}

export default App
