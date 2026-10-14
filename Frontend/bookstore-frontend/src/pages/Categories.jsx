import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/categories") 
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const fetchBooksByCategory = (categoryId) => {
        axios.get(`http://localhost:8080/books?categoryId=${categoryId}`)
            .then(response => setBooks(response.data))
            .catch(error => console.error("Error fetching books:", error));
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2>Book Categories</h2>
                <div className="list-group">
                    {categories.map(category => (
                        <button 
                            key={category.id} 
                            className="list-group-item list-group-item-action"
                            onClick={() => {
                                setSelectedCategory(category.name);
                                fetchBooksByCategory(category.id);
                            }}>
                            {category.name}
                        </button>
                    ))}
                </div>

                {selectedCategory && (
                    <div className="mt-4">
                        <h3>Books in {selectedCategory}</h3>
                        <div className="row">
                            {books.length > 0 ? (
                                books.map(book => (
                                    <div key={book.id} className="col-md-4 mb-4">
                                        <div className="card">
                                            <img src={book.imageUrl || "https://via.placeholder.com/150"} className="card-img-top" alt={book.title} />
                                            <div className="card-body">
                                                <h5 className="card-title">{book.title}</h5>
                                                <p className="card-text">{book.author}</p>
                                                <p className="card-text"><strong>${book.price}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No books found in this category.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Categories;
