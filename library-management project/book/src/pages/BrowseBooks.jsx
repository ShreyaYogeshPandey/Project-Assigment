import React, { useState } from 'react';
import {useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BrowseBooks = () => {
  const books = useSelector((state) => state.book.books);
  const [searchTerm, setSearchTerm] = useState('');
  const [isValidSearch, setIsValidSearch] = useState(true);

  // Filter books by title or author based on the search term
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    // Check if the search term is a valid book name or author name
    if (searchValue.trim() === '') {
      setIsValidSearch(true);
    } else {
      const isValid = books.some((book) => {
        return (
          book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.author.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setIsValidSearch(isValid);
    }
  };

  return (
    <div>
      {/* Header with Search Bar */}
      <div className="header">
        <h2>Browse Books</h2>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={handleSearch}
          className="seach"
        />
      </div>
      {/* Display Filtered Books */}
      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book__card">
            <img src={book.coverImage} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Description: {book.description}</p>
            <p>Price: ${book.price}</p>
            <div className="visit_book">
              <Link to={`/book/${book.id}`}>
                <button>Visit Book</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally render the invalid search message */}
      {!isValidSearch && (
        <p className="invalid-msg">
          Please enter a valid book name or author name.
        </p>
      )}
    </div>
  );
};

export default BrowseBooks;