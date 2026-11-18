import React from "react";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
}) => {
  const navigate = useNavigate();

  // Calculate the total price of the cart
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate the total number of albums
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Navigate to checkout and close the drawer
  const handleProceedToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  // Do not display the drawer when it is closed
  if (!isOpen) {
    return null;
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <h2>Shopping Cart ({totalItems})</h2>

          <button
            type="button"
            className="cart-close"
            onClick={onClose}
            aria-label="Close shopping cart"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <button type="button" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                  />

                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p>{item.artist}</p>

                    <p className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="cart-item-actions">
                      <div className="cart-quantity">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.id, -1)
                          }
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.id, 1)
                          }
                          disabled={item.quantity >= item.stock}
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <p className="cart-note">
                Shipping and taxes are calculated at checkout.
              </p>

              <button
                type="button"
                className="btn-checkout"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
