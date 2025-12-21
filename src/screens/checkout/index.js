import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./checkout.css";
import { getFirstImage } from "utils";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Accept either selectedItems (from cart) or a single product passed via product (Buy Now)
  const navState = location.state || {};
  const selectedItems = navState.selectedItems || (navState.product ? [{ ...navState.product, quantity: 1 }] : []);

  // Address storage key and states
  const ADDRESSES_KEY = "aurea_addresses";
  const DEFAULT_KEY = "aurea_default";
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", phone: "", pincode: "", locality: "", address: "", city: "", state: "", landmark: "", type: "Home" });
  const [editShipping, setEditShipping] = useState(false);


  useEffect(() => {
    // Prefer addresses from the user's profile (profile manager) stored at `user_addresses`.
    // Falls back to the local aurea_addresses if none found. Persist default in `aurea_default`.
    try {
      const PROFILE_KEY = "user_addresses";
      const defaultId = localStorage.getItem(DEFAULT_KEY);

      const rawProfile = localStorage.getItem(PROFILE_KEY);
      const profile = rawProfile ? JSON.parse(rawProfile) : [];

      const raw = localStorage.getItem(ADDRESSES_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const aurea = parsed || [];

      // Map profile addresses
      const profileMapped = (profile || []).map((p, i) => {
        const id = `profile-${i}`;
        return {
          id,
          source: 'profile',
          name: p.name || "",
          address: [p.address, p.locality, p.landmark].filter(Boolean).join(", "),
          city: p.city || "",
          phone: p.phone || "",
          default: false,
        };
      });

      // Map aurea addresses
      const aureaMapped = (aurea || []).map((a) => ({ ...a, id: String(a.id), source: 'aurea', default: !!a.default }));

      // Combine both sets so user can choose from profile + saved addresses
      const combined = [...profileMapped, ...aureaMapped];

      // Apply defaultId (if any) to combined list
      let defaultIdApplied = defaultId;
      if (defaultIdApplied) {
        combined.forEach((c) => { c.default = String(c.id) === String(defaultIdApplied); });
      } else if (combined.length > 0) {
        // pick first as default and persist
        combined[0].default = true;
        try { localStorage.setItem(DEFAULT_KEY, String(combined[0].id)); } catch (e) {}
        defaultIdApplied = String(combined[0].id);
      }

      setAddresses(combined);
      if (combined && combined.length > 0) {
        const chosen = combined.find((a) => a.default) || combined[0];
        setSelectedAddressId(chosen.id);
        setShipping({ name: chosen.name, address: chosen.address, city: chosen.city, phone: chosen.phone });
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
    // Navigate to a dedicated Payment page with full order details
    navigate("/checkout/payment", {
      state: {
        selectedItems,
        shipping,
        subtotal: total,
        shippingFee: 40,
        total: total + 40,
      },
    });
  };

  const saveAddress = () => {
    // Save into profile manager storage so it appears in Profile -> Addresses
    const PROFILE_KEY = "user_addresses";
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      const profile = stored ? JSON.parse(stored) : [];
      const toSave = {
        name: newAddress.name || "",
        phone: newAddress.phone || "",
        pincode: newAddress.pincode || "",
        locality: newAddress.locality || "",
        address: newAddress.address || "",
        city: newAddress.city || "",
        state: newAddress.state || "",
        landmark: newAddress.landmark || "",
        type: newAddress.type || "Home",
      };
      const updatedProfile = [...profile, toSave];
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));

      // Rebuild combined list (profile + aurea) and apply default rules
      const profileMapped = updatedProfile.map((p, i) => ({ id: `profile-${i}`, source: 'profile', name: p.name || "", address: [p.address, p.locality, p.landmark].filter(Boolean).join(', '), city: p.city || "", phone: p.phone || "", default: false }));

      const aureaRaw = localStorage.getItem(ADDRESSES_KEY);
      const aurea = aureaRaw ? JSON.parse(aureaRaw) : [];
      const aureaMapped = (aurea || []).map((a) => ({ ...a, id: String(a.id), source: 'aurea', default: !!a.default }));

      const combined = [...profileMapped, ...aureaMapped];

      const defaultId = localStorage.getItem(DEFAULT_KEY);
      if (defaultId) {
        combined.forEach((c) => { c.default = String(c.id) === String(defaultId); });
      } else if (combined.length > 0) {
        combined[0].default = true;
        try { localStorage.setItem(DEFAULT_KEY, String(combined[0].id)); } catch (e) {}
      }

      setAddresses(combined);

      // select newly added profile address
      const newProfileId = `profile-${profileMapped.length - 1}`;
      setSelectedAddressId(newProfileId);
      setShipping({ name: toSave.name, address: toSave.address, city: toSave.city, phone: toSave.phone });

      setShowAddForm(false);
      setNewAddress({ name: "", phone: "", pincode: "", locality: "", address: "", city: "", state: "", landmark: "", type: "Home" });
    } catch (e) {
      console.error("Failed to save profile address", e);
      alert("Unable to save address. Please try again.");
    }
  };

  // Use current location to pre-fill the profile-style add form
  const useCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(`http://localhost:8080/api/reverse?lat=${latitude}&lon=${longitude}`);
        if (!res.ok) throw new Error('reverse lookup failed');
        const data = await res.json();
        const addr = data.address || {};

        setNewAddress((prev) => ({
          ...prev,
          pincode: addr.postcode || "",
          locality: addr.suburb || addr.village || "",
          address: data.display_name || prev.address || "",
          city: addr.city || addr.town || addr.village || prev.city || "",
          state: addr.state || prev.state || "",
        }));
      } catch (e) {
        console.error('Reverse lookup failed', e);
        alert('Unable to fetch location address.');
      }
    }, (err) => {
      console.error('geolocation failed', err);
      alert('Unable to access location');
    });
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

    // Persist only non-profile addresses to ADDRESSES_KEY
    try {
      const toPersist = next.filter((a) => a.source !== 'profile');
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(toPersist));
    } catch (e) {}

    setAddresses(next);

    const currentDefault = localStorage.getItem(DEFAULT_KEY);
    if (currentDefault === String(id)) {
      if (next.length > 0) {
        const first = next[0];
        // promote first as default
        try { localStorage.setItem(DEFAULT_KEY, String(first.id)); } catch (e) {}
        const updatedNext = next.map((a) => ({ ...a, default: a.id === first.id }));
        setAddresses(updatedNext);
        setSelectedAddressId(first.id);
        setShipping({ name: first.name, address: first.address, city: first.city, phone: first.phone });
      } else {
        try { localStorage.removeItem(DEFAULT_KEY); } catch (e) {}
        setSelectedAddressId(null);
        setShipping({ name: "", address: "", city: "", phone: "" });
      }
    } else {
      // if deleted the currently selected address (but not default), pick a first or clear
      if (selectedAddressId === id) {
        const first = next[0] || null;
        if (first) {
          setSelectedAddressId(first.id);
          setShipping({ name: first.name, address: first.address, city: first.city, phone: first.phone });
        } else {
          setSelectedAddressId(null);
          setShipping({ name: "", address: "", city: "", phone: "" });
        }
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

  const setAsDefault = (id) => {
    // Save default id separately so it can point to profile or aurea addresses
    try {
      localStorage.setItem(DEFAULT_KEY, String(id));
    } catch (e) {}

    const next = addresses.map((a) => (a.id === id ? { ...a, default: true } : { ...a, default: false }));
    setAddresses(next);

    // If this default corresponds to an aurea stored address, also persist default flags in that storage.
    try {
      const aureaRaw = localStorage.getItem(ADDRESSES_KEY);
      if (aureaRaw) {
        const parsed = JSON.parse(aureaRaw);
        const updatedAurea = parsed.map((aa) => (String(aa.id) === String(id) ? { ...aa, default: true } : { ...aa, default: false }));
        localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updatedAurea));
      }
    } catch (e) {}

    setSelectedAddressId(id);
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
                      {a.default && <span style={{ marginLeft: 8 }} className="addrBadge">Default</span>}
                    </div>
                    <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>{a.address}</div>
                    {a.phone && <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>📞 {a.phone}</div>}
                  </div>
                </label>
                <div className="addrActions">
                  <button className="addrActionBtn" onClick={(e) => { e.stopPropagation(); selectAddress(a.id); }}>Deliver here</button>
                  {!a.default && <button className="addrActionBtn" onClick={(e) => { e.stopPropagation(); setAsDefault(a.id); }}>Make default</button>}
                  {a.source !== 'profile' && (
                    <>
                      <button className="addrActionBtn" onClick={(e) => { e.stopPropagation(); editAddress(a.id); }}>Edit</button>
                      <button className="addrActionBtn" onClick={(e) => { e.stopPropagation(); deleteAddress(a.id); }}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="smallBtn" onClick={() => { const opening = !showAddForm; setShowAddForm(opening); setEditShipping(false); if (opening) setNewAddress({ name: "", phone: "", pincode: "", locality: "", address: "", city: "", state: "", landmark: "", type: "Home" }); }}>
              {showAddForm ? "Cancel" : "Add new address"}
            </button>
            {addresses.length > 0 && addresses.some((x) => x.id === selectedAddressId && x.source !== 'profile') && (
              <button className="smallBtn" onClick={() => { setEditShipping(!editShipping); setShowAddForm(false); }}>
                {editShipping ? "Cancel edit" : "Edit selected address"}
              </button>
            )}
          </div>

          {showAddForm && (
            <div className="addrModal" role="dialog" aria-modal="true">
              <div className="addrModalBackdrop" onClick={() => setShowAddForm(false)}></div>
              <div className="addrModalContent" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ marginTop: 0 }}>Add new address</h3>

                <button className="smallBtn" style={{ marginBottom: 8 }} onClick={useCurrentLocation}>📍 Use My Current Location</button>

                <label>
                  Name
                  <input value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
                </label>

                <label>
                  Phone
                  <input value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} />
                </label>

                <label>
                  Pincode
                  <input value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                </label>

                <label>
                  Locality
                  <input value={newAddress.locality} onChange={(e) => setNewAddress({ ...newAddress, locality: e.target.value })} />
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
                  State
                  <input value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
                </label>

                <label>
                  Landmark (optional)
                  <input value={newAddress.landmark} onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })} />
                </label>

                <div className="addrTypeToggle" role="radiogroup" aria-label="Address type" style={{ marginTop: 8 }}>
                  <button type="button" className={`toggleBtn ${newAddress.type === 'Home' ? 'active' : ''}`} role="radio" aria-checked={newAddress.type === 'Home'} onClick={() => setNewAddress({ ...newAddress, type: 'Home' })}>Home</button>
                  <button type="button" className={`toggleBtn ${newAddress.type === 'Work' ? 'active' : ''}`} role="radio" aria-checked={newAddress.type === 'Work'} onClick={() => setNewAddress({ ...newAddress, type: 'Work' })}>Work</button>
                </div>

                <div className="modalActions" style={{ marginTop: 8 }}>
                  <button className="saveBtn" onClick={saveAddress}>Save to profile</button>
                  <button className="smallBtn" onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
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
                    // Save changes into addresses list and persist ONLY aurea addresses
                    const nextAll = addresses.map((a) => a.id === selectedAddressId ? { ...a, name: shipping.name, address: shipping.address, city: shipping.city, phone: shipping.phone } : a);
                    try {
                      const aureaToSave = nextAll.filter((a) => a.source !== 'profile').map((a) => ({ id: a.id, name: a.name, address: a.address, city: a.city, phone: a.phone, default: !!a.default }));
                      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(aureaToSave));
                    } catch (e) {}
                    setAddresses(nextAll);
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
                <img src={getFirstImage(it.images)} alt={it.name || ""} />
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
