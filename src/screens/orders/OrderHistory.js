import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "components/useWindowWidth";
import OrderFilter from "./OrderFilter";

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

  const product1 =
    "/mnt/data/Screenshot 2025-11-22 at 11.49.30 PM.png";
  const product2 =
    "/mnt/data/Screenshot 2025-11-22 at 11.50.46 PM.png";

  const orders = [
    {
      id: "405-4420345-3245169",
      datePlaced: "13 November 2025",
      total: "₹294.00",
      delivered: "18 November",
      title:
        "Lifelong Set of 5 Resistance Bands for Workout/Exercise/Physiotherapy",
      img: product1
    },
    {
      id: "405-9674322-7781956",
      datePlaced: "26 October 2025",
      total: "₹931.00",
      delivered: "29 October",
      title: "Prestige Hard Anodized Plus Roti Tawa / Chapati Tawa",
      img: product2
    }
  ];

    // ✅ Filter and search logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = filter === "All" || order.status === filter;
    return matchesSearch && matchesStatus;
  });

  const container = {
    maxWidth: 900,
    margin: "0 auto",
    padding: isMobile ? 10 : 20,
    fontFamily: "Amazon Ember, Arial, sans-serif",
    color: "#111"
  };

  const card = {
    border: "1px solid #d5d9d9",
    borderRadius: 8,
    padding: 16,
    background: "#fff",
    marginBottom: 20,
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
  };

  const btn = {
    padding: "8px 14px",
    borderRadius: 20,
    border: "1px solid #888",
    cursor: "pointer",
    background: "#fff",
    width: isMobile ? "100%" : "auto",
    marginBottom: 8
  };

  const yellowBtn = {
    ...btn,
    background: "#ffd814",
    borderColor: "#f3cc00",
    fontWeight: 600
  };

  return (
    <div style={container}>
      <h2 style={{ marginBottom: 20 }}>Your Orders</h2>

      <OrderFilter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      {filteredOrders.map(order => (
        <div key={order.id} style={card}>
          {/* Header row */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              marginBottom: 10
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: "#565959" }}>ORDER PLACED</div>
              <div>{order.datePlaced}</div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: "#565959" }}>TOTAL</div>
              <div>{order.total}</div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: "#565959" }}>ORDER #</div>
              <div>{order.id}</div>
            </div>

            <button
              style={{ ...btn, color: "#007185" }}
              onClick={() => navigate(`/orders/${order.id}`, { state: order })}
            >
              View order details
            </button>
          </div>

          {/* Delivery info */}
          <div>
            <div style={{ fontWeight: 600 }}>
              Delivered {order.delivered}
            </div>
            <div style={{ fontSize: 13, color: "#565959" }}>
              Package was handed to resident
            </div>
          </div>

          {/* Product Row */}
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
                width: isMobile ? "100%" : 120,
                height: "auto",
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
              <div style={{ color: "#007185" }}>{order.title}</div>

              <button
                style={{ ...btn, marginTop: 10 }}
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                View your item
              </button>
            </div>

            {/* Right button column */}
            <div
              style={{
                width: isMobile ? "100%" : 200,
                marginTop: isMobile ? 16 : 0
              }}
            >
              <button style={yellowBtn}>Get product support</button>
              <button style={btn}>Track package</button>
              <button style={btn}>Return or replace items</button>
              <button style={btn}>Leave seller feedback</button>
              <button style={btn}>Leave delivery feedback</button>
              <button style={btn}>Write a product review</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
