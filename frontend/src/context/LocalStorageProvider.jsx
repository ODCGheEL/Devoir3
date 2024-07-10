import React, { createContext, useContext, useEffect, useState } from "react";

const BooksContext = createContext();

export function useBooksContext() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }
  return context;
}

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedBooks) setBooks(storedBooks);
    if (storedFavorites) setFavorites(storedFavorites);
  }, []);

  const addBook = (title, description, image) => {
    const newBook = {
      id: Date.now(),
      title,
      description,
      image: image.secureUrl,
      imageDeleteToken: image.deleteToken,
    };
    const updatedBooks = [...books, newBook];
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const getBooks = () => {
    const booksFromStorage = localStorage.getItem("books");
    return booksFromStorage ? JSON.parse(booksFromStorage) : [];
  };

  const getBookById = (id) => {
    const bookFromLocalStorage = JSON.parse(localStorage.getItem("books"));
    return bookFromLocalStorage.find((book) => book.id === id);
  };

  const updateBook = (updatedBook) => {
    console.log("updated book in fn:", updatedBook);
    const index = books.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      const updatedBooks = [...books];
      updatedBooks[index] = {
        ...updatedBooks[index],
        title: updatedBook.title,
        description: updatedBook.description,
        image: updatedBook.image,
        imageDeleteToken: updatedBook.imageDeleteToken,
      };
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
    }
  };

  const deleteBook = (bookId) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const clearBooks = () => {
    localStorage.removeItem("books");
    setBooks([]);
  };

  const getFavorites = () => {
    const booksFromStorage = localStorage.getItem("favorites");
    return booksFromStorage ? JSON.parse(booksFromStorage) : [];
  };

  const addFavorite = (id, title, description, image, imageDeleteToken) => {
    const newFavorite = {
      id,
      title,
      description,
      image,
      imageDeleteToken,
    };
    const updatedFavorites = [...favorites, newFavorite];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const removeFavorite = (favId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== favId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        addBook,
        getBookById,
        getBooks,
        updateBook,
        deleteBook,
        clearBooks,
        getFavorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
