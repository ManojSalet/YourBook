import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getAuthToken, getAuthEmail, getAuthHeaders } from "../utils/auth";

const Books = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartAlert, setCartAlert] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");
  const navigate = useNavigate();

  // Load categories and books
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);

    // Fetch categories
    axios
      .get("http://localhost:8080/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch books
    let url = "http://localhost:8080/books";
    if (categoryName) {
      url = `http://localhost:8080/books/category/${encodeURIComponent(categoryName)}`;
    }

    axios
      .get(url)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error("Error fetching books:", error))
      .finally(() => setLoading(false));
  }, [categoryName, navigate]);

  // Add selected book to the cart
  const addToCart = async (book) => {
    const userId = getAuthEmail();
    const token = getAuthToken();

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/cart/${userId}/add/${book.id}?quantity=1`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );
      setCartAlert(`Added "${book.title}" to cart! 🛒`);
      setTimeout(() => setCartAlert(""), 3000);
    } catch (error) {
      console.error("Error adding book to cart:", error);
      setCartAlert("Failed to add book to cart. Please try again.");
      setTimeout(() => setCartAlert(""), 3000);
    }
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      {cartAlert && (
        <div className="alert alert-success alert-dismissible fade show sticky-top shadow-sm" role="alert" style={{ top: "70px", zIndex: 1050 }}>
          {cartAlert}
          <button type="button" className="btn-close" onClick={() => setCartAlert("")}></button>
        </div>
      )}

      {/* Header and Search */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            {categoryName ? `${categoryName} Books` : "All Bookstore Catalog"}
          </h2>
          <p className="text-muted small mb-0">Browse through our curated collection of books</p>
        </div>

        <div style={{ maxWidth: "340px", width: "100%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="d-flex flex-wrap gap-2 mb-4 border-bottom pb-3">
        <Link
          to="/books"
          className={`btn btn-sm ${!categoryName ? "btn-primary" : "btn-outline-secondary"}`}
        >
          All Genres ({books.length})
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/books?category=${encodeURIComponent(category.name)}`}
            className={`btn btn-sm ${category.name === categoryName ? "btn-primary" : "btn-outline-secondary"}`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Book Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading books...</p>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="row g-4">
          {filteredBooks.map((book) => (
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
                  <span className="badge bg-light text-dark border align-self-start mb-2 small">
                    {book.category?.name || "General"}
                  </span>
                  <h6 className="card-title fw-bold text-truncate mb-1" title={book.title}>
                    {book.title}
                  </h6>
                  <small className="text-muted mb-2">By {book.author}</small>
                  {book.description && (
                    <p className="text-muted small text-truncate-2 mb-3" style={{ fontSize: "0.85rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {book.description}
                    </p>
                  )}
                  <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
                    <div>
                      <span className="fs-5 fw-bold text-dark">₹{book.price}</span>
                      <small className="text-success d-block" style={{ fontSize: "0.75rem" }}>
                        In stock ({book.stockQuantity})
                      </small>
                    </div>
                    <button
                      className="btn btn-warning btn-sm fw-semibold"
                      onClick={() => addToCart(book)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-light rounded-3">
          <h4>No books found</h4>
          <p className="text-muted">Try clearing your search query or selecting another category.</p>
          <Link to="/books" className="btn btn-primary btn-sm">
            Reset Filter
          </Link>
        </div>
      )}
    </div>
  );
};

export default Books;
