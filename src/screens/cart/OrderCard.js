import React from "react";

const OrderCard = ({ order, updateQuantity, removeItem, toggleSelect }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <input
        type="checkbox"
        checked={order.selected}
        onChange={() => toggleSelect(order.id)}
        style={{ marginRight: "10px" }}
      />

      <img
        src={order.image}
        alt={order.name}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
          marginRight: "20px",
        }}
      />

      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 style={{ margin: "0 0 5px 0" }}>{order.name}</h3>
        <p style={{ margin: "4px 0" }}>Order Date: {order.date}</p>
        <p style={{ margin: "4px 0" }}>Status: {order.status}</p>

        {/* Quantity Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          <button
            onClick={() => updateQuantity(order.id, -1)}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "1px solid #ccc",
              background: "#f8f8f8",
              cursor: "pointer",
            }}
          >
            −
          </button>
          <span>{order.quantity}</span>
          <button
            onClick={() => updateQuantity(order.id, 1)}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "1px solid #ccc",
              background: "#f8f8f8",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Price + Remove */}
      <div style={{ textAlign: "right", minWidth: "120px" }}>
        <p style={{ fontWeight: "bold" }}>
          ₹{(Number(order.price) * order.quantity).toLocaleString()}
        </p>
        <button
          onClick={() => removeItem(order.id)}
          style={{
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            padding: "6px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
