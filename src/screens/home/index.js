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
  const [wishlist, setWishlist] = useState([]);
  const [hoverImage, setHoverImage] = useState({});
  const [hoverIndex, setHoverIndex] = useState({});
  // localStorage.clear();

  useEffect(() => {
    fetch(`http://localhost:8080/allProductvariants`)
      .then((res) => res.json())
      .then((data) => {
        setProductvariants(data);
      });
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // const nevigateProductPage = (product) => {
  //   navigate("/productDetail", { state: { id: product?.product_id } });
  // };

  const nevigateProductPage = (product) => {
    navigate(`/productDetail?product_id=${product?.product_id}`);
  };

  const onAddCartClick = (product) => {
    navigate("/cart");
    addItem(product);
  };
  const { addItem } = useItems();
  return (
    <div className="homepage">
      <Carousel images={images} />

      {/* Product Showcase Section */}
      <div
        style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {productvariants.map((item, index) => {
          const images = item.images?.split(" ") || [];
          // const logo = `images/${images?.[0]}.png`;
          const weight_size =
            productSizes.find((v) => v.size_id === item.size_id)?.name || "";
          return (
            <div
              key={item.variant_id}
              style={{
                border: "1px solid #46ac06ff",
                padding: "10px",
                borderRadius: "10px",
                position: "relative",
                background: "linear-gradient(145deg, #ffffff, #eaffea)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0px 5px 20px rgba(0,0,0,0.15)";

                let idx = 0;
                const cycle = () => {
                  idx = (idx + 1) % images.length;
                  setHoverImage((prev) => ({
                    ...prev,
                    [item.variant_id]: images[idx],
                  }));
                  setHoverIndex((prev) => ({
                    ...prev,
                    [item.variant_id]: idx,
                  }));
                };
                const interval = setInterval(cycle, 700);
                e.currentTarget.dataset.intervalId = interval;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";

                clearInterval(e.currentTarget.dataset.intervalId);
                setHoverImage((prev) => ({
                  ...prev,
                  [item.variant_id]: images[0],
                }));
                setHoverIndex((prev) => ({ ...prev, [item.variant_id]: 0 }));
              }}
            >
              <div
                onClick={() => toggleWishlist(item.variant_id)}
                style={{
                  position: "absolute",
                  top: "px",
                  right: "10px",
                  fontSize: "22px",
                  transform: wishlist.includes(item.variant_id)
                    ? "scale(1.3)"
                    : "scale(1)",
                  transition: "transform 0.2s ease",
                  color: wishlist.includes(item.variant_id) ? "red" : "#999",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {wishlist.includes(item.variant_id) ? "❤️" : "🤍"}
              </div>
              <div onClick={() => nevigateProductPage(item)}>
              {" "}
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: "#2e7d32",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                {/* {item.badge} */}Organic
              </span>
              {/* Wishlist Heart */}
              
              {/* Hover Image Change */}
              <img
                src={hoverImage[item.variant_id] || images[0]}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  transition: "opacity 0.3s ease",
                }}
              />
              <h3
                style={{
                  fontSize: "16px",
                  marginTop: "10px",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "24px",
                  lineHeight: "1.2",
                  maxHeight: "1.2em",
                }}
              >
                {item.name} | {weight_size}
              </h3>
              <div style={{ marginTop: "8px", fontSize: "14px" }}>
                <span style={{ fontWeight: "bold" }}>{item.price}</span>
                <span
                  style={{
                    marginLeft: "10px",
                    textDecoration: "line-through",
                    color: "#777",
                  }}
                >
                  {item.originalPrice}
                </span>
                <span style={{ marginLeft: "10px", color: "green" }}>
                  {item.discount}
                </span>
              </div>
              <div
                style={{ marginTop: "5px", fontSize: "14px", color: "#555" }}
              >
                ⭐ {item.rating} ({item.reviews})
              </div>
              </div>
              {/* Add to Cart Button */}
              <button
                onClick={() => onAddCartClick(item)}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px 15px",
                  background: hoverIndex[item.id]
                    ? "linear-gradient(90deg, #1faa00, #43a047)"
                    : "linear-gradient(90deg, #2e7d32, #1b5e20)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  zIndex: 2, // Higher layer                  cursor: "pointer",
                  fontSize: "15px",
                  boxShadow: hoverIndex[item.variant_id]
                    ? "0 0 12px rgba(76, 175, 80, 0.8)"
                    : "0 3px 10px rgba(46, 125, 50, 0.35)",
                  transition: "0.3s",
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
