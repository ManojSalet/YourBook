import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "super_secret_bookstore_jwt_key_2026_mca_portfolio",
    { expiresIn: "7d" }
  );
};

// @desc    Register new user
// @route   POST /auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide username, email, and password" });
    }

    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const assignedRole = role && role.toUpperCase() === "ADMIN" ? "ADMIN" : "USER";

    const user = await User.create({
      username,
      email: email.toLowerCase().trim(),
      password,
      role: assignedRole,
    });

    if (user) {
      // Return a string message for direct compatibility with alert(response.data)
      return res.status(201).send("User registered successfully!");
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: error.message || "Server error during registration" });
  }
};

// @desc    Authenticate user & get token
// @route   POST /auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id, user.role);

      return res.status(200).json({
        token,
        role: user.role,
        email: user.email,
        username: user.username,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: error.message || "Server error during login" });
  }
};

