import React, { useState } from "react";
import CardComp from "./CardComp";
import { useBooksContext } from "../context/LocalStorageProvider";
import CardFav from "./CardFav";

export default function FavoritesList() {
  const { getFavorites } = useBooksContext();
  const [favorites, setFavorites] = useState(getFavorites);
  return (
    <div className="row gap-2 justify-content-center">
      {favorites.length > 0 ? (
        favorites.map((book) => (
          //   <CardComp
          //     key={book.id}
          //     title={book.title}
          //     description={book.description}
          //     image={book.image}
          //     imageDeleteToken={book.imageDeleteToken}
          //     id={book.id}
          //   />
          <CardFav
            key={book.id}
            title={book.title}
            description={book.description}
            image={book.image}
            id={book.id}
          />
        ))
      ) : (
        <p className="text-danger text-center fw-bold">
          No Books In Your Favorites
        </p>
      )}
    </div>
  );
}
