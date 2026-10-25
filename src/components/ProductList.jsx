
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import "./ProductList.css";

const plantCategories = [
  {
    category: "Air Purifying Plants",
    plants: [
      {
        id: 1,
        name: "Snake Plant",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=500&q=80",
        description: "A hardy plant that adds greenery to any room.",
      },
      {
        id: 2,
        name: "Peace Lily",
        price: 399,
        image:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
        description: "An elegant plant with beautiful green leaves.",
      },
      {
        id: 3,
        name: "Spider Plant",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=500&q=80",
        description: "An easy-to-grow plant for your home.",
      },
      {
        id: 4,
        name: "Areca Palm",
        price: 499,
        image:
          "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
        description: "A tropical palm that brightens indoor spaces.",
      },
      {
        id: 5,
        name: "Rubber Plant",
        price: 449,
        image:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80",
        description: "A striking plant with glossy green foliage.",
      },
      {
        id: 6,
        name: "Boston Fern",
        price: 349,
        image:
          "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80",
        description: "A lush fern that adds a fresh natural look.",
      },
    ],
  },
  {
    category: "Decorative Plants",
    plants: [
      {
        id: 7,
        name: "Monstera Deliciosa",
        price: 599,
        image:
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80",
        description: "A popular tropical plant with dramatic leaves.",
      },
      {
        id: 8,
        name: "Fiddle Leaf Fig",
        price: 699,
        image:
          "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
        description: "A stylish statement plant for modern interiors.",
      },
      {
        id: 9,
        name: "Calathea",
        price: 449,
        image:
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80",
        description: "A decorative plant with beautiful foliage.",
      },
      {
        id: 10,
        name: "Chinese Evergreen",
        price: 349,
        image:
          "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=500&q=80",
        description: "A colorful foliage plant for indoor spaces.",
      },
      {
        id: 11,
        name: "Philodendron",
        price: 399,
        image:
          "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=500&q=80",
        description: "A beautiful leafy plant for your collection.",
      },
      {
        id: 12,
        name: "Dracaena",
        price: 499,
        image:
          "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=500&q=80",
        description: "An attractive plant with upright foliage.",
      },
    ],
  },
  {
    category: "Succulents and Cacti",
    plants: [
      {
        id: 13,
        name: "Aloe Vera",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
        description: "A useful succulent that is easy to maintain.",
      },
      {
        id: 14,
        name: "Jade Plant",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80",
        description: "A compact succulent with thick green leaves.",
      },
      {
        id: 15,
        name: "Echeveria",
        price: 179,
        image:
          "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=500&q=80",
        description: "A charming rosette-shaped succulent.",
      },
      {
        id: 16,
        name: "Moon Cactus",
        price: 159,
        image:
          "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
        description: "A small cactus perfect for desks and shelves.",
      },
      {
        id: 17,
        name: "Haworthia",
        price: 189,
        image:
          "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=500&q=80",
        description: "A compact succulent for small spaces.",
      },
      {
        id: 18,
        name: "String of Pearls",
        price: 329,
        image:
          "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80",
        description: "A trailing succulent with bead-like leaves.",
      },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
  };

  return (
    <main className="product-page">
      <header className="product-header">
        <h1>Discover Our Plants</h1>
        <p>
          Bring nature home with our beautiful collection of
          indoor plants.
        </p>
      </header>

      {plantCategories.map((category) => (
        <section
          className="plant-category"
          key={category.category}
        >
          <h2>{category.category}</h2>

          <div className="plant-grid">
            {category.plants.map((plant) => {
              const isAdded = cartItems.some(
                (item) => item.id === plant.id
              );

              return (
                <article className="plant-card" key={plant.id}>
                  <img
                    className="plant-image"
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                  />

                  <div className="plant-details">
                    <h3>{plant.name}</h3>

                    <p className="plant-description">
                      {plant.description}
                    </p>

                    <p className="plant-price">
                      ₹{plant.price.toFixed(2)}
                    </p>

                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAdded}
                    >
                      {isAdded ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProductList;
