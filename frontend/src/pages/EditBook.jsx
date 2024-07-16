import React, { useEffect, useState } from "react";
import GoBackButton from "../components/GoBackButton";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useBooksContext } from "../context/LocalStorageProvider";
import Swal from "sweetalert2";
import { uploadImage } from "../utils/Cloudinary";
import axios from "axios";
import { BACKEND_URL } from "../utils/urls";

// export default function EditBook() {
//   const { getBookById, updateBook } = useBooksContext();

//   const params = useParams();
//   const navigate = useNavigate();
//   // console.log(params.id);
//   const bookId = parseInt(params.id);

//   const editedBook = getBookById(bookId);

//   const [title, setTitle] = useState(editedBook.title);
//   const [description, setDescription] = useState(editedBook.description);
//   const [image, setImage] = useState(editedBook);

//     async function handleSubmit(e) {
//       e.preventDefault();
//       let imageUrl;
//       if (image && image.name) {
//         try {
//           imageUrl = await uploadImage(image, "devoir3");
//         } catch (error) {
//           console.error(error);
//           Swal.fire({
//             title: "Error!",
//             text: "There was an error uploading the image.",
//             icon: "error",
//           });
//           return;
//         }
//         const updatedBook = {
//           id: bookId,
//           title,
//           description,
//           image: imageUrl.secureUrl,
//           imageDeleteToken: imageUrl.deleteToken
//         };
//         const result = await Swal.fire({
//           title: "Are you sure?",
//           text: "You won't be able to revert this!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Yes, update it!",
//         });
//         if (result.isConfirmed) {
//           updateBook(updatedBook);
//           Swal.fire("Updated!", "Your book has been updated.", "success").then(() => {
//             navigate("/");
//           });
//         }
//       }
//     }

//   return (
//     <>
//       <GoBackButton />
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Book Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter a book title"
//             value={title}
//             onChange={(e) => {
//               setTitle(e.target.value);
//             }}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Book Description</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter the book description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicImage">
//           <Form.Label>Book Cover Image</Form.Label>
//           <Form.Control
//             type="file"
//             value={image.secureUrl}
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </Form.Group>
//         <Button type="submit">Update</Button>
//       </Form>
//     </>
//   );
// }

// ! /////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//! using api :

export default function EditBook() {
  const params = useParams();
  const navigate = useNavigate();
  // console.log(params.id);
  // const bookId = parseInt(params.id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  async function fetchBook() {
    const result = await axios.get(`${BACKEND_URL}/${params.id}`);
    console.log(result.data);
    if (result.data) {
      setTitle(result.data.title);
      setDescription(result.data.description);
    }
    return result.data;
  }

  useEffect(() => {
    fetchBook();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });
    if (result.isConfirmed) {
      const result = await axios.put(`${BACKEND_URL}/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Updated!", "Your book has been updated.", "success").then(
        () => {
          navigate("/");
        }
      );
    }
  }

  return (
    <>
      <GoBackButton />
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
        <Button type="submit">Update</Button>
      </Form>
    </>
  );
}
