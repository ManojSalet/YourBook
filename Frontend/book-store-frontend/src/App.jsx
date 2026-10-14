import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import style from "./app.module.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category" element={<Category />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
