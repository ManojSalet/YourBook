import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { getAuthHeaders } from "../utils/auth";

const BookFormModel = ({ show, handleClose, book, refreshBooks, categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    stockQuantity: "",
    imageUrl: "",
    categoryId: "",
  });
  const [saving, setSaving] = useState(false);

  const API_URL = "http://localhost:8080/admin";

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        description: book.description || "",
        price: book.price || "",
        stockQuantity: book.stockQuantity || "",
        imageUrl: book.imageUrl || book.image || "",
        categoryId: book.category ? (book.category.id || book.category._id || book.category) : "",
      });
    } else {
      setFormData({
        title: "",
        author: "",
        description: "",
        price: "",
        stockQuantity: "15",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
        categoryId: categories && categories.length > 0 ? categories[0].id : "",
      });
    }
  }, [book, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (book) {
        await axios.put(`${API_URL}/books/${book.id}`, formData, {
          headers: getAuthHeaders(),
        });
      } else {
        await axios.post(`${API_URL}/books`, formData, {
          headers: getAuthHeaders(),
        });
      }
      refreshBooks();
      handleClose();
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book. Please ensure all fields are filled.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          {book ? "✏️ Edit Book Details" : "📖 Add New Book to Store"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="small fw-semibold">Book Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="e.g. Clean Code"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="small fw-semibold">Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  placeholder="e.g. Robert C. Martin"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-12">
              <Form.Group>
                <Form.Label className="small fw-semibold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Summary or synopsis of the book..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="small fw-semibold">Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="price"
                  placeholder="499"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="small fw-semibold">Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="stockQuantity"
                  placeholder="20"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="small fw-semibold">Category</Form.Label>
                <Form.Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-12">
              <Form.Group>
                <Form.Label className="small fw-semibold">Cover Image URL (or upload below)</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className="col-12">
              <Form.Group>
                <Form.Label className="small fw-semibold">Upload Image File (Optional)</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                {formData.imageUrl && (
                  <div className="mt-2 p-2 bg-light rounded text-center">
                    <img
                      src={formData.imageUrl}
                      alt="Cover Preview"
                      style={{ height: "120px", objectFit: "cover", borderRadius: "6px" }}
                    />
                  </div>
                )}
              </Form.Group>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : book ? "Update Book" : "Create Book"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookFormModel;
