import React from "react";

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "14px",
    borderRadius: "8px",
    marginBottom: "20px",
    background: "#fafafa"
  },
  status: {
    marginTop: "8px",
    fontSize: "16px",
    fontWeight: 600
  }
};

export default function TrackingInfo({ trackingId, status }) {
  return (
    <div style={styles.card}>
      <h3 style={{ margin: 0 }}>Tracking Information</h3>
      <p><strong>Tracking ID:</strong> {trackingId}</p>
      <p style={styles.status}>📦 Status: {status}</p>
    </div>
  );
}
