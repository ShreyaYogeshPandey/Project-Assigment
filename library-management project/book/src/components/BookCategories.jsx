import React from 'react';

const categories = [
  'Fiction',
  'Science Fiction',
  'Romance',
  'Classic',
  'Adventure',
  'Dystopian Fiction',
  'Historical Fiction',
  'Fantasy',
  'Horror',
  'Young Adult',
  'Philosophical Fiction',
];

const BookCategories = ({ onCategorySelect }) => {
  const handleCategorySelect = (category) => {
    console.log('Selected Category:', category);
    onCategorySelect(category);
  };

  return (
    <div >
      <h3>Book Categories:</h3>
      <div className="cat-list">
        {categories.map((category, index) => (
          <button
            key={index}
            className="cat-item"
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;