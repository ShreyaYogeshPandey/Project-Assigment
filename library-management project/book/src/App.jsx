import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrowseBooks from './pages/BrowseBooks';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';



const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-books" element={<BrowseBooks />} />
        <Route path="/browse-books/:category" element={<BrowseBooks />} /> 
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  
    </Router>
    
  );
};

export default App;
