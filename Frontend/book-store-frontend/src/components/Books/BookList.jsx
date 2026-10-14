import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card';
import styles from './booklist.module.css';


function BookList({limit}) {
    const {books} = useSelector((state) => state.books);

    const displayBooks = limit ? books.slice(0, limit) : books; 

  return (
    <>
        {displayBooks.map((book, index) => (
            <div className="col-3 g-2">
                <Card cardTitle={book.title} alt={book.title} imgsrc={book.imgsrc} cardText={`💲${book.price}`} classNameCard={`align-items-center p-5 ${styles.exploreCard}`} classNameBody={`align-items-center text-center ${styles.exploreCardBody}`} key={index} btnText={'Add to Cart'} classNameBodyBtn={`${styles.exploreCardBtnText}`}/>
            </div>
        ))}
    
    
    </>

    
  )
}

export default BookList;