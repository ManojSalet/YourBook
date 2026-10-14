import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { getAuthHeaders } from "../../utils/auth";

const AdminManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/admin/categories", {
        headers: getAuthHeaders(),
      });
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      const categoryData = { name: categoryName, description: categoryDescription };

      if (editCategoryId) {
        await axios.put(
          `http://localhost:8080/admin/categories/${editCategoryId}`,
          categoryData,
          { headers: getAuthHeaders() }
        );
      } else {
        await axios.post("http://localhost:8080/admin/categories", categoryData, {
          headers: getAuthHeaders(),
        });
      }

      fetchCategories();
      setShowModal(false);
      setCategoryName("");
      setCategoryDescription("");
      setEditCategoryId(null);
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category. Please ensure category name is unique.");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:8080/admin/categories/${id}`, {
        headers: getAuthHeaders(),
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">🏷️ Manage Categories & Genres</h2>
          <p className="text-muted small mb-0">Organize books by thematic categories and subjects</p>
        </div>
        <Button
          variant="primary"
          className="fw-semibold"
          onClick={() => {
            setEditCategoryId(null);
            setCategoryName("");
            setCategoryDescription("");
            setShowModal(true);
          }}
        >
          + Add New Category
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading categories...</p>
        </div>
      ) : (
        <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "180px" }}>Category Name</th>
                <th>Description</th>
                <th className="text-end" style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="fw-bold">{category.name}</td>
                  <td className="text-muted small">{category.description || "—"}</td>
                  <td className="text-end">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setEditCategoryId(category.id);
                        setCategoryName(category.name);
                        setCategoryDescription(category.description || "");
                        setShowModal(true);
                      }}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editCategoryId ? "✏️ Edit Category" : "🏷️ Create New Category"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveCategory}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Science Fiction"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="small fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Brief summary of books in this category..."
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Category
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageCategory;
