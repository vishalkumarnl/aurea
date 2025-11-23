import React from "react";
import useWindowWidth from "./useWindowWidth";

export default function OrderHistoryPage({ onSelectOrder }) {
  const width = useWindowWidth();
  const isMobile = width < 768;

  const container = {
    maxWidth: 900,
    margin: "20px auto",
    padding: isMobile ? "10px" : "20px",
    fontFamily: "Arial"
  };

  const orderCard = {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  };

  const row = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "flex-start" : "center",
    marginBottom: 10
  };

  const button = {
    padding: "10px 14px",
    borderRadius: 20,
    border: "1px solid #999",
    background: "#fff",
    cursor: "pointer",
    margin: "6px 0",
    width: isMobile ? "100%" : "auto"
  };

  const yellowBtn = {
    ...button,
    background: "#ffd814",
    borderColor: "#e6b800",
    fontWeight: 600
  };

  const orders = [
    {
      id: "405-4420345-3245169",
      datePlaced: "13 November 2025",
      total: "₹294.00",
      delivered: "18 November",
      title:
        "Lifelong Set of 5 Resistance Bands for Workout/Physiotherapy...",
      img: "/mnt/data/Screenshot 2025-11-22 at 11.49.30 PM.png", // using uploaded image
      price: "₹249.00"
    }
  ];

  return (
    <div style={container}>
      <h2>Your Orders</h2>

      {orders.map(order => (
        <div key={order.id} style={orderCard}>
          <div style={row}>
            <div>
              <div style={{ fontSize: 12, color: "#555" }}>ORDER PLACED</div>
              <div>{order.datePlaced}</div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: "#555" }}>TOTAL</div>
              <div>{order.total}</div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: "#555" }}>ORDER #</div>
              <div>{order.id}</div>
            </div>

            <button
              style={{ ...button, color: "#0073bb" }}
              onClick={() => onSelectOrder(order)}
            >
              View order details
            </button>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 16 }}>
              Delivered {order.delivered}
            </div>
            <div style={{ fontSize: 13 }}>Package was handed to resident</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              marginTop: 15
            }}
          >
            <img
              src={order.img}
              alt="product"
              style={{
                width: isMobile ? "100%" : 120,
                height: "auto",
                borderRadius: 8
              }}
            />

            <div style={{ marginLeft: isMobile ? 0 : 16, marginTop: isMobile ? 10 : 0 }}>
              <div style={{ color: "#0073bb", marginBottom: 6 }}>
                {order.title}
              </div>
              <div>{order.price}</div>

              <button
                style={{
                  ...button,
                  marginTop: 10,
                  width: isMobile ? "100%" : 160
                }}
              >
                View your item
              </button>
            </div>

            {/* Right buttons */}
            <div
              style={{
                marginLeft: isMobile ? 0 : "auto",
                marginTop: isMobile ? 12 : 0,
                display: "flex",
                flexDirection: "column",
                width: isMobile ? "100%" : 200
              }}
            >
              <button style={yellowBtn}>Get product support</button>
              <button style={button}>Track package</button>
              <button style={button}>Return or replace items</button>
              <button style={button}>Leave seller feedback</button>
              <button style={button}>Leave delivery feedback</button>
              <button style={button}>Write a product review</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
