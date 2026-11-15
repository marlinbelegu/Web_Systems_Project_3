import React, { useState } from "react";
import AlbumCard from "../components/AlbumCard";

const CatalogPage = ({ albums, onAddToCart }) => {
  // Available album genres
  const genres = ["All", "Jazz", "Electronic", "Rock", "Classical"];

  // Store the currently selected genre
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Make sure the album data exists
  const validAlbums = albums || [];

  // Filter albums based on the selected genre
  const filteredAlbums =
    selectedGenre === "All"
      ? validAlbums
      : validAlbums.filter((album) => album.genre === selectedGenre);

  return (
    <div className="catalog-container">
      <header className="catalog-hero">
        <h1>Discover Your Next Favorite Record</h1>
        <p>
          Explore our collection of vinyl records, from timeless
          classics to electronic masterpieces.
        </p>
      </header>

      {/* Genre filtering buttons */}
      <div className="filter-bar">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={`filter-pill ${
              selectedGenre === genre ? "active" : ""
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Album grid */}
      <div className="album-grid">
        {filteredAlbums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
