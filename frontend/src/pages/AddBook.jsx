import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { uploadImage } from "../utils/Cloudinary";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useBooksContext } from "../context/LocalStorageProvider";
import axios from "axios";
import { BACKEND_URL } from "../utils/urls";

function AddBook() {
  const { addBook } = useBooksContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    let imageUrl;
    try {
      // imageUrl = await uploadImage(image, "devoir3");
      // addBook(title, description, imageUrl);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      const result = await axios.post(
        `${BACKEND_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        title: "Nice!",
        text: "Book added successfully!",
        icon: "success",
      }).then(() => navigate("/"));
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "There was an error uploading the image.",
        icon: "error",
      });
      return;
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a book title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Book Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the book description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Book Cover Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>
      <Button type="submit">Add</Button>
    </Form>
  );
}

export default AddBook;
