import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/register", formData);
      setSuccessMessage(
        typeof response.data === "string"
          ? response.data
          : "Registration successful! Redirecting to login..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div
        className="card shadow-lg p-4 border-0"
        style={{ width: "100%", maxWidth: "440px", borderRadius: "12px" }}
      >
        <div className="text-center mb-3">
          <span className="fs-1">📖</span>
          <h3 className="fw-bold mt-2">Create Account</h3>
          <p className="text-muted small">Join our YourBook community</p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger py-2 small" role="alert">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success py-2 small" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold small">Full Name / Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold small">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold small">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold small">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small">Account Role</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="USER">Customer (Browse, Cart & Order)</option>
              <option value="ADMIN">Administrator (Manage Inventory & Orders)</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <p className="mt-4 text-center text-muted small mb-0">
          Already have an account?{" "}
          <Link to="/login" className="fw-semibold text-decoration-none">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
