import React, { useState, useEffect } from "react";
import "./home.css"; // Importing CSS file for styles
import { useNavigate } from "react-router-dom";
import Carousel from 'components/Carousel';
import CachedImage from "components/CachedImage";
import { useSelector } from "react-redux";

const images = [
  '/images/banner.png',
  '/images/banner1.png'
];

const HomePage = () => {
  const navigate = useNavigate();
  const productSizes = useSelector((state) => state.product?.productSize) || [];

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
          const logo = `images/${images?.[0]}.png`;
          const weight_size = productSizes.find(
      (v) => v.size_id === product.size_id
    )?.name ||"";
          return(
          <button
            onClick={() => nevigateProductPage(product)}
            className="product"
            key={index}
          >
            <CachedImage src={logo} alt={product.name} />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p>{weight_size}</p>
              <p className="price">₹{product.price}</p>
            </div>
          </button>
        )})}
      </div>

    </div>
  );
};

export default HomePage;
