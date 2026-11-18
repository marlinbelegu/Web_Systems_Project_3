import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = ({ cart, onClearCart }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    cardDetails: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate the order subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Update form fields as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkout submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    // Validate required fields
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please complete all checkout fields.");
      return;
    }

    // Demo checkout: no real payment is processed
    setIsSubmitted(true);
    onClearCart();
  };

  // Display confirmation after submission
  if (isSubmitted) {
    return (
      <div className="checkout-container">
        <div className="order-confirmation">
          <h1>Order Confirmed!</h1>

          <p>
            Thank you for shopping with VinylVault.
            Your demo order has been submitted successfully.
          </p>

          <Link to="/" className="btn-return">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Display a message if the cart is empty
  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h1>Your Cart Is Empty</h1>
          <p>Add some vinyl records before checking out.</p>

          <Link to="/" className="btn-return">
            Browse Albums
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <section className="checkout-form-section">
          <h2>Shipping & Payment Information</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardDetails">Card Details</label>
              <input
                type="text"
                id="cardDetails"
                name="cardDetails"
                value={formData.cardDetails}
                onChange={handleChange}
                placeholder="Demo card details only"
                autoComplete="off"
                required
              />
              <small>
                This is a demonstration checkout. Do not enter
                real payment information.
              </small>
            </div>

            <button type="submit" className="btn-place-order">
              Place Order
            </button>
          </form>
        </section>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-item" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>Quantity: {item.quantity}</p>
              </div>

              <span>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="summary-total">
            <strong>Total</strong>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <p className="summary-note">
            Demo total excludes shipping and taxes.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;

