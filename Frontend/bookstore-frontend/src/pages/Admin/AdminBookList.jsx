import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import BookFormModel from "../../components/BookFormModel";
import { getAuthHeaders } from "../../utils/auth";

const AdminBookList = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8080/admin";

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/books`, {
        headers: getAuthHeaders(),
      });
      setBooks(response.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`, {
        headers: getAuthHeaders(),
      });
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle book delete
  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${API_URL}/books/${id}`, {
        headers: getAuthHeaders(),
      });
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">📖 Manage Book Inventory</h2>
          <p className="text-muted small mb-0">Create, edit, and organize titles available in your store</p>
        </div>
        <Button
          variant="primary"
          className="fw-semibold px-3"
          onClick={() => {
            setSelectedBook(null);
            setShowModal(true);
          }}
        >
          + Add New Book
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading books...</p>
        </div>
      ) : (
        <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "60px" }}>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>
                    <img
                      src={book.imageUrl || book.image || "https://via.placeholder.com/60"}
                      alt={book.title}
                      style={{ width: "40px", height: "55px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  </td>
                  <td className="fw-semibold">{book.title}</td>
                  <td className="text-muted">{book.author}</td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {book.category ? book.category.name : "N/A"}
                    </span>
                  </td>
                  <td className="fw-bold">₹{Number(book.price).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${book.stockQuantity > 10 ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}>
                      {book.stockQuantity} units
                    </span>
                  </td>
                  <td className="text-end">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedBook(book);
                        setShowModal(true);
                      }}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteBook(book.id)}
                    >
                      🗑️ Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <BookFormModel
        show={showModal}
        handleClose={() => setShowModal(false)}
        book={selectedBook}
        refreshBooks={fetchBooks}
        categories={categories}
      />
    </div>
  );
};

export default AdminBookList;
