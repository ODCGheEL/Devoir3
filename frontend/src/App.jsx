import React from "react";
import { HashRouter  as Router, Routes, Route, Link } from "react-router-dom";

// Import your components
import Home from "./pages/Home";
import NavbarComp from "./components/NavbarComp";
import Footer from "./components/Footer";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <div className="d-flex justify-content-center">
        <NavbarComp />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<Search />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
