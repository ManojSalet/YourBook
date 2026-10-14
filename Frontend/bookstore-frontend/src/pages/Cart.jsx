import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { getAuthToken, getAuthEmail, getAuthHeaders } from "../utils/auth";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    const token = getAuthToken();
    const userId = getAuthEmail();

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8080/cart/${userId}`, {
        headers: getAuthHeaders(),
      })
      .then((response) => {
        setCart(response.data.cartItems || []);
      })
      .catch((error) => console.error("Error fetching cart:", error))
      .finally(() => setLoading(false));
  };

  const removeFromCart = (bookId) => {
    const token = getAuthToken();
    const userId = getAuthEmail();

    axios
      .delete(`http://localhost:8080/cart/${userId}/remove/${bookId}`, {
        headers: getAuthHeaders(),
      })
      .then((response) => {
        setCart(response.data.cartItems || []);
      })
      .catch((error) => console.error("Error removing book:", error));
  };

  const checkout = () => {
    navigate("/checkout", { state: { cart } });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.book?.price || 0) * item.quantity, 0);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">🛒 Your Shopping Cart</h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading your cart...</p>
        </div>
      ) : cart.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4 shadow-sm p-4">
          <span className="fs-1 d-block mb-3">🛍️</span>
          <h4 className="fw-bold">Your cart is currently empty</h4>
          <p className="text-muted mb-4">
            Looks like you haven't added any books to your cart yet.
          </p>
          <Link to="/books" className="btn btn-primary px-4 py-2 fw-semibold">
            Explore Bookstore Catalog
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0 rounded-3 p-3">
              <h5 className="fw-bold mb-3 border-bottom pb-2">
                Cart Items ({cart.length})
              </h5>

              {cart.map((item) => (
                <div
                  key={item.book.id || item.id}
                  className="d-flex align-items-center gap-3 py-3 border-bottom last-border-none"
                >
                  <img
                    src={
                      item.book.imageUrl ||
                      item.book.image ||
                      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"
                    }
                    alt={item.book.title}
                    style={{
                      width: "70px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{item.book.title}</h6>
                    <small className="text-muted d-block mb-1">
                      By {item.book.author}
                    </small>
                    <span className="text-primary fw-bold">₹{item.book.price}</span>
                    <span className="badge bg-light text-dark ms-2 border">
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <div className="text-end">
                    <div className="fw-bold mb-2">
                      ₹{(item.book.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.book.id)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0 rounded-3 p-4 sticky-top" style={{ top: "90px" }}>
              <h5 className="fw-bold mb-3 border-bottom pb-2">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span className="text-success fw-semibold">FREE</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Taxes (Estimated)</span>
                <span>₹0.00</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong className="fs-5">Total</strong>
                <strong className="fs-5 text-primary">₹{getTotalPrice().toFixed(2)}</strong>
              </div>

              <button
                className="btn btn-success w-100 py-2 fw-semibold shadow-sm"
                onClick={checkout}
              >
                Proceed to Checkout 💳
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
