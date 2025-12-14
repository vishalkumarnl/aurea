import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./checkout.css";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Accept either selectedItems (from cart) or a single product passed via product (Buy Now)
  const navState = location.state || {};
  const selectedItems = navState.selectedItems || (navState.product ? [{ ...navState.product, quantity: 1 }] : []);

  // Address storage key and states
  const ADDRESSES_KEY = "aurea_addresses";
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", address: "", city: "", phone: "", setDefault: false });
  const [editShipping, setEditShipping] = useState(false);

  // default hardcoded addresses to show on the page
  const DEFAULT_ADDRESSES = [
    { id: 1, name: "Home - John Doe", address: "Flat 12B, Blue Apartments, MG Road", city: "Bengaluru", phone: "+91 98765 43210", default: true },
    { id: 2, name: "Office - John Doe", address: "Suite 401, Green Towers, Whitefield", city: "Bengaluru", phone: "+91 91234 56780", default: false }
  ];

  useEffect(() => {
    // load saved addresses from localStorage
    try {
      const raw = localStorage.getItem(ADDRESSES_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const initial = (parsed && parsed.length > 0) ? parsed : DEFAULT_ADDRESSES;
      setAddresses(initial || []);
      const def = (initial || []).find((a) => a.default) || (initial || [])[0];
      if (def) {
        setSelectedAddressId(def.id);
        setShipping({ name: def.name, address: def.address, city: def.city, phone: def.phone });
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const [shipping, setShipping] = useState({ name: "", address: "", city: "", phone: "" });

  const total = selectedItems.reduce((s, it) => s + Number(it.price) * (it.quantity || 1), 0);

  const handlePay = () => {
    if (!shipping.name || !shipping.address) {
      alert("Please select or provide a shipping address before proceeding.");
      return;
    }
    alert(`Payment simulated. Charged ₹${total.toLocaleString()}. Thank you!`);
    navigate("/orders");
  };

  const saveAddress = () => {
    const id = Date.now();
    const addressObj = { id, name: newAddress.name, address: newAddress.address, city: newAddress.city, phone: newAddress.phone, default: !!newAddress.setDefault };
    let next = [...addresses];
    if (newAddress.setDefault) {
      next = next.map((a) => ({ ...a, default: false }));
    }
    next.push(addressObj);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next));
    setAddresses(next);
    setSelectedAddressId(id);
    setShipping({ name: addressObj.name, address: addressObj.address, city: addressObj.city, phone: addressObj.phone });
    setShowAddForm(false);
    setNewAddress({ name: "", address: "", city: "", phone: "", setDefault: false });
  };

  const selectAddress = (id) => {
    setSelectedAddressId(id);
    const a = addresses.find((x) => x.id === id);
    if (a) setShipping({ name: a.name, address: a.address, city: a.city, phone: a.phone });
  };

  const deleteAddress = (id) => {
    const confirmed = window.confirm("Delete this address?");
    if (!confirmed) return;
    const next = addresses.filter((a) => a.id !== id);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next));
    setAddresses(next);
    // if deleted address was selected, pick first or clear
    if (selectedAddressId === id) {
      const first = (next && next[0]) || null;
      if (first) {
        setSelectedAddressId(first.id);
        setShipping({ name: first.name, address: first.address, city: first.city, phone: first.phone });
      } else {
        setSelectedAddressId(null);
        setShipping({ name: "", address: "", city: "", phone: "" });
      }
    }
  };

  const editAddress = (id) => {
    const a = addresses.find((x) => x.id === id);
    if (!a) return;
    setSelectedAddressId(id);
    setShipping({ name: a.name, address: a.address, city: a.city, phone: a.phone });
    setEditShipping(true);
    setShowAddForm(false);
  };

  if (!selectedItems || selectedItems.length === 0) {
    return (
      <div style={{ padding: 30 }}>
        <h2>No items to checkout</h2>
        <p>Please add items to your cart first.</p>
        <button onClick={() => navigate("/cart")}>Back to Cart</button>
      </div>
    );
  }

  return (
    <div className="checkoutPage">
      <div className="checkoutGrid">
        <div className="checkoutForm">
          <h2>Shipping Details</h2>

          <div style={{ marginBottom: 12 }}>
            <div style={{ marginBottom: 6, fontSize: 14, color: "#444" }}>Select an address</div>
            {addresses.length === 0 && <div style={{ color: '#666' }}>No saved addresses yet.</div>}
            {addresses.map((a) => (
              <div
                key={a.id}
                className={`addressBox ${a.id === selectedAddressId ? 'selected' : ''}`}
                style={{ marginBottom: 8, cursor: 'pointer' }}
                onClick={() => selectAddress(a.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectAddress(a.id); }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
                  <input type="radio" name="address" checked={a.id === selectedAddressId} onChange={() => selectAddress(a.id)} />
                  <div className="addrDetails">
                    <div className="addrNameRow">
                      <strong>{a.name}</strong>
                      <span style={{ color: '#666', fontSize: 13 }}>{a.city}</span>
                      {a.default && <span style={{ marginLeft: 8, background: 'var(--brand-green)', color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>Default</span>}
                    </div>
                    <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>{a.address}</div>
                    {a.phone && <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>📞 {a.phone}</div>}
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="smallBtn" onClick={() => { setShowAddForm(!showAddForm); setEditShipping(false); }}>
              {showAddForm ? "Cancel" : "Add new address"}
            </button>
            {addresses.length > 0 && (
              <button className="smallBtn" onClick={() => { setEditShipping(!editShipping); setShowAddForm(false); }}>
                {editShipping ? "Cancel edit" : "Edit selected address"}
              </button>
            )}
          </div>

          {showAddForm && (
            <div style={{ marginBottom: 12 }}>
              <label>
                Name
                <input value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
              </label>

              <label>
                Address
                <textarea value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
              </label>

              <label>
                City
                <input value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
              </label>

              <label>
                Phone
                <input value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} />
              </label>

              <label style={{ display: "block", marginTop: 8 }}>
                <input type="checkbox" checked={newAddress.setDefault} onChange={(e) => setNewAddress({ ...newAddress, setDefault: e.target.checked })} /> Set as default
              </label>

                <div style={{ marginTop: 8 }}>
                <button className="saveBtn" onClick={saveAddress}>Save address</button>
              </div>
            </div>
          )}
          {/* Shipping form: shown when adding a new address, editing a selected address, or there are no saved addresses */}
          {(showAddForm || editShipping || addresses.length === 0) && (
            <div>
              <label>
                Name
                <input value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
              </label>

              <label>
                Address
                <textarea value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
              </label>

              <label>
                City
                <input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
              </label>

              <label>
                Phone
                <input value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
              </label>

              {editShipping && (
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => {
                    // Save changes into addresses list and persist
                    const next = addresses.map((a) => a.id === selectedAddressId ? { ...a, name: shipping.name, address: shipping.address, city: shipping.city, phone: shipping.phone } : a);
                    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next));
                    setAddresses(next);
                    setEditShipping(false);
                  }} style={{ background: "var(--brand-green)", color: "#fff", padding: "8px 12px", borderRadius: 6 }}>Save changes</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="checkoutSummary">
          <h3>Your Order</h3>
          <div className="summaryItems">
            {selectedItems.map((it) => (
              <div className="summaryItem" key={it.variant_id || it.id}>
                <img src={(it.images && it.images.split(" ")[0]) || ""} alt="" />
                <div className="summaryItemDetails">
                  <div className="summaryItemTitle">{it.name}</div>
                  <div className="summaryItemMeta">{it.quantity} × ₹{it.price}</div>
                </div>
                <div className="summaryItemPrice">₹{(it.quantity * it.price).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="summaryRow">
            <div>Subtotal</div>
            <div>₹{total.toLocaleString()}</div>
          </div>

          <div className="summaryRow">
            <div>Shipping</div>
            <div>₹40</div>
          </div>

          <div className="summaryRow" style={{ fontWeight: 800 }}>
            <div>Total</div>
            <div>₹{(total + 40).toLocaleString()}</div>
          </div>

          <button className="checkoutBtn" onClick={handlePay}>Pay Now</button>
        </div>
      </div>
    </div>
  );
}
