import React from "react";
import BookCardCategory from "../components/categoryCardComponent/BookCardCategory";

function Category() {
  return (
    <div className={`d-flex container`}>
      <div className="row">
        <BookCardCategory />
      </div>
    </div>
  );
}

export default Category;
