import React, { useState, useEffect } from "react";
import "./home.css"; // Importing CSS file for styles
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [productvariants, setProductvariants] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/allProductvariants`)
      .then((res) => res.json())
      .then((data) => {
        setProductvariants(data);
      });
  }, []);

  const nevigateProductPage = (product) => {
    navigate("/productDetail", { state: { id: product?.product_id } });
  };
  
  return (
    <div className="homepage">
      <div className="hero">
        <div>
          <h1>Welcome to Our Store</h1>
          <p>Your one-stop shop for all your needs</p>
        </div>
      </div>

      {/* Product Showcase Section */}
      <div className="product-showcase">
        {productvariants.map((product, index) => (
          <button
            onClick={() => nevigateProductPage(product)}
            className="product"
            key={index}
          >
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p className="price">{product.price}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer Section */}
      <footer>
        <p>&copy; 2025 Retail Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
