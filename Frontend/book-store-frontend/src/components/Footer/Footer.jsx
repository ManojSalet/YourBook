import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { Icons } from "../Icons/Icons";

function Footer() {
  return (
    <div className={`${styles.Footer} mt-5 d-flex`}>
      <div
        className={`container d-flex justify-content-between align-items-center gap-3`}
      >
        <div className={`${styles.Logo}`}>
          <Link to="/" className="navbar-brand">
            <img
              src="https://res.cloudinary.com/dkkduci4b/image/upload/v1741081393/Logo_qsu6yh.png"
              alt="Book Store"
            />
          </Link>
        </div>

        <div className={`${styles.SocialIcon}`}>
          <ul className={`d-flex text-decoration-none align-items-center justify-content-center gap-3`}>
            <li className="">
              <Link to={"/"} className={`${styles.SocialLink}`}>
                <Icons.facebook size={30} />
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className={`${styles.SocialLink}`}>
                <Icons.twitter size={30} />
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className={`${styles.SocialLink}`}>
                <Icons.instagram size={30} />
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className={`${styles.SocialLink}`}>
                <Icons.linkedin size={30} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
