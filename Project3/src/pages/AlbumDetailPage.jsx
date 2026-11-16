import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumDetailPage = ({ albums, onAddToCart }) => {
  // Get the album ID from the URL
  const { albumId } = useParams();

  // Store the selected quantity
  const [quantity, setQuantity] = useState(1);

  // Find the album that matches the URL
  const album = albums.find((item) => item.id === albumId);

  // Handle an album that does not exist
  if (!album) {
    return (
      <div className="album-detail-container">
        <h2>Album Not Found</h2>
        <p>We could not find the album you requested.</p>
        <Link to="/">Back to Catalog</Link>
      </div>
    );
  }

  // Make sure the quantity stays within available stock
  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) =>
      Math.max(1, Math.min(album.stock, prevQuantity + change))
    );
  };

  const handleAddToCart = () => {
    onAddToCart(album, quantity);
  };

  return (
    <div className="album-detail-container">
      <Link to="/" className="back-link">
        ← Back to Catalog
      </Link>

      <div className="album-detail-layout">
        <div className="album-detail-image">
          <img
            src={album.image}
            alt={`${album.title} by ${album.artist}`}
          />
        </div>

        <div className="album-detail-info">
          <span className="album-genre">{album.genre}</span>

          <h1>{album.title}</h1>
          <h2>{album.artist}</h2>

          <p className="detail-price">
            ${album.price.toFixed(2)}
          </p>

          <p className="detail-description">
            {album.description}
          </p>

          <p className="stock-info">
            {album.stock > 0
              ? `${album.stock} copies available`
              : "Out of Stock"}
          </p>

          <div className="quantity-section">
            <p>Quantity</p>

            <div className="quantity-controls">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || album.stock === 0}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= album.stock}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn-detail-cart"
            onClick={handleAddToCart}
            disabled={album.stock === 0}
          >
            {album.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      <section className="album-extra-info">
        <div className="album-specifications">
          <h2>Vinyl Specifications</h2>

          <p><strong>Catalog Number:</strong> {album.specs.catalogNumber}</p>
          <p><strong>Weight:</strong> {album.specs.weight}</p>
          <p><strong>Speed:</strong> {album.specs.speed}</p>
          <p><strong>Label:</strong> {album.specs.label}</p>
        </div>

        <div className="album-tracklist">
          <h2>Tracklist</h2>

          <ol>
            {album.tracklist.map((track, index) => (
              <li key={index}>{track}</li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default AlbumDetailPage;

