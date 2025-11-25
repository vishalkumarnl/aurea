"use client";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./product.module.css";

export default function ProductDetail() {
  const [mainImage, setMainImage] = useState("");
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const imgRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product_id = queryParams.get("product_id") || 1;
  const navigate = useNavigate();

  const productColors =
    useSelector((state) => state.product?.productColors) || [];
  const productSizes = useSelector((state) => state.product?.productSize) || [];
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [product, setProduct] = useState(null);
  const [productvariants, setProductvariants] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/product/${product_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
    fetch(`http://localhost:8080/productvariants/${product_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.length) {
          setProductvariants(data);
          setSelectedColor(data[0].color_id);
          setSelectedSize(data[0].size_id);
          data[0].images.split(" ")[0] &&
            setMainImage(data[0].images.split(" ")[0]);
        }
      });
  }, [product_id]);

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
          let tempSize =
            productSizes?.find((item) => item.size_id === id) || {};
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
    const match = productvariants.find((v) => v.color_id === selectedColor);
    return match ? match.images?.split(" ") : [];
  };

  const images = getImages();

  const handleAddToCart = () => {
    alert(`Added "${product.name}" to cart.`);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product } });
  };

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setZoomPosition({ x, y });
  };

  return (
    <div className={styles.container}>
      {/* LEFT SIDE */}
      <div className={styles.imageSection}>
        {/* MAIN IMAGE WRAPPER WITH FIXED SIZE */}
        <div
          className={styles.mainImageWrapper}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
        >
          <img
            ref={imgRef}
            src={mainImage}
            className={styles.mainImage}
            alt="Product"
          />

          {/* ZOOM LENS */}
          {isZooming && (
            <div
              className={styles.zoomLens}
              style={{
                left: zoomPosition.x - 50,
                top: zoomPosition.y - 50,
              }}
            ></div>
          )}
        </div>

        {/* ZOOM RESULT BOX */}
        {isZooming && (
          <div className={styles.zoomResult}>
            <div
              className={styles.zoomedImage}
              style={{
                backgroundImage: `url(${mainImage})`,
                backgroundPosition: `${-zoomPosition.x * 2}px ${
                  -zoomPosition.y * 2
                }px`,
              }}
            ></div>
          </div>
        )}

        {/* THUMBNAILS */}
        <div className={styles.thumbnailContainer}>
          {images.map((img, idx) => (
            <img
              key={idx}
              alt={img}
              src={img}
              className={`${styles.thumb} ${
                mainImage === img ? styles.activeThumb : ""
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
          <button
            onClick={handleAddToCart}
            className={styles.buyBtn}
            // style={{
            //   backgroundColor: "#FFD814",
            //   border: "1px solid #FCD200",
            //   padding: "10px 20px",
            //   borderRadius: "8px",
            //   cursor: "pointer",
            //   fontWeight: "bold",
            // }}
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className={styles.buyBtn}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className={styles.productInfo}>
        <h2>{product.name}</h2>
        <p className={styles.price}>{getPriceByColorAndSize()}</p>
        <p style={{ color: "#ffa41c" }}>⭐ {product.rating} / 5</p>
        <div style={{ marginBottom: "10px" }}>{showAvailableColors()}</div>
        {showAvailableSizes()}
        <p>{product.description}</p>

        <h3>Specifications</h3>
        <table className={styles.specTable}>
          <tbody>
            <tr>
              <td>Display</td>
              <td>1.45&quot; AMOLED</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>450 mAh</td>
            </tr>
            <tr>
              <td>Waterproof</td>
              <td>5 ATM</td>
            </tr>
            <tr>
              <td>Connectivity</td>
              <td>Bluetooth 5.3, GPS</td>
            </tr>
          </tbody>
        </table>

        <h3>Customer Reviews</h3>
        <div className={styles.review}>
          <strong>John D.</strong>
          <p>⭐⭐⭐⭐⭐ &nbsp; Amazing quality and battery life!</p>
        </div>

        <div className={styles.review}>
          <strong>Emily W.</strong>
          <p>⭐⭐⭐⭐ &nbsp; Great features but the strap could be better.</p>
        </div>
      </div>
    </div>
  );
}
