import React from "react";
import { Button, Card } from "react-bootstrap";
import { GoBookmarkSlashFill } from "react-icons/go";
import { useBooksContext } from "../context/LocalStorageProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CardFav({ id, title, description, image }) {
  const navigate = useNavigate();
  const { removeFavorite } = useBooksContext();
  async function removeAFavorite() {
    try {
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
            removeFavorite(id);
            Swal.fire("Deleted!", "Your favorite has been deleted.", "success").then(
              () => {
                return navigate(0);
              }
            );
          }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-center gap-2">
          <Button variant="" onClick={() => removeAFavorite()}>
            <GoBookmarkSlashFill size={28} color="red" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
