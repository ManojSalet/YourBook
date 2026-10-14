import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthToken, getAuthEmail, getAuthHeaders } from "../utils/auth";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartMessage, setCartMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all books
    axios
      .get("http://localhost:8080/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));

    // Fetch all categories
    axios
      .get("http://localhost:8080/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleAddToCart = async (book) => {
    const token = getAuthToken();
    const userId = getAuthEmail();

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/cart/${userId}/add/${book.id}?quantity=1`,
        {},
        { headers: getAuthHeaders() }
      );
      setCartMessage(`"${book.title}" added to your cart!`);
      setTimeout(() => setCartMessage(""), 3000);
    } catch (err) {
      console.error("Cart error:", err);
      setCartMessage("Failed to add book to cart.");
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  return (
    <div className="pb-5">
      {/* Hero Section */}
      <div className="bg-primary bg-gradient text-white py-5 mb-4 shadow-sm">
        <div className="container py-4 text-center">
          <h1 className="display-4 fw-bold mb-3">Welcome to YourBook</h1>
          <p className="lead mx-auto mb-4" style={{ maxWidth: "680px" }}>
            Explore thousands of bestselling titles, tech masterclasses, personal growth classics, and visionary fiction at your fingertips.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/books" className="btn btn-light btn-lg fw-semibold px-4 shadow-sm">
              Explore All Books 📚
            </Link>
            <Link to="/about" className="btn btn-outline-light btn-lg px-4">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        {cartMessage && (
          <div className="alert alert-success alert-dismissible fade show sticky-top shadow-sm" role="alert" style={{ top: "70px", zIndex: 1050 }}>
            🛒 {cartMessage}
            <button type="button" className="btn-close" onClick={() => setCartMessage("")}></button>
          </div>
        )}

        {/* Explore Categories Section */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold m-0">Explore Genres & Categories</h3>
            <Link to="/books" className="text-decoration-none small fw-semibold">
              View all &rarr;
            </Link>
          </div>

          <div className="row g-3">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="col-6 col-md-4 col-lg-2-4" style={{ flex: "0 0 auto", width: "20%" }}>
                  <Link
                    to={`/books?category=${encodeURIComponent(category.name)}`}
                    className="card h-100 text-decoration-none text-dark border-0 shadow-sm p-3 text-center rounded-3 bg-white hover-shadow transition"
                    style={{ transition: "all 0.2s ease-in-out" }}
                  >
                    <span className="fs-2 mb-2">🏷️</span>
                    <h6 className="fw-bold mb-1">{category.name}</h6>
                    <small className="text-muted text-truncate d-block">{category.description || "Browse collection"}</small>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-muted">Loading categories...</p>
            )}
          </div>
        </div>

        {/* Featured Books Section */}
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold m-0">Featured & Popular Books</h3>
            <span className="text-muted small">{books.length} titles available</span>
          </div>

          <div className="row g-4">
            {books.length > 0 ? (
              books.slice(0, 8).map((book) => (
                <div key={book.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden d-flex flex-column">
                    <div style={{ height: "260px", overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                      <img
                        src={book.imageUrl || book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"}
                        className="card-img-top w-100 h-100"
                        alt={book.title}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column p-3">
                      <span className="badge bg-secondary-subtle text-secondary align-self-start mb-2 small">
                        {book.category?.name || "General"}
                      </span>
                      <h6 className="card-title fw-bold text-truncate mb-1" title={book.title}>
                        {book.title}
                      </h6>
                      <small className="text-muted mb-2">{book.author}</small>
                      <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
                        <span className="fs-5 fw-bold text-primary">₹{book.price}</span>
                        <button
                          className="btn btn-warning btn-sm fw-semibold"
                          onClick={() => handleAddToCart(book)}
                        >
                          + Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No books currently available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
