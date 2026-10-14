
import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/categories")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      <h4>Categories</h4>
      <ul className="list-group">
        <li 
          className="list-group-item"
          onClick={() => onSelectCategory(null)}
          style={{ cursor: "pointer" }}
        >
          All Categories
        </li>
        {categories.map((category) => (
          <li 
            key={category.id} 
            className="list-group-item"
            onClick={() => onSelectCategory(category.name)}
            style={{ cursor: "pointer" }}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
