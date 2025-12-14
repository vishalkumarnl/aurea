import React, { useContext,useEffect, useState } from "react";
import CartCard from "./CartCard";
import { useItems } from "context/itemsContext";
import { AuthContext } from "context/authContext";
import { useSelector } from "react-redux";

const Cart = () => {
  const { user } = useContext(AuthContext);
   const remoteCartItems = useSelector((state) => state?.userData?.cartItems);

  const { cartItems, addCartItem, removeCartProduct } = useItems();
  // Keep local items state derived from either remote (logged-in) or local context
  const [items, setItems] = useState([]);

  // Sync items whenever source data changes (handles reload / async fetch)
  useEffect(() => {
    const source = user ? remoteCartItems : cartItems;
    if (Array.isArray(source)) {
      // ensure selected flag exists on each item
      const normalized = source.map((it) => ({ ...it, selected: !!it.selected }));
      setItems(normalized);
    } else {
      setItems([]);
    }
  }, [user, remoteCartItems, cartItems]);

  // ✅ Quantity update
  const updateQuantity = (item, delta) => {
    const tempItem = items.find(
      (order) => order.variant_id === item.variant_id
    );
    if (delta < 0 && tempItem?.quantity === 1) {
      return;
    }
    setItems((prevOrders) =>
      prevOrders.map((order) =>
        order.variant_id === item.variant_id
          ? { ...order, quantity: Math.max(1, order.quantity + delta) }
          : order
      )
    );
    addCartItem(item, delta);
  };

  // ✅ Remove item
  const removeItem = (variant_id) => {
    setItems((prevOrders) =>
      prevOrders.filter((order) => order.variant_id !== variant_id)
    );
    removeCartProduct(variant_id);
  };

  // ✅ Toggle selection
  const toggleSelect = (variant_id) => {
    setItems((prevOrders) =>
      prevOrders.map((order) =>
        order.variant_id === variant_id
          ? { ...order, selected: !order.selected }
          : order
      )
    );
  };

  // ✅ Select / Deselect All
  const toggleSelectAll = (checked) => {
    setItems((prevOrders) =>
      prevOrders.map((o) => ({ ...o, selected: checked }))
    );
  };

  // ✅ Compute total for selected items
  const totalSelected = items
    .filter((order) => order.selected)
    .reduce((sum, order) => sum + order.price * order.quantity, 0);

  // ✅ Checkout Handler
  const handleCheckout = () => {
    const selectedItems = items.filter((o) => o.selected);
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout!");
      return;
    }

    alert(
      `Proceeding to payment for ${
        selectedItems.length
      } item(s) — Total ₹${totalSelected.toLocaleString()}`
    );

    // You could navigate to a payment page here
    // navigate("/checkout", { state: { selectedItems } });
  };

  const allSelected = items.every((order) => order.selected);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h2>Your Cart</h2>

      {items.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => toggleSelectAll(e.target.checked)}
            />{" "}
            Select All
          </label>
        </div>
      )}

      {/* 🧩 Order Cards */}
      {items.length > 0 ? (
        items.map((product) => (
          <CartCard
            key={product.id}
            product={product}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            toggleSelect={toggleSelect}
          />
        ))
      ) : (
        <p>No orders found.</p>
      )}

      {/* 💰 Checkout Summary */}
      {items.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "8px",
            background: "#fff",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            textAlign: "right",
          }}
        >
          <p style={{ fontWeight: "bold" }}>
            Selected Total: ₹{totalSelected.toLocaleString()}
          </p>
          <button
            onClick={handleCheckout}
            style={{
              backgroundColor: "#FFD814",
              border: "1px solid #FCD200",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};
export default Cart;
