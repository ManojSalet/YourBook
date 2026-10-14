import React from "react";
import PropTypes from "prop-types";
import style from "./button.module.css";
import { Link } from "react-router-dom";

function Button({
  children,
  type = "button",
  className,
  onClick,
  variant = "primaryBtn",
  styles = {},
  navigationLink,
}) {
  const buttonElement = (
    <button
      type={type}
      className={`btn d-flex justify-content-center align-items-center ${style.Button} ${style[variant]} ${className}`}
      style={styles}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return navigationLink ? (
    <Link to={navigationLink} className="text-decoration-none">
      {buttonElement}
    </Link>
  ) : (
    buttonElement
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primaryBtn", "secondaryBtn"]),
  styles: PropTypes.object,
  className: PropTypes.string,
};

export default Button;