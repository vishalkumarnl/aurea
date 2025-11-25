import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useWindowWidth from "components/useWindowWidth";

export default function OrderDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state;
  const isMobile = useWindowWidth() < 768;

  if (!order) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Order not found.</h3>
        <button onClick={() => navigate("/orders")}>Go back</button>
      </div>
    );
  }

  const container = {
    maxWidth: 900,
    margin: "0 auto",
    padding: isMobile ? 10 : 20,
    fontFamily: "Amazon Ember, Arial, sans-serif",
    color: "#111"
  };

  const card = {
    border: "1px solid #d5d9d9",
    borderRadius: 10,
    padding: 16,
    background: "#fff",
    marginBottom: 20
  };

  return (
    <div style={container}>
      <button
        onClick={() => navigate("/orders")}
        style={{
          background: "none",
          border: "none",
          color: "#007185",
          cursor: "pointer",
          marginBottom: 10
        }}
      >
        ← Your Orders
      </button>

      <h2>Order Details</h2>
      <div style={{ color: "#565959", marginBottom: 14 }}>
        Order placed {order.datePlaced} | Order number {order.id}
      </div>

      {/* Shipping + Payment + Summary */}
      <div style={card}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between"
          }}
        >
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
            <div style={{ fontWeight: "600", marginTop: 6 }}>
              Grand Total: ₹294.00
            </div>
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div style={card}>
        <h3>Delivered {order.delivered}</h3>
        <div style={{ color: "#565959" }}>
          Package was handed to resident
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            marginTop: 14
          }}
        >
          <img
            src={order.img}
            alt=""
            style={{
              width: isMobile ? "100%" : 150,
              borderRadius: 6,
              marginBottom: isMobile ? 10 : 0
            }}
          />

          <div
            style={{
              marginLeft: isMobile ? 0 : 16,
              flex: 1
            }}
          >
            <div style={{ color: "#007185", fontSize: 16 }}>
              {order.title}
            </div>
            <div style={{ marginTop: 6, fontSize: 15 }}>{order.total}</div>

            <button
              style={{
                padding: "10px 16px",
                borderRadius: 20,
                border: "1px solid #888",
                background: "#fff",
                marginTop: 10,
                width: isMobile ? "100%" : 180,
                cursor: "pointer"
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
