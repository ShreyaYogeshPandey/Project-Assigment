import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BookCategories from '../components/BookCategories';
import BookList from '../components/BookList';

const Home = () => {
  const books = useSelector((state) => state.book.books);
  const [selectedCategory, setSelectedCategory] = useState('');


  // Filter books based on the selected category
  const filteredBooks = books.filter((book) => {
    if (selectedCategory) {
      return book.genre === selectedCategory;
    }
    return true; // Show all books if no category is selected
  });
  console.log('Books in Redux:', books);

  return (
    <div>
      <h2><i>"Welcome User! Dive into our vast collection of books. Find your next favorite read!"</i></h2>
      {/* Book Categories with a "Clear Filter" button */}
      <div >
        <BookCategories
          onCategorySelect={(category) => setSelectedCategory(category)}
        />
        {selectedCategory && (
          <button
            className="clear-filter-button"
            onClick={() => setSelectedCategory('')}
          >
            Go Back
          </button>
        )}
      </div>
      <h2>Popular Books</h2>
      
      {/* Display filtered books */}
      <BookList books={filteredBooks} />
    </div>
  );
};

export default Home;