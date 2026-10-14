import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import AdminPanel from "./pages/Admin/AdminPanel";
import AboutUs from "./pages/AboutUs";
import OrderPage from "./pages/OrderPage";
import AdminManageCategory from "./pages/Admin/AdminManageCategory";
import AdminOrderList from "./pages/Admin/AdminOrderList";
import Checkout from "./pages/Chackout";
import AdminBookList from "./pages/Admin/AdminBookList";

import { getAuthSession } from "./utils/auth";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getAuthSession();

    if (session?.token && session?.email && session?.role) {
      setUser({ email: session.email, role: session.role });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* Public Routes */}
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/login"
          element={user ? <Navigate to={user.role === "ADMIN" ? "/admin/dashboard" : "/"} replace /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Customer / Common Protected Routes */}
        <Route
          path="/"
          element={user ? (user.role === "ADMIN" ? <Navigate to="/admin/dashboard" replace /> : <Home />) : <Navigate to="/login" replace />}
        />
        <Route
          path="/books"
          element={user ? <Books /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/checkout"
          element={user ? <Checkout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/order"
          element={user ? <OrderPage /> : <Navigate to="/login" replace />}
        />

        {/* Administrator Routes with Role Guarding */}
        {user?.role === "ADMIN" && (
          <>
            <Route path="/admin/dashboard" element={<AdminPanel />} />
            <Route path="/admin/books" element={<AdminBookList />} />
            <Route path="/admin/categories" element={<AdminManageCategory />} />
            <Route path="/admin/orderlist" element={<AdminOrderList />} />
          </>
        )}

        {/* Fallback Catch-All */}
        <Route
          path="*"
          element={<Navigate to={user ? (user.role === "ADMIN" ? "/admin/dashboard" : "/") : "/login"} replace />}
        />
      </Routes>
    </>
  );
};

export default App;
