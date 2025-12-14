import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartCard = ({ product, updateQuantity, removeItem, toggleSelect }) => {
  const navigate = useNavigate();
  const nevigateProductPage = (product) => {
    navigate(`/productDetail?product_id=${product?.product_id}`);
  };

  const productSizes = useSelector((state) => state.product?.productSize) || [];
  const images = product.images?.split(" ") || [];
  const logo = images[0];
  const weight_size =
    productSizes.find((v) => v.size_id === product.size_id)?.name || "";
  return (
    <div className="cartCard">
      <input
        type="checkbox"
        checked={product.selected}
        onChange={() => toggleSelect(product.variant_id)}
        style={{ marginRight: "10px" }}
      />

      <img src={logo} alt={product.name} onClick={() => nevigateProductPage(product)} className="productImage" />

      <div style={{ flex: 1, minWidth: "200px" }}>
        <h3 className="productTitle" onClick={() => nevigateProductPage(product)} style={{ margin: 0 }}>{product.name}</h3>
        <p className="productMeta">Size: {weight_size}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <button onClick={() => updateQuantity(product, -1)} className="qtyBtn" aria-label="decrease">−</button>
          <span>{product.quantity}</span>
          <button onClick={() => updateQuantity(product, 1)} className="qtyBtn" aria-label="increase">+</button>
        </div>
      </div>

      {/* Price + Remove */}
      <div style={{ textAlign: "right", minWidth: "120px" }}>
        <p className="totalPrice">₹{(Number(product.price) * product.quantity).toLocaleString()}</p>
        <button onClick={() => removeItem(product.variant_id)} className="removeBtn">Remove</button>
      </div>
    </div>
  );
};

export default CartCard;
