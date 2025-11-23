import React from "react";
import useWindowWidth from "./useWindowWidth";

export default function OrderDetailsPage({ order, onBack }) {
  const width = useWindowWidth();
  const isMobile = width < 768;

  const container = {
    maxWidth: 900,
    margin: "20px auto",
    padding: isMobile ? 10 : 20,
    fontFamily: "Arial"
  };

  const section = {
    border: "1px solid #ddd",
    padding: 16,
    borderRadius: 10,
    background: "#fff",
    marginBottom: 20
  };

  const row = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between"
  };

  return (
    <div style={container}>
      <button
        onClick={onBack}
        style={{
          border: "none",
          background: "none",
          color: "#0073bb",
          cursor: "pointer",
          marginBottom: 10
        }}
      >
        ← Back to Orders
      </button>

      <h2>Order Details</h2>
      <div style={{ color: "#555", marginBottom: 20 }}>
        Order placed {order.datePlaced} | Order number {order.id}
      </div>

      {/* Shipping + Payment + Summary */}
      <div style={section}>
        <div style={row}>
          <div style={{ flex: 1 }}>
            <h4>Ship to</h4>
            <div>Shashikant Kumar</div>
            <div>Flat No: 303, Bhavisha Avighna</div>
            <div>Sarjapur, Karnataka</div>
            <div>India</div>
          </div>

          <div style={{ flex: 1 }}>
            <h4>Payment method</h4>
            <div>💳 Mastercard ending in 2899</div>
          </div>

          <div style={{ flex: 1 }}>
            <h4>Order Summary</h4>
            <div>Item(s) Subtotal: ₹249.00</div>
            <div>Shipping: ₹40.00</div>
            <div>Marketplace Fee: ₹5.00</div>
            <div>Total: ₹294.00</div>
            <div style={{ fontWeight: 700 }}>Grand Total: ₹294.00</div>
          </div>
        </div>
      </div>

      {/* Delivery Box */}
      <div style={section}>
        <h3>Delivered 18 November</h3>
        <div style={{ color: "#444" }}>Package was handed to resident</div>

        <div style={{ marginTop: 16, display: "flex", flexDirection: isMobile ? "column" : "row" }}>
          <img
            src={order.img}
            alt="product"
            style={{ width: isMobile ? "100%" : 150, borderRadius: 8 }}
          />

          <div style={{ marginLeft: isMobile ? 0 : 16, marginTop: isMobile ? 10 : 0 }}>
            <div style={{ color: "#0073bb", fontSize: 16 }}>{order.title}</div>
            <div style={{ marginTop: 6, fontSize: 15 }}>{order.price}</div>

            <button
              style={{
                marginTop: 14,
                padding: "10px 18px",
                border: "1px solid #444",
                borderRadius: 20,
                background: "#fff",
                cursor: "pointer",
                width: isMobile ? "100%" : 180
              }}
            >
              View your item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
