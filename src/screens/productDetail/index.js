import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const {
    state: { id },
  } = useLocation();
  const navigate = useNavigate();

  const productColors =
    useSelector((state) => state.product?.productColors) || [];
  const productSizes = useSelector((state) => state.product?.productSize) || [];
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [product, setProduct] = useState(null);
  const [productvariants, setProductvariants] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
    fetch(`http://localhost:8080/productvariants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.length) {
          setProductvariants(data);
          setSelectedColor(data[0].color_id);
          setSelectedSize(data[0].size_id);
        }
      });
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  const showAvailableColors = () => {
    const colorIds = productvariants.map((variant) => variant.color_id);
    const uniqueColorIds = [...new Set(colorIds)];
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {uniqueColorIds.map((id) => {
          let tempColor =
            productColors?.find((item) => item.color_id === id) || {};
          return (
            <button
              style={{
                marginRight: "5px",
                borderRadius: "5px",
                backgroundColor: tempColor.hex_code,
                height: "5vh",
                width: "5vh",
                borderColor: id === selectedColor ? "#19c839ff" : "#000000",
                borderWidth: id === selectedColor ? "3px" : "1px",
                borderStyle: "solid",
              }}
              key={id}
              onClick={() => {
                setSelectedColor(id);
              }}
            ></button>
          );
        })}
      </div>
    );
  };
  const showAvailableSizes = () => {
    const sizeIds = productvariants.map((variant) => variant.size_id);
    const uniqueSizeIds = [...new Set(sizeIds)];
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {uniqueSizeIds.map((id) => {
          let tempSize = productSizes?.find((item) => item.size_id ===id) || {};
          return (
            <button
              onClick={() => {
                setSelectedSize(id);
              }}
              style={{
                marginRight: "5px",
                borderRadius: "5px",
                height: "5vh",
                width: "5vh",
                borderColor: id === selectedSize ? "#19c839ff" : "#000000ff",
                borderWidth: id === selectedSize ? "3px" : "1px",
                borderStyle: "solid",
              }}
              key={id}
            >
              {tempSize.name}
            </button>
          );
        })}
      </div>
    );
  };
  const getPriceByColorAndSize = () => {
    const match = productvariants.find(
      (v) => v.color_id === selectedColor && v.size_id === selectedSize
    );
    return match ? `₹${match.price}` : "Out Of Stock";
  };

  const getImages = () => {
    const match = productvariants.find(
      (v) => v.color_id === selectedColor
    );
    return match ? match.image_url?.split(" ") : [];
  };
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
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >{
        getImages()?.map(item =>{
          let logo = `images/${item}.png`
          return (<img
          src={logo}
          alt={product.name}
          style={{ width: "150px", height: "auto", borderRadius: "8px" }}
        />)
        })
      }
        
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
        <p style={{ color: "#666", marginBottom: "15px" }}>
          {product.description}
        </p>
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "#B12704" }}>
          {getPriceByColorAndSize()}
        </p>
        <p style={{ color: "#ffa41c" }}>⭐ {product.rating} / 5</p>
        <div style={{ marginBottom: "10px" }}>{showAvailableColors()}</div>
        {showAvailableSizes()}
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
