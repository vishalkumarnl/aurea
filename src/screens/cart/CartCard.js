import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartCard = ({ product, updateQuantity, removeItem, toggleSelect }) => {
  const navigate = useNavigate();
  const nevigateProductPage = (product) => {
    navigate(`/productDetail?id=${product?.product_id}`);
  };

  const productSizes = useSelector((state) => state.product?.productSize) || [];
  const images = product.images?.split(" ") || [];
  const logo = images[0];
  const weight_size =
    productSizes.find((v) => v.size_id === product.size_id)?.name || "";
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
        checked={product.selected}
        onChange={() => toggleSelect(product.variant_id)}
        style={{ marginRight: "10px" }}
      />

      <img
        src={logo}
        alt={product.name}
        onClick={() => nevigateProductPage(product)}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
          marginRight: "20px",
          cursor: "pointer",
        }}
      />

      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3
          onClick={() => nevigateProductPage(product)}
          style={{ margin: "0 0 5px 0", cursor: "pointer" }}
        >
          {product.name}
        </h3>
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
            onClick={() => updateQuantity(product, -1)}
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
          <span>{product.quantity}</span>
          <button
            onClick={() => updateQuantity(product, 1)}
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
          ₹{(Number(product.price) * product.quantity).toLocaleString()}
        </p>
        <button
          onClick={() => removeItem(product.variant_id)}
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
