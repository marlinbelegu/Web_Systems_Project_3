import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ album, onAddToCart }) => {
  // Check that the album data is valid
  if (!album) return null;

  return (
    <article className="album-card">
      <Link
        className="album-image-link"
        to={`/album/${album.id}`}
      >
        <img
          className="album-image"
          src={album.image}
          alt={`${album.title} by ${album.artist}`}
          loading="lazy"
        />
      </Link>

      <div className="album-body">
        <span className="album-genre">{album.genre}</span>

        <h3 className="album-title">
          <Link to={`/album/${album.id}`}>
            {album.title}
          </Link>
        </h3>

        <p className="album-artist">{album.artist}</p>

        <p className="album-price">
          ${album.price.toFixed(2)}
        </p>

        <button
          type="button"
          className="btn-add-cart"
          disabled={album.stock === 0}
          onClick={() => onAddToCart(album)}
        >
          {album.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
};

export default AlbumCard;

