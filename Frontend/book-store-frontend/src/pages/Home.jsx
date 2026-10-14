import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import style from "./home.module.css";
import Card from "../components/Card/Card";
import BookCardCategory from "../components/categoryCardComponent/BookCardCategory";
import { Icons } from "../components/Icons/Icons";
import BookList from "../components/Books/BookList";
import Contact from "../components/Contact/Contact";

function Home() {
  return (
    <main>
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <img
                  src="https://res.cloudinary.com/dkkduci4b/image/upload/v1741082528/leftImage_tfyuvf.png"
                  alt="left-image"
                />
              </div>
            </div>
            <div
              className={`col-6 d-flex flex-column justify-content-between ${style.rightText}`}
            >
              <h2>
                Reading is to the mind what exercise is to the body. - Joseph
                Addison
              </h2>
              <h5>
                Reading is a wonderful activity that can transport us to
                different worlds, times and places, all from the comfort of our
                own home. Through reading we can gain knowledge, expand our
                imagination, and improve our cognitive abilities. It's not just
                about reading words on a page, but also about immersing
                ourselves in a story and allowing ourselves to be fully engaged
                in the experience. Whether it's a classic novel, a suspenseful
                thriller, or a fascinating non-fiction book, reading has the
                power to inspire, entertain.
              </h5>
              <Button
                type="button"
                className={`${style.responsiveButton}`}
                children="Shop Now"
                styles={{ width: "110px", height: "48px" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div
          className={`container mt-5 d-flex flex-column  ${style.Categories}`}
        >
          <h2 className="text-center">Explore Categories</h2>

          <div className="row mt-4">
            <BookCardCategory limit={6} />
          </div>

          <div className="categoryLink d-flex justify-content-end ">
            <Link
              to={"/category"}
              className={`text-decoration-none ${style.LinkText}`}
              style={{
                color: "var(--button-background-color)",
                fontWeight: "500",
              }}
            >
              More
              <Icons.rightArrow />
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div
          className={`container mt-5 d-flex flex-column ${style.exploreBooks}`}
        >
          <h2 className="text-center">Explore Books</h2>

          <div className="row mt-4">
            <BookList limit={8} />
          </div>

          <div className="categoryLink d-flex justify-content-end mt-2">
            <Link
              to={"/category"}
              className={`text-decoration-none ${style.LinkText}`}
              style={{
                color: "var(--button-background-color)",
                fontWeight: "500",
              }}
            >
              More
              <Icons.rightArrow />
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className={`container mt-4 ${style.ContactUs} d-flex flex-column justify-content-center align-items-center`}>
          <h2 className="text-center">Contact Us</h2>
          <p className="mt-3 ">Any Query Related Books or orders please leave your information we will contact you as soon as possible</p>
          <Contact className={`mt-3`}/>
        </div>
      </section>
    </main>
  );
}

export default Home;
