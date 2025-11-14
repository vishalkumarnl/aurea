import React, { useState } from "react";
import CartCard from "./CartCard";
import CartFilter from "./CartFilter";
import { useItems } from "context/itemsContext";

const Cart=() =>{

  const {items, addItem, removeProduct} =useItems();
  const [orders, setOrders] = useState(items || []);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ Quantity update
  const updateQuantity = (item, delta) => {

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.variant_id === item.variant_id
          ? { ...order, quantity: Math.max(1, order.quantity + delta) }
          : order
      )
    );
    addItem(item,delta);
  };

  // ✅ Remove item
  const removeItem = (variant_id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.variant_id !== variant_id));
    removeProduct(variant_id);
  };

  // ✅ Toggle selection
  const toggleSelect = (variant_id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.variant_id === variant_id ? { ...order, selected: !order.selected } : order
      )
    );
  };

  // ✅ Select / Deselect All
  const toggleSelectAll = (checked) => {
    setOrders((prevOrders) => prevOrders.map((o) => ({ ...o, selected: checked })));
  };

  // ✅ Filter and search logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = filter === "All" || order.status === filter;
    return matchesSearch && matchesStatus;
  });

  // ✅ Compute total for selected items
  const totalSelected = filteredOrders
    .filter((order) => order.selected)
    .reduce((sum, order) => sum + order.price * order.quantity, 0);

  // ✅ Checkout Handler
  const handleCheckout = () => {
    const selectedItems = orders.filter((o) => o.selected);
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout!");
      return;
    }

    alert(
      `Proceeding to payment for ${selectedItems.length} item(s) — Total ₹${totalSelected.toLocaleString()}`
    );

    // You could navigate to a payment page here
    // navigate("/checkout", { state: { selectedItems } });
  };

  const allSelected = filteredOrders.every((order) => order.selected);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h2>Your Cart</h2>

      <CartFilter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      {/* ✅ Select All */}
      {filteredOrders.length > 0 && (
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
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <CartCard
            key={order.id}
            order={order}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            toggleSelect={toggleSelect}
          />
        ))
      ) : (
        <p>No orders found.</p>
      )}

      {/* 💰 Checkout Summary */}
      {filteredOrders.length > 0 && (
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
}
export default Cart;