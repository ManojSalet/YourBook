import Category from "../models/Category.js";

// @desc    Get all categories
// @route   GET /categories, GET /admin/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Get Categories Error:", error);
    return res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// @desc    Create new category
// @route   POST /admin/categories
// @access  Admin
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description || "",
    });

    return res.status(201).json(category);
  } catch (error) {
    console.error("Create Category Error:", error);
    return res.status(500).json({ message: "Failed to create category" });
  }
};

// @desc    Update category
// @route   PUT /admin/categories/:id
// @access  Admin
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) category.name = name.trim();
    if (description !== undefined) category.description = description;

    const updatedCategory = await category.save();
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(500).json({ message: "Failed to update category" });
  }
};

// @desc    Delete category
// @route   DELETE /admin/categories/:id
// @access  Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return res.status(500).json({ message: "Failed to delete category" });
  }
};

