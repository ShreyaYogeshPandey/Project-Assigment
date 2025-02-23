import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookDetails = () => {
  const { id } = useParams();
  const book = useSelector((state) => state.book.books.find((b) => b.id === parseInt(id)));

  if (!book) {
    return <p>Book not found.</p>;
  }

  // Function to render star rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i}>{i < rating ? '★' : '☆'}</span>);
    }
    return stars;
  };

  return (
    <div className="book-details-container">
      <div className="book-image-container">
        <img 
          src={book.coverImage || 'https://via.placeholder.com/100x150'} 
          alt={book.title} 
          className="book-image"
        />
      </div>
      <div className="book-details">
        <h2 className="title">{book.title}</h2>
        <p className="author"><strong>Author:</strong> {book.author}</p>
        <p className="publishdate"><strong>Published Date:</strong> {book.publishedDate}</p>
        <p className="description"><strong>Description:</strong> {book.description}</p>
        <p className="pages"><strong>Pages:</strong> {book.pages}</p>
        <p className="category"><strong>Category:</strong> {book.genre}</p>
        <p className="price"><strong>Price:</strong> ${book.price}</p>
        <p className="rating"><strong>Rating:</strong> {renderRating(book.rating)}</p>
        <Link to="/">
          <button className="back-btn-browse">Back to Browse</button>
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;