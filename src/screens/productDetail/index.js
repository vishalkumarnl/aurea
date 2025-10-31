import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
const { state } = useLocation();
  const navigate = useNavigate();
  const id =state?.id;

  const [product, setProduct] = useState(null);

  // ✅ Simulated product data (in real app, fetch from backend)
  const mockProducts = [
    {
      id: 1,
      name: "Apple iPhone 15",
      description:
        "Experience the next level of performance with the Apple iPhone 15 featuring A17 Bionic chip, 6.1-inch OLED display, and stunning camera system.",
      price: 89999,
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1692919800000",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      description:
        "Industry-leading noise cancellation, 30 hours battery life, and immersive sound quality from Sony.",
      price: 29999,
      image:
        "https://m.media-amazon.com/images/I/61+YY49yV-L._SL1500_.jpg",
      rating: 4.6,
    },
  ];

  useEffect(() => {
    // Fetch product by ID (mocked)
    const found = mockProducts.find((p) => p.id === Number(id));
    setProduct(found);
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  const handleAddToCart = () => {
    alert(`Added "${product.name}" to cart.`);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        padding: "40px",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      {/* Left: Image */}
      <div
        style={{
          flex: "1 1 300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
        />
      </div>

      {/* Right: Details */}
      <div
        style={{
          flex: "2 1 400px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>{product.name}</h2>
        <p style={{ color: "#666", marginBottom: "15px" }}>{product.description}</p>
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "#B12704" }}>
          ₹{product.price.toLocaleString()}
        </p>
        <p style={{ color: "#ffa41c" }}>⭐ {product.rating} / 5</p>

        <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: "#FFD814",
              border: "1px solid #FCD200",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            style={{
              backgroundColor: "#FFA41C",
              border: "1px solid #E48F0B",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
