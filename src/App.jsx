import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import AboutUs from "./components/AboutUs";
import "./App.css";

function Home() {
  const [showProductList, setShowProductList] = useState(false);

  if (showProductList) {
    return <ProductList />;
  }

  return (
    <div className="app-container">
      <div className="background-image">
        <div className="landing-content">
          <h1>Welcome To Paradise Nursery</h1>
          <h2>Bring Nature Into Your Home</h2>
          <p>
            Discover beautiful houseplants and create your own
            peaceful green paradise.
          </p>
          <button
            className="primary-button"
            onClick={() => setShowProductList(true)}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        🌿 Paradise Nursery
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">Cart 🛒 ({totalItems})</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;