import React, { useState, useEffect } from "react";
import "./home.css"; // Importing CSS file for styles
import { useNavigate } from "react-router-dom";
import Carousel from "components/Carousel";
import CachedImage from "components/CachedImage";
import { useSelector } from "react-redux";
import { useItems } from "context/itemsContext";

const images = ["/images/banner.png", "/images/banner1.png"];

const HomePage = () => {
  const navigate = useNavigate();
  const productSizes = useSelector((state) => state.product?.productSize) || [];

  const [productvariants, setProductvariants] = useState([]);
  // localStorage.clear();

  useEffect(() => {
    fetch(`http://localhost:8080/allProductvariants`)
      .then((res) => res.json())
      .then((data) => {
        setProductvariants(data);
      });
  }, []);

  // const nevigateProductPage = (product) => {
  //   navigate("/productDetail", { state: { id: product?.product_id } });
  // };

  const nevigateProductPage = (product) => {
    navigate(`/productDetail?id=${product?.product_id}`);
  };

  const onAddCartClick = (product) => {
    navigate("/cart");
    addItem(product)
  };
const { addItem } = useItems(); 
  return (
    <div className="homepage">
      <Carousel images={images} />

      {/* Product Showcase Section */}
      <div className="product-grid">
        {productvariants.map((product, index) => {
          const images = product.image_url?.split(" ") || [];
          const logo = `images/${images?.[0]}.png`;
          const weight_size =
            productSizes.find((v) => v.size_id === product.size_id)?.name || "";
          return (
            <div
              style={{
                position: "relative",
                padding: "20px",
                width: "175px"
              }}
              className="product"
            >
              <button
                onClick={() => nevigateProductPage(product)}
                key={index}
                className="product"
              >
                <CachedImage src={logo} alt={product.name} />
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div>{weight_size}</div>
                  <p className="price">₹{product.price}</p>
                </div>
              </button>
              <button
                onClick={()=>onAddCartClick(product)}
                
                style={{
                  position: "absolute",
                  bottom: "5px", // vertically center relative to bottom button
                  left: "50%", // horizontally center relative to bottom button
                  transform: "translate(-50%, -50%)", // perfect centering
                  backgroundColor: "#0c5936ff",
                  color: "white",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "8px",
                  width: "auto",
                  cursor: "pointer",
                  zIndex: 2, // Higher layer
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
