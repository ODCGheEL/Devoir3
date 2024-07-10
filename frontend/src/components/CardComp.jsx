import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useBooksContext } from "../context/LocalStorageProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { IoBookmarks } from "react-icons/io5";
import { deleteCloudinaryImage } from "../utils/Cloudinary";
import axios from "axios";

function CardComp({ id, title, description, image, imageDeleteToken }) {
  const { deleteBook, addFavorite } = useBooksContext();
  const navigate = useNavigate();

  async function deleteABook() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      // await deleteCloudinaryImage(imageDeleteToken);
      // deleteBook(id);
      const result = await axios.delete(
        `http://localhost:4000/api/books/${id}`
      );
      if (result.status === 200) {
        Swal.fire("Deleted!", "Your book has been deleted.", "success").then(
          () => {
            return navigate(0);
          }
        );
      }
    }
  }

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
          <Button variant="">
            <Link to={`/edit/${id}`}>
              <MdEdit size={32} color="blue" />
            </Link>
          </Button>
          <Button variant="" onClick={() => addToFavorites()}>
            <IoBookmarks size={28} color="primary" />
          </Button>
          <Button variant="" onClick={() => deleteABook()}>
            <MdDelete size={32} color="red" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardComp;
