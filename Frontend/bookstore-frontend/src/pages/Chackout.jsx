import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { getAuthToken, getAuthEmail, getAuthHeaders } from "../utils/auth";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "COD",
  });

  const getTotalPrice = () => {
    return cart
      ? cart.reduce((total, item) => total + (item.book?.price || 0) * item.quantity, 0)
      : 0;
  };

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    const userId = getAuthEmail();

    if (!cart || cart.length === 0) return;

    setLoading(true);

    const orderDetails = {
      userId: userId,
      items: cart.map((item) => ({
        book: { id: item.book.id || item.book._id },
        quantity: item.quantity,
        priceAtPurchase: item.book.price,
      })),
      totalPrice: getTotalPrice(),
      shippingAddress,
    };

    try {
      await axios.post(`http://localhost:8080/orders/${userId}`, orderDetails, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
      });

      setShowModal(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Secure Checkout</h2>

      {!cart || cart.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <h4>No items to checkout</h4>
          <p className="text-muted">Your cart is empty. Please add books before proceeding.</p>
          <Link to="/books" className="btn btn-primary btn-sm">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Shipping and Payment Form */}
          <div className="col-12 col-lg-7">
            <div className="card shadow-sm border-0 rounded-3 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">📦 Shipping & Delivery Details</h5>

              <form onSubmit={handlePlaceOrder}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Recipient Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Enter recipient full name"
                    required
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="123 Academic Way, Apt 4B"
                    required
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="Ahmedabad"
                      required
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Postal / PIN Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      className="form-control"
                      placeholder="380001"
                      required
                      value={shippingAddress.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">Payment Option</label>
                  <div className="form-check p-3 border rounded mb-2">
                    <input
                      className="form-check-input ms-0 me-2"
                      type="radio"
                      name="paymentMethod"
                      id="cod"
                      value="COD"
                      checked={shippingAddress.paymentMethod === "COD"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="cod">
                      💵 Cash on Delivery (Pay upon arrival)
                    </label>
                  </div>
                  <div className="form-check p-3 border rounded">
                    <input
                      className="form-check-input ms-0 me-2"
                      type="radio"
                      name="paymentMethod"
                      id="upi"
                      value="UPI"
                      checked={shippingAddress.paymentMethod === "UPI"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="upi">
                      📱 UPI / Online Card Demo Simulation
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-3 fw-bold fs-6 shadow-sm"
                  disabled={loading}
                >
                  {loading ? "Confirming Order..." : `Confirm & Place Order (₹${getTotalPrice().toFixed(2)})`}
                </button>
              </form>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm border-0 rounded-3 p-4 sticky-top" style={{ top: "90px" }}>
              <h5 className="fw-bold mb-3 border-bottom pb-2">Order Items ({cart.length})</h5>

              <div className="mb-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {cart.map((item) => (
                  <div key={item.book.id || item.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                      <h6 className="mb-0 fw-semibold text-truncate" style={{ maxWidth: "220px" }}>
                        {item.book.title}
                      </h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <span className="fw-semibold">₹{(item.book.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Standard Delivery</span>
                <span className="text-success fw-bold">FREE</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <strong className="fs-5">Grand Total</strong>
                <strong className="fs-5 text-primary">₹{getTotalPrice().toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-success">
            🎉 Order Placed Successfully!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4 text-center">
          <div className="fs-1 mb-2">📦</div>
          <p className="lead mb-2">Thank you for ordering with YourBook!</p>
          <p className="text-muted small">
            Your items are now being prepared for shipment. You can track this order in your customer portal.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 justify-content-center gap-2">
          <Button variant="outline-primary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
          <Button variant="primary" onClick={() => navigate("/order")}>
            View My Orders
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Checkout;
