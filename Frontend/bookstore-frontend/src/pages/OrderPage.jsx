import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, getAuthEmail, getAuthHeaders } from "../utils/auth";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");
  const token = getAuthToken();
  const userId = getAuthEmail();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [userId, token]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/orders/${userId}`, {
        headers: getAuthHeaders(),
      });
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(`http://localhost:8080/orders/${orderId}`, {
        headers: getAuthHeaders(),
      });
      setOrders(orders.filter((order) => order.id !== orderId));
      setAlertMsg("Order successfully cancelled.");
      setTimeout(() => setAlertMsg(""), 3000);
    } catch (error) {
      console.error("Error canceling order:", error);
      setAlertMsg("Failed to cancel order.");
      setTimeout(() => setAlertMsg(""), 3000);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">📦 Your Order History</h2>
          <p className="text-muted small mb-0">Track and review all your bookstore purchases</p>
        </div>
        <Link to="/books" className="btn btn-outline-primary btn-sm">
          + Continue Shopping
        </Link>
      </div>

      {alertMsg && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {alertMsg}
          <button type="button" className="btn-close" onClick={() => setAlertMsg("")}></button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Retrieving your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4 shadow-sm p-4">
          <span className="fs-1 d-block mb-3">📬</span>
          <h4 className="fw-bold">No orders found</h4>
          <p className="text-muted mb-4">You haven't placed any orders yet.</p>
          <Link to="/books" className="btn btn-primary px-4 py-2">
            Start Exploring Books
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {orders.map((order) => (
            <div key={order.id} className="card shadow-sm border-0 rounded-3 p-3">
              <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2 mb-3">
                <div>
                  <span className="fw-bold text-dark me-2">Order #{order.id?.slice(-8).toUpperCase()}</span>
                  <small className="text-muted">
                    Placed on {new Date(order.orderDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </small>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
                  <span className={`badge ${order.status === "DELIVERED" ? "bg-success" : order.status === "CANCELLED" ? "bg-danger" : "bg-primary-subtle text-primary border"}`}>
                    {order.status || "PROCESSING"}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="row g-2 mb-3">
                {order.items?.map((item, idx) => (
                  <div key={item.id || idx} className="col-12 col-md-6">
                    <div className="d-flex align-items-center gap-3 p-2 bg-light rounded">
                      {item.book?.imageUrl && (
                        <img
                          src={item.book.imageUrl || item.book.image}
                          alt={item.book?.title}
                          style={{ width: "45px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                        />
                      )}
                      <div className="flex-grow-1 overflow-hidden">
                        <h6 className="mb-0 text-truncate small fw-bold">
                          {item.book?.title || item.title || "Book"}
                        </h6>
                        <small className="text-muted d-block">
                          Qty: {item.quantity} × ₹{item.book?.price || item.priceAtPurchase || 0}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                <span className="text-muted small">Total Paid Amount:</span>
                <span className="fw-bold fs-5 text-dark">₹{order.totalPrice?.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
