import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { clearAuthSession } from "../utils/auth";

const Navbar = ({ user, setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll and listen for Escape key when sidebar is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  const handleLogout = () => {
    setSidebarOpen(false);
    clearAuthSession();
    setUser(null);
    navigate("/login");
  };

  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  return (
    <>
      {/* =========================================
          MAIN TOP NAVIGATION BAR
      ========================================== */}
      <nav className="custom-navbar sticky-top py-2" role="navigation" aria-label="Main Navigation">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo / Brand */}
          <Link
            to={user?.role === "ADMIN" ? "/admin/dashboard" : "/"}
            className="navbar-brand d-flex align-items-center gap-2 text-decoration-none m-0"
          >
            <span className="fs-3">📚</span>
            <div>
              <span className="fw-bold text-white fs-5 tracking-tight">YourBook</span>
              <span className="d-block text-secondary small" style={{ fontSize: "0.68rem", marginTop: "-3px" }}>
                {user?.role === "ADMIN" ? "Admin Management" : "Online Bookstore"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (>= 992px) */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {user ? (
              user.role === "ADMIN" ? (
                <>
                  <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                    📊 Dashboard
                  </NavLink>
                  <NavLink to="/admin/books" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                    📖 Manage Books
                  </NavLink>
                  <NavLink to="/admin/categories" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                    🏷️ Categories
                  </NavLink>
                  <NavLink to="/admin/orderlist" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                    📦 Orders
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                    🏠 Home
                  </NavLink>
                  <NavLink to="/books" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                    📚 Explore Books
                  </NavLink>
                  <NavLink to="/cart" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                    🛒 Cart
                  </NavLink>
                  <NavLink to="/order" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                    📦 Orders
                  </NavLink>
                  <NavLink to="/about" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                    ℹ️ About
                  </NavLink>
                </>
              )
            ) : (
              <>
                <NavLink to="/about" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                  ℹ️ About
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`}>
                  Sign In
                </NavLink>
                <Link to="/register" className="btn btn-primary btn-sm px-3 fw-semibold ms-2">
                  Get Started
                </Link>
              </>
            )}

            {/* Desktop User Status & Logout */}
            {user && (
              <div className="d-flex align-items-center gap-2 ms-3 ps-3 border-start border-secondary">
                <span
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                  style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}
                  title={user.email}
                >
                  {getInitial(user.email)}
                </span>
                <div className="d-flex flex-column text-start">
                  <span className="text-white small fw-semibold text-truncate" style={{ maxWidth: "120px" }}>
                    {user.email?.split("@")[0]}
                  </span>
                  <span className={`badge ${user.role === "ADMIN" ? "bg-warning text-dark" : "bg-secondary"} p-0 px-1`} style={{ fontSize: "0.62rem" }}>
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm ms-2 py-1 px-2 small"
                  title="Sign Out"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right Controls (< 992px) */}
          <div className="d-flex d-lg-none align-items-center gap-2">
            {user && user.role === "USER" && (
              <Link to="/cart" className="btn btn-outline-light btn-sm position-relative px-2 py-1">
                🛒
              </Link>
            )}

            <button
              className="custom-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={sidebarOpen}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* =========================================
          MOBILE SIDEBAR WITH BG BLUR BACKDROP
      ========================================== */}

      {/* Background Blur Overlay */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Sidebar Drawer */}
      <aside
        className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}
        aria-label="Mobile Sidebar Menu"
        aria-hidden={!sidebarOpen}
      >
        {/* Sidebar Header */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary border-opacity-25">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-4">📚</span>
            <div>
              <h6 className="fw-bold text-white mb-0">YourBook</h6>
              <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                {user?.role === "ADMIN" ? "Admin Console" : "Reader Portal"}
              </small>
            </div>
          </div>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* User Card inside Sidebar (if logged in) */}
        {user ? (
          <div className="p-3 mx-3 mt-3 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 d-flex align-items-center gap-3">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style={{ width: "42px", height: "42px", fontSize: "1.1rem" }}
            >
              {getInitial(user.email)}
            </div>
            <div className="overflow-hidden">
              <span className="d-block text-white fw-bold text-truncate small">
                {user.email}
              </span>
              <span className={`badge ${user.role === "ADMIN" ? "bg-warning text-dark" : "bg-primary"} mt-1 small`}>
                {user.role === "ADMIN" ? "👑 Store Admin" : "👤 Verified Customer"}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3 mx-3 mt-3 rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-25 text-center">
            <span className="d-block text-white fw-semibold small mb-2">Welcome, Guest Reader!</span>
            <div className="d-flex gap-2 justify-content-center">
              <Link to="/login" className="btn btn-sm btn-primary flex-grow-1" onClick={() => setSidebarOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-sm btn-outline-light flex-grow-1" onClick={() => setSidebarOpen(false)}>
                Register
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Links inside Sidebar */}
        <div className="p-3 flex-grow-1 d-flex flex-column gap-1">
          <small className="text-uppercase text-secondary fw-bold px-2 mb-1" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>
            Navigation
          </small>

          {user?.role === "ADMIN" ? (
            <>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>📊</span> Dashboard Overview
              </NavLink>
              <NavLink
                to="/admin/books"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>📖</span> Manage Book Inventory
              </NavLink>
              <NavLink
                to="/admin/categories"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>🏷️</span> Manage Categories
              </NavLink>
              <NavLink
                to="/admin/orderlist"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>📦</span> All Customer Orders
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>🏠</span> Home Store
              </NavLink>
              <NavLink
                to="/books"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>📚</span> Explore All Books
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span>🛒</span> Shopping Cart
                  </NavLink>
                  <NavLink
                    to="/order"
                    className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span>📦</span> My Order History
                  </NavLink>
                </>
              )}
              <NavLink
                to="/about"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>ℹ️</span> About YourBook
              </NavLink>
            </>
          )}
        </div>

        {/* Sidebar Footer with Logout */}
        {user && (
          <div className="p-3 border-top border-secondary border-opacity-25 mt-auto">
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
            >
              <span>🚪</span> Log Out Account
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;
