import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5">
            <div className="text-center mb-4">
              <span className="fs-1">📚</span>
              <h2 className="fw-bold mt-2">About YourBook</h2>
              <p className="text-muted">Empowering lifelong learners and avid readers everywhere</p>
            </div>

            <p className="lead mb-4">
              Welcome to <strong>YourBook</strong> — your premier online literary haven.
              We are dedicated to connecting readers with extraordinary literature, technical knowledge,
              and transformative self-growth resources with a focus on <em>quality, affordability, and seamless browsing</em>.
            </p>

            <h5 className="fw-bold mt-3">🎯 Our Mission</h5>
            <p className="text-muted">
              Our mission is to foster a culture of reading and accessibility. Whether you are diving into computer science architecture, exploring far-off sci-fi universes, or honing daily habits, we curate high-value titles that make an impact.
            </p>

            <h5 className="fw-bold mt-3">🌟 Why Choose Us?</h5>
            <div className="row g-2 mb-4">
              <div className="col-sm-6">
                <div className="p-2 border rounded bg-light small">📖 Carefully Curated Catalog</div>
              </div>
              <div className="col-sm-6">
                <div className="p-2 border rounded bg-light small">⚡ Instant Order Processing</div>
              </div>
              <div className="col-sm-6">
                <div className="p-2 border rounded bg-light small">🛡️ Secure JWT Authentication</div>
              </div>
              <div className="col-sm-6">
                <div className="p-2 border rounded bg-light small">💬 24/7 Dedicated Reader Support</div>
              </div>
            </div>

            <h5 className="fw-bold mt-3">📬 Contact & Information</h5>
            <p className="text-muted small mb-1">
              <strong>Email:</strong> support@yourbook.local
            </p>
            <p className="text-muted small mb-1">
              <strong>Project:</strong> Full-Stack E-Commerce Web Application
            </p>

            <div className="text-center mt-4 pt-3 border-top">
              <Link to="/" className="btn btn-primary px-4 fw-semibold">
                &larr; Back to Home Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
