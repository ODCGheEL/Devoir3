import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchBookApi } from "../utils/Api";
import CardFav from "../components/CardFav";
import CardFetch from "../components/CardFetch";

export default function Search() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      const result = await fetchBookApi(search);
      setBooks(result);
    }
    fetchBooks();
  }, [search]);

  return (
    <div className="row gap-3 justify-content-center">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Search for a book</Form.Label>
          <Form.Control
            type="text"
            placeholder="Homo deus"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>
      <hr />
      {books.length > 0 ? (
        books.map((book) => (
          <CardFetch
            key={book.id}
            id={book.id}
            title={book.title}
            description={book.description}
            image={book.cover_image}
          />
        ))
      ) : (
        <p className="text-danger text-center fw-bold">Can't find this book</p>
      )}
    </div>
  );
}
