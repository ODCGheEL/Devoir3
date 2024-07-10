import React, { useEffect, useState } from "react";
import { Books } from "../utils/Books";
import CardComp from "./CardComp";
import { useBooksContext } from "../context/LocalStorageProvider";
import axios from "axios";

export default function BooksList() {
  const { getBooks } = useBooksContext();
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    const result = await axios.get("http://localhost:4000/api/books");
    console.log(result.data);
    setBooks(result.data);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="row gap-2 justify-content-center">
      {books.length > 0 ? (
        books.map((book) => (
          // <CardComp
          //   key={book.id}
          //   title={book.title}
          //   description={book.description}
          //   image={book.image}
          //   imageDeleteToken={book.imageDeleteToken}
          //   id={book.id}
          // />
          <CardComp
            key={book._id}
            id={book._id}
            title={book.title}
            description={book.description}
            image={book.imageUrl}
          />
        ))
      ) : (
        <p className="text-danger text-center fw-bold">
          No Books In Your Library
        </p>
      )}
    </div>
  );
}
