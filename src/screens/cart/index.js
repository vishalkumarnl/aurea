import React, { useContext,useEffect, useState } from "react";
import CartCard from "./CartCard";
import { useItems } from "context/itemsContext";
import { AuthContext } from "context/authContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./cart.css";

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

  const navigate = useNavigate();

  // ✅ Checkout Handler: navigate to /checkout with selected items
  const handleCheckout = () => {
    // prefer selected items, otherwise checkout all items in the cart
    const selectedItems = items.filter((o) => o.selected);
    const toCheckout = selectedItems.length > 0 ? selectedItems : items;
    if (!toCheckout || toCheckout.length === 0) {
      alert("Your cart is empty. Add items before proceeding to checkout.");
      return;
    }
    navigate("/checkout", { state: { selectedItems: toCheckout } });
  };

  const allSelected = items.every((order) => order.selected);

  return (
    <div className="cartPage">
      <h2 style={{ maxWidth: 1200, margin: "0 auto 18px" }}>Your Cart</h2>

      <div className="cartGrid">
        <div>
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

          <div className="cartList">
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
              <div className="emptyMessage">No orders found.</div>
            )}
          </div>
        </div>

        {items.length > 0 && (
          <div className="cartSummary">
            <div className="summaryRow">
              <div>Selected items</div>
              <div className="selectedTotal">₹{totalSelected.toLocaleString()}</div>
            </div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>
              Shipping, taxes and discounts will be calculated at checkout
            </div>

            <button className="checkoutBtn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            {items.filter((o) => o.selected).length === 0 && (
              <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
                Tip: select items to checkout a subset, otherwise all items will be checked out.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
