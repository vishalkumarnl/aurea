import React, { useState, useEffect } from "react";
import "./home.css"; // Importing CSS file for styles
import { useNavigate } from "react-router-dom";
import Carousel from './Carousel';

const images = [
  '/images/banner2.png',
  '/images/banner.png'
];

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
      <Carousel images={images} />

      {/* Product Showcase Section */}
      <div className="product-grid">
        {productvariants.map((product, index) => {
          const images = product.image_url?.split(" ") || [];
          const logo = `images/${images?.[0]}.png`
          return(
          <button
            onClick={() => nevigateProductPage(product)}
            className="product"
            key={index}
          >
            <img src={logo} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p className="price">{product.price}</p>
            </div>
          </button>
        )})}
      </div>

    </div>
  );
};

export default HomePage;
