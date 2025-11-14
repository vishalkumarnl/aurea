import React from "react";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';

const CartCard = ({ order, updateQuantity, removeItem, toggleSelect }) => {
  const date = dayjs(order.date);
  const productSizes = useSelector((state) => state.product?.productSize) || [];
  const images = order.image_url?.split(" ") || [];
          const logo = `images/${images?.[0]}.png`;
          const weight_size =
            productSizes.find((v) => v.size_id === order.size_id)?.name || "";
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
        onChange={() => toggleSelect(order.variant_id)}
        style={{ marginRight: "10px" }}
      />

      <img
        src={logo}
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
        <p style={{ margin: "4px 0" }}>Size: {weight_size}</p>

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
            onClick={() => updateQuantity(order, -1)}
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
            onClick={() => updateQuantity(order, 1)}
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
          onClick={() => removeItem(order.variant_id)}
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

export default CartCard;
