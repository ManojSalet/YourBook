import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthHeaders } from "../../utils/auth";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    booksCount: 0,
    categoriesCount: 0,
    ordersCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const headers = getAuthHeaders();
        const [booksRes, catRes, ordersRes] = await Promise.allSettled([
          axios.get("http://localhost:8080/admin/books", { headers }),
          axios.get("http://localhost:8080/admin/categories", { headers }),
          axios.get("http://localhost:8080/admin/orders", { headers }),
        ]);

        const books = booksRes.status === "fulfilled" && Array.isArray(booksRes.value.data) ? booksRes.value.data : [];
        const categories = catRes.status === "fulfilled" && Array.isArray(catRes.value.data) ? catRes.value.data : [];
        const orders = ordersRes.status === "fulfilled" && Array.isArray(ordersRes.value.data) ? ordersRes.value.data : [];

        setStats({
          booksCount: books.length,
          categoriesCount: categories.length,
          ordersCount: orders.length,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">👑 Store Management Dashboard</h2>
        <p className="text-muted small">
          Administrative control center for inventory, genres, and customer orders
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 rounded-3 p-3 bg-primary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-white-50 fw-semibold text-uppercase">Total Catalog Titles</small>
                <h2 className="fw-bold mt-1 mb-0">{loading ? "..." : stats.booksCount}</h2>
              </div>
              <span className="fs-1">📖</span>
            </div>
            <Link to="/admin/books" className="text-white text-decoration-none mt-3 small fw-semibold d-inline-block">
              Manage inventory &rarr;
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 rounded-3 p-3 bg-success text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-white-50 fw-semibold text-uppercase">Active Categories</small>
                <h2 className="fw-bold mt-1 mb-0">{loading ? "..." : stats.categoriesCount}</h2>
              </div>
              <span className="fs-1">🏷️</span>
            </div>
            <Link to="/admin/categories" className="text-white text-decoration-none mt-3 small fw-semibold d-inline-block">
              Manage categories &rarr;
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 rounded-3 p-3 bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-white-50 fw-semibold text-uppercase">Orders Received</small>
                <h2 className="fw-bold mt-1 mb-0">{loading ? "..." : stats.ordersCount}</h2>
              </div>
              <span className="fs-1">📦</span>
            </div>
            <Link to="/admin/orderlist" className="text-white text-decoration-none mt-3 small fw-semibold d-inline-block">
              Review orders &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Navigation Panels */}
      <h5 className="fw-bold mb-3">Management Modules</h5>
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm border-0 rounded-3 p-4">
            <span className="fs-2 mb-2">📚</span>
            <h5 className="fw-bold">Book Inventory</h5>
            <p className="text-muted small">
              Add new book titles, update cover artwork, set pricing, and modify stock quantities in real time.
            </p>
            <Link to="/admin/books" className="btn btn-outline-primary btn-sm mt-auto fw-semibold">
              Open Book Manager
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm border-0 rounded-3 p-4">
            <span className="fs-2 mb-2">🏷️</span>
            <h5 className="fw-bold">Category Architecture</h5>
            <p className="text-muted small">
              Define genre taxonomies, literary categories, and subcategories to streamline buyer discovery.
            </p>
            <Link to="/admin/categories" className="btn btn-outline-success btn-sm mt-auto fw-semibold">
              Open Category Manager
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm border-0 rounded-3 p-4">
            <span className="fs-2 mb-2">📦</span>
            <h5 className="fw-bold">Order Fulfillment</h5>
            <p className="text-muted small">
              Track customer orders, review cart items, view transaction totals, and cancel or fulfill orders.
            </p>
            <Link to="/admin/orderlist" className="btn btn-outline-dark btn-sm mt-auto fw-semibold">
              Open Order Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
