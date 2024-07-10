import React from "react";
import { Button, Card } from "react-bootstrap";
import { useBooksContext } from "../context/LocalStorageProvider";
import { toast } from "react-toastify";
import { IoBookmarks } from "react-icons/io5";

export default function CardFetch({
  id,
  title,
  description,
  image,
  imageDeleteToken,
}) {
  const { addFavorite } = useBooksContext();
  async function addToFavorites() {
    addFavorite(id, title, description, image, imageDeleteToken);
    toast.success(title + " added to favorites!");
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-center gap-2">
          <Button variant="" onClick={() => addToFavorites()}>
            <IoBookmarks size={28} color="primary" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
