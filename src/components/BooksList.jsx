import React, { useState } from "react";
import { Books } from "../utils/Books";
import CardComp from "./CardComp";
import { useBooksContext } from "../context/LocalStorageProvider";
export default function BooksList() {
  const { getBooks } = useBooksContext();
  const [books, setBooks] = useState(getBooks);

  return (
    <div className="row gap-2 justify-content-center">
      {books.length > 0
        ? books.map((book) => (
            <CardComp
              key={book.id}
              title={book.title}
              description={book.description}
              image={book.image}
              imageDeleteToken={book.imageDeleteToken}
              id={book.id}
            />
          ))
        : <p className="text-danger text-center fw-bold">No Books In Your Library</p>}
    </div>
  );
}
