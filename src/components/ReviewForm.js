import React, { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
    } catch (err) {
      console.error("Compression error", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("rating", rating);
    form.append("reviewText", reviewText);
    if (compressedFile) form.append("image", compressedFile);

    onSubmit(form);
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Write a Review</h2>

      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <label style={styles.label}>Rating</label>
        <div style={styles.starsWrapper}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                ...styles.star,
                color:
                  (hover || rating) >= star ? "#f4c430" : "#ccc",
              }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review */}
        <label style={styles.label}>Your Review</label>
        <textarea
          style={styles.textarea}
          rows="4"
          placeholder="Share your experience..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        {/* Upload */}
        <label style={styles.label}>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {/* Preview */}
        {previewImage && (
          <img src={previewImage} alt="preview" style={styles.preview} />
        )}

        {/* Submit */}
        <button type="submit" style={styles.button}>
          Submit Review
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "480px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#333",
  },
  label: {
    display: "block",
    marginTop: "12px",
    marginBottom: "4px",
    fontSize: "14px",
    color: "#444",
    fontWeight: "500",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
  },
  starsWrapper: {
    marginBottom: "8px",
    fontSize: "26px",
    cursor: "pointer",
  },
  star: {
    marginRight: "4px",
    cursor: "pointer",
    transition: "0.2s",
  },
  preview: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  button: {
    marginTop: "16px",
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    background: "#f4c430",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },
};
