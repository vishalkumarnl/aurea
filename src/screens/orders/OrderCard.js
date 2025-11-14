import React from "react";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';

const OrderCard = ({ order }) => {
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
        <p style={{ margin: "4px 0" }}>Order Date: {date.format('DD/MM/YYYY')}</p>
        <p style={{ margin: "4px 0" }}>Size: {weight_size}</p>
        <span>Quantity : {order.quantity}</span>
      </div>

      {/* Price + Remove */}
      <div style={{ textAlign: "right", minWidth: "120px" }}>
        <p style={{ fontWeight: "bold" }}>
          Price: ₹{(Number(order.price) * order.quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
