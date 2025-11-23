"use client";
import { useState, useRef } from "react";
import styles from "./product.module.css";

export default function ProductPage() {
  const images = ["/images/makhana.png", "/images/makhana2.png", "/images/makhana3.png", "/images/makhana4.png"];


  const [mainImage, setMainImage] = useState(images[0]);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const imgRef = useRef(null);

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
                backgroundPosition: `${-zoomPosition.x * 2}px ${-zoomPosition.y * 2}px`,
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
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className={styles.productInfo}>
        <h2>Premium Smartwatch Series X</h2>
        <p className={styles.price}>$249.99</p>

        <p>
          A premium smartwatch with advanced fitness tracking,
          GPS navigation and long battery life.
        </p>

        <button className={styles.buyBtn}>Add to Cart</button>

        <h3>Specifications</h3>
        <table className={styles.specTable}>
          <tbody>
            <tr><td>Display</td><td>1.45&quot; AMOLED</td></tr>
            <tr><td>Battery</td><td>450 mAh</td></tr>
            <tr><td>Waterproof</td><td>5 ATM</td></tr>
            <tr><td>Connectivity</td><td>Bluetooth 5.3, GPS</td></tr>
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
