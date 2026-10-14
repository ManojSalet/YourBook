import React from "react";
import style from "./navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import { Icons } from "../Icons/Icons";

function Navbar() {
  const location = useLocation();
  return (
    <nav className={`navbar navbar-expand-lg ${style.Nav}`}>
      <div className="container d-flex justify-content-between gap-3">
        <div className={`${style.Logo}`}>
          <Link to="/" className="navbar-brand">
            <img
              src="https://res.cloudinary.com/dkkduci4b/image/upload/v1741081393/Logo_qsu6yh.png"
              alt="Book Store"
            />
          </Link>
        </div>
        <form
          className={`d-flex align-items-center ${style.SearchBar}`}
          role="search"
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
          <Button
            type="submit"
            children={<Icons.searchButton size={20} />}
            styles={{ width: "86px", height: "36px" }}
            Classname="me-1"
          />
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <hr />
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center w-100 gap-3">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link active ${style.navLink}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${style.navLink}`}
                aria-current="page"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/shop"
                className={`nav-link  ${style.navLink}`}
                aria-current="page"
              >
                Shop
              </Link>
            </li>

            {location.pathname !== "/signup" && (
              <Button
                type="button"
                children={`Sign up`}
                navigationLink={`/signup`}
                variant="secondaryBtn"
              />
            )}

            {location.pathname !== "/login" && (
              <Button
                type="button"
                children="Login"
                navigationLink={`/login`}
              />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
