import React from "react";

const OrderCard =({ order }) =>{
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        alignItems: "center",
      }}
    >
      <img
        src={order.image}
        alt={order.productName}
        style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "20px" }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 5px 0" }}>{order.productName}</h3>
        <p style={{ margin: "4px 0" }}>Order Date: {order.date}</p>
        <p style={{ margin: "4px 0" }}>Status: {order.status}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ fontWeight: "bold" }}>₹{order.price.toLocaleString()}</p>
        <button
          style={{
            backgroundColor: "#FFD814",
            border: "1px solid #FCD200",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
export default  OrderCard;