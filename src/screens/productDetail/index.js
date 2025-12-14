"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
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

  // Hardcoded review data (for presentation/demo)
  const initialReviews = [
    {
      id: 1,
      name: "John D.",
      rating: 5,
      date: "2025-11-20",
      text: "Amazing quality and battery life! Lasts multiple days on a single charge and the display is fantastic.",
      images: [
        "https://picsum.photos/seed/rev1a/400/400",
        "https://picsum.photos/seed/rev1b/400/400",
      ],
      helpful: 12,
    },
    {
      id: 2,
      name: "Emily W.",
      rating: 4,
      date: "2025-10-01",
      text: "Great features but the strap could be better. Overall very happy with the purchase.",
      images: ["https://picsum.photos/seed/rev2a/400/400"],
      helpful: 5,
    },
    {
      id: 3,
      name: "Arun S.",
      rating: 5,
      date: "2025-12-01",
      text: "Excellent value for money. The GPS accuracy surprised me and the UI is responsive.",
      images: [
        "https://picsum.photos/seed/rev3a/400/400",
        "https://picsum.photos/seed/rev3b/400/400",
        "https://picsum.photos/seed/rev3c/400/400",
      ],
      helpful: 7,
    },
    {
      id: 4,
      name: "Priya K.",
      rating: 3,
      date: "2025-11-05",
      text: "Good hardware, software needs a few updates. Notifications are sometimes delayed.",
      images: [],
      helpful: 2,
    },
  ];

  // keep reviews in state so new reviews can be added locally
  const [reviews, setReviews] = useState(initialReviews);
  const [adding, setAdding] = useState(false);
  const nameRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // focus the name input when modal opens
  useEffect(() => {
    if (adding && nameRef.current) nameRef.current.focus();
  }, [adding]);

  // close modal on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setAdding(false);
    };
    if (adding) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adding]);

  // lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % lightboxImages.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, lightboxImages.length]);

  const openLightbox = (imgs = [], idx = 0) => {
    if (!imgs || imgs.length === 0) return;
    setLightboxImages(imgs);
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % lightboxImages.length);
  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);

  // touch handlers for swipe navigation on mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches && e.touches[0] ? e.touches[0].clientX : null;
  };

  const onTouchEnd = (e) => {
    const x = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : null;
    touchEndX.current = x;
    if (touchStartX.current == null || touchEndX.current == null) return;
    const diff = touchEndX.current - touchStartX.current;
    const threshold = 50; // px
    if (Math.abs(diff) > threshold) {
      if (diff < 0) nextLightbox();
      else prevLightbox();
    }
  };

  const avgRating = useMemo(
    () => (reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0),
    [reviews]
  );

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const k = Math.min(5, Math.max(1, Number(r.rating) || 0));
      counts[k] = (counts[k] || 0) + 1;
    });
    return counts;
  }, [reviews]);

  const totalReviews = reviews.length;
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
                width: "8vh",
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
        {/* Add review modal (simple) */}
        {adding && (
          <div className={styles.modalBackdrop} onClick={() => setAdding(false)}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
              <h3>Add a review</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  const name = fd.get("name")?.toString().trim() || "Anonymous";
                  const rating = Number(fd.get("rating") || 5);
                  const text = fd.get("text")?.toString().trim() || "";
                  const imagesRaw = fd.get("images")?.toString().trim() || "";
                  const images = imagesRaw ? imagesRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];

                  // basic client-side validation
                  if (!text || text.length < 5) {
                    alert("Please enter a review of at least 5 characters.");
                    return;
                  }

                  // append to local reviews
                  setReviews((prev) => [
                    {
                      id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
                      name,
                      rating: Math.min(5, Math.max(1, rating)),
                      date: new Date().toISOString(),
                      text,
                      images,
                      helpful: 0,
                    },
                    ...prev,
                  ]);
                  setAdding(false);
                }}
              >
                <div className={styles.formRow}>
                  <label>Name</label>
                  <input name="name" ref={nameRef} />
                </div>
                <div className={styles.formRow}>
                  <label>Rating</label>
                  <select name="rating" defaultValue={5}>
                    <option value={5}>5 - Excellent</option>
                    <option value={4}>4 - Very Good</option>
                    <option value={3}>3 - Good</option>
                    <option value={2}>2 - Fair</option>
                    <option value={1}>1 - Poor</option>
                  </select>
                </div>
                <div className={styles.formRow}>
                  <label>Review</label>
                  <textarea name="text" rows={4} />
                </div>
                <div className={styles.formRow}>
                  <label>Image URLs (comma-separated)</label>
                  <input name="images" placeholder="https://... , https://..." />
                </div>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.btnAlt} onClick={() => setAdding(false)}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.btnPrimary}>
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Image lightbox */}
        {lightboxOpen && (
          <div className={styles.lightboxBackdrop} onClick={closeLightbox}>
              <div className={styles.lightboxCard} onClick={(e) => e.stopPropagation()}>
              <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">✕</button>

              <div
                className={styles.lightboxInner}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <button className={styles.lightboxNav} onClick={(e) => { e.stopPropagation(); prevLightbox(); }} aria-label="Previous">◀</button>

                <div className={styles.lightboxViewport}>
                  <img src={lightboxImages[lightboxIndex]} alt={`image-${lightboxIndex + 1}`} className={styles.lightboxImg} />
                </div>

                <button className={styles.lightboxNav} onClick={(e) => { e.stopPropagation(); nextLightbox(); }} aria-label="Next">▶</button>
              </div>

              <div className={styles.lightboxFooter}>{lightboxIndex + 1} / {lightboxImages.length}</div>
            </div>
          </div>
        )}

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
        <p style={{ color: "var(--brand-green)" }}>⭐ {product.rating} / 5</p>
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
        <div className={styles.reviewsSection}>
          <div className={styles.reviewsHeader}>
            <div className={styles.averageRating}>{avgRating.toFixed(1)} ★</div>
            <div>{totalReviews} reviews</div>
            <button
              className={styles.addReviewBtn}
              onClick={() => setAdding(true)}
              aria-haspopup="dialog"
              aria-expanded={adding}
            >
              + Add Review
            </button>
          </div>

          <div className={styles.ratingBreakdown}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCounts[star] || 0;
              const percent = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
              return (
                <div key={star} className={styles.breakdownRow}>
                  <div className={styles.breakdownLabel}>{star}★</div>
                  <div className={styles.breakdownBar}>
                    <div className={styles.breakdownFill} style={{ width: `${percent}%` }} />
                  </div>
                  <div className={styles.breakdownCount}>{count}</div>
                </div>
              );
            })}
          </div>

          {/* Collective images gallery (unique) */}
          {(() => {
            const collective = Array.from(
              new Set(reviews.flatMap((r) => r.images || []))
            );
            if (collective.length > 0) {
              return (
                <div className={styles.reviewGallery}>
                          {collective.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              className={styles["gallery-thumb"] || "gallery-thumb"}
                              onClick={() => openLightbox(collective, idx)}
                              alt={`review-${idx}`}
                            />
                          ))}
                </div>
              );
            }
            return null;
          })()}

          {reviews.map((r) => (
            <div key={r.id} className={styles.reviewCard}>
              <div className={styles.avatar}>{r.name.split(" ")[0][0]}</div>
              <div style={{ flex: 1 }}>
                <div className={styles.reviewMeta}>
                  <div className={styles.reviewName}>{r.name}</div>
                  <div className={styles.stars}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                  <div className={styles.reviewDate}>{new Date(r.date).toLocaleDateString()}</div>
                </div>
                <div className={styles.reviewText}>{r.text}</div>

                {r.images && r.images.length > 0 && (
                  <div className={styles["review-images"]}>
                    {r.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`rev-${r.id}-${i}`}
                        onClick={() => openLightbox(r.images, i)}
                      />
                    ))}
                  </div>
                )}

                <div className={styles.reviewActions}>
                  <div>{r.helpful} found this helpful</div>
                  <div>Reply</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
