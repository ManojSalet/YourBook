import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { setAuthSession } from "../utils/auth";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, role, email: userEmail } = response.data;
        setAuthSession(token, userEmail || email, role);
        setUser({ email: userEmail || email, role });

        if (role.trim().toUpperCase() === "ADMIN") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password! Please check credentials."
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Demo auto-fill helpers for portfolio reviewers
  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow-lg p-4 border-0" style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}>
        <div className="text-center mb-3">
          <span className="fs-1">📚</span>
          <h3 className="fw-bold mt-2">Welcome Back</h3>
          <p className="text-muted small">Sign in to your YourBook account</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small" role="alert">
            {error}
          </div>
        )}

        {/* Demo Quick Fill for Portfolio Showcase */}
        <div className="p-3 mb-3 bg-light rounded border text-center">
          <small className="fw-bold text-secondary d-block mb-2">⚡ Quick Demo Logins (Portfolio Showcase)</small>
          <div className="d-flex gap-2 justify-content-center">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => fillCredentials("admin@test.com", "admin123")}
            >
              👑 Admin Demo
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={() => fillCredentials("manoj@test.com", "test123")}
            >
              👤 Customer Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold small">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-muted small mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="fw-semibold text-decoration-none">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
