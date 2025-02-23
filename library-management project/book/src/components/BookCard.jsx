import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => (
  <div className="book__card">
    <img
      src={book.coverImage || 'https://via.placeholder.com/200x300'}
      alt={book.title}
      className="book-image"
    />
    <h3>{book.title}</h3>
    <p>{book.author}</p>
    <p>{book.description}</p>
    <p>Price: ${book.price}</p>
    <p>Category: {book.category}</p> 
    <div className="visit_book">
      <Link to={`/book/${book.id}`}>
        <button>Visit Book</button>
      </Link>
    </div>
  </div>
);

export default BookCard;
