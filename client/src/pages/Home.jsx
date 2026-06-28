import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import products from "../data/products";
import "../App.css";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.jpeg";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [cart, setCart] = useState([]);

  const categories = [
    "All",
    "Fruit Juice",
    "Milkshake",
    "Mastani",
    "Soft Drink",
    "Coconut Water",
    "Lemon Juice",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (item) =>
            item.category === selectedCategory
        );

  const addToCart = (product) => {
    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  const proceedToBilling = () => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    navigate("/billing");
  };

  return (
    <>
      <Navbar />

      <div className="home-container">

        <h1>
           Virudavan Fruit Juice
        </h1>

        <h2>Categories</h2>

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>₹{product.price}</p>

              <button
                onClick={() =>
                  addToCart(product)
                }
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>

        <div className="selected-products">
          <h2>🛒 Selected Products</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">
              No Product Added
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  className="selected-item"
                  key={item.id}
                >
                  <span>
                    {item.name}
                  </span>

                  <div>
                    <button
                      className="qty-btn minus-btn"
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                    >
                      -
                    </button>

                    <span
                      style={{
                        margin:
                          "0 10px",
                      }}
                    >
                      {item.quantity}
                    </span>

                    <button
                      className="qty-btn plus-btn"
                      onClick={() =>
                        increaseQty(item.id)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <button
                className="proceed-btn"
                onClick={
                  proceedToBilling
                }
              >
                Proceed To Billing
              </button>
            </>
          )}
        </div>

        <div className="home-bottom-buttons">

          <Link to="/history">
            <button className="history-btn">
              Billing History
            </button>
          </Link>

        </div>

      </div>
    </>
  );
}

export default Home;