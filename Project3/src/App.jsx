import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ALBUMS } from "./data/albums";

const App = () => {
  // Shared application state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add an album to the cart
  const handleAddToCart = (album, quantity = 1) => {
    setCart((prevCart) => {
      const existingAlbum = prevCart.find(
        (item) => item.id === album.id
      );

      if (existingAlbum) {
        return prevCart.map((item) =>
          item.id === album.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...album, quantity }];
    });

    setIsCartOpen(true);
  };

  // Increase or decrease the quantity of an album
  const handleUpdateQuantity = (albumId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === albumId) {
            const newQuantity = item.quantity + delta;

            return newQuantity > 0
              ? { ...item, quantity: newQuantity }
              : null;
          }

          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove an album from the cart
  const handleRemoveFromCart = (albumId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== albumId)
    );
  };

  // Clear the cart after checkout
  const handleClearCart = () => {
    setCart([]);
  };

  // Calculate the total number of items in the cart
  const totalCartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="app-container">
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage
                albums={ALBUMS}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/album/:albumId"
            element={
              <AlbumDetailPage
                albums={ALBUMS}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cart={cart}
                onClearCart={handleClearCart}
              />
            }
          />
        </Routes>
      </main>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;
