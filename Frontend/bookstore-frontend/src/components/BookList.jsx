import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext"; // ✅ Ensure correct import

const BookList = ({ selectedCategory }) => {
  const { addToCart } = useContext(CartContext); // ✅ This should now work
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url = selectedCategory 
          ? `http://localhost:8080/books/category/${selectedCategory}`
          : "http://localhost:8080/books";
        const response = await axios.get(url);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [selectedCategory]);

  return (
    <div className="row">
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={book.imageUrl || "https://via.placeholder.com/150"} className="card-img-top" alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.author}</p>
                <p className="card-text"><strong>${book.price}</strong></p>
                <button className="btn btn-primary" onClick={() => addToCart(book)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookList;
