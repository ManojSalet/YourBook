import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { getAuthHeaders } from "../../utils/auth";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/admin/orders", {
        headers: getAuthHeaders(),
      });

      if (response.status === 204 || !response.data) {
        setOrders([]);
      } else {
        setOrders(response.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch customer orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel / remove this customer order?")) return;
    try {
      await axios.delete(`http://localhost:8080/admin/orders/${orderId}`, {
        headers: getAuthHeaders(),
      });
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">📦 Customer Order Management</h2>
          <p className="text-muted small mb-0">Review orders placed across the store and track fulfillment</p>
        </div>
        <Button variant="outline-primary" size="sm" onClick={fetchOrders}>
          🔄 Refresh Orders
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Retrieving customer orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <h5>No customer orders found</h5>
          <p className="text-muted">When customers complete checkout, orders will appear here.</p>
        </div>
      ) : (
        <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Purchased Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-bold small">#{order.id?.slice(-8).toUpperCase()}</td>
                  <td>
                    <span className="fw-semibold d-block">
                      {order.user ? order.user.email : "Customer"}
                    </span>
                    <small className="text-muted">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </small>
                  </td>
                  <td>
                    <ul className="list-unstyled mb-0 small">
                      {order.items?.map((item, idx) => (
                        <li key={idx}>
                          • {item.book?.title || "Book"} (Qty: {item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="fw-bold fs-6">₹{Number(order.totalPrice).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${order.status === "DELIVERED" ? "bg-success" : order.status === "CANCELLED" ? "bg-danger" : "bg-primary-subtle text-primary border"}`}>
                      {order.status || "PROCESSING"}
                    </span>
                  </td>
                  <td className="text-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
