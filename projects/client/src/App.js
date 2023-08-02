import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CashierCartPage";
import Sidebar from "./pages/SidebarPage";

function App() {
  const location = useLocation();
  let showSidebar = location.pathname !== "/" ? true : false;

  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        {showSidebar && <Sidebar />}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/transaction" element={<CartPage />}></Route>
            <Route path="/report" element={<CartPage />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
