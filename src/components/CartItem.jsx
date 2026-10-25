
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeItem,
} from "../redux/CartSlice";
import { Link } from "react-router-dom";
import "./CartItem.css";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    window.alert("Checkout Coming Soon!");
  };

  if (cartItems.length === 0) {
    return (
      <main className="cart-container">
        <header className="cart-header">
          <h1>Your Shopping Cart</h1>
          <p>0 items in your cart</p>
        </header>

        <section className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Explore our beautiful collection of houseplants.</p>

          <Link to="/plants" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-container">
      <header className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </header>

      <section className="cart-items">
        {cartItems.map((item) => (
          <article className="cart-item" key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
            />

            <div className="cart-item-details">
              <h2>{item.name}</h2>

              <p>Unit Price: ₹{item.price.toFixed(2)}</p>

              <p className="item-subtotal">
                Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
              </p>

              <div className="quantity-controls">
                <button
                  onClick={() => handleDecrement(item)}
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => handleIncrement(item)}
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
              </div>

              <button
                className="remove-button"
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="cart-summary">
        <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>

        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>

        <Link to="/plants" className="continue-shopping-button">
          Continue Shopping
        </Link>
      </section>
    </main>
  );
}

export default CartItem;
