import React, { useState, useEffect } from "react";

const STORAGE_KEY = "user_addresses";

const AddressManager = () => {
  const [addresses, setAddresses] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    type: "Home",
  });

  // Load saved addresses from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setAddresses(JSON.parse(stored));
  }, []);

  // Save to localStorage
  const saveToStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Use current location and fill address fields
  const useCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(`http://localhost:8080/api/reverse?lat=${latitude}&lon=${longitude}`);

      const data = await res.json();
      const addr = data.address || {};

      setForm((prev) => ({
        ...prev,
        pincode: addr.postcode || "",
        locality: addr.suburb || addr.village || "",
        address: data.display_name || "",
        city: addr.city || addr.town || addr.village || "",
        state: addr.state || "",
      }));
    });
  };

  // Save or update address
  const handleSave = () => {
    if (!form.name || !form.phone) {
      alert("Name and phone number are required");
      return;
    }

    let updatedAddresses;
    if (editingIndex !== null) {
      updatedAddresses = addresses.map((addr, i) =>
        i === editingIndex ? form : addr
      );
      setEditingIndex(null);
    } else {
      updatedAddresses = [...addresses, form];
    }

    setAddresses(updatedAddresses);
    saveToStorage(updatedAddresses);
    resetForm();
  };

  // Edit existing address
  const handleEdit = (index) => {
    setForm(addresses[index]);
    setEditingIndex(index);
    setFormVisible(true);
  };

  // Delete an address
  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    saveToStorage(updated);
  };

  // Reset form fields
  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      landmark: "",
      type: "Home",
    });
    setFormVisible(false);
  };

  return (
    <div style={{ paddingLeft: "30px"}}>
      <h2 style={{ color: "#1a73e8" }}>Manage Addresses</h2>

      {/* Add New Address Button */}
      {!formVisible && (
        <button
          onClick={() => setFormVisible(true)}
          style={{
            background: "#1a73e8",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ➕ Add a New Address
        </button>
      )}

      {/* Address Form */}
      {formVisible && (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            marginBottom: "30px",
          }}
        >
          <h3>{editingIndex !== null ? "Edit Address" : "New Address"}</h3>

          <button
            onClick={useCurrentLocation}
            style={{
              background: "#34a853",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            📍 Use My Current Location
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
            <input name="phone" placeholder="Mobile Number" value={form.phone} onChange={handleChange} />
            <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
            <input name="locality" placeholder="Locality" value={form.locality} onChange={handleChange} />
            <textarea
              name="address"
              placeholder="Address (Area and Street)"
              value={form.address}
              onChange={handleChange}
            />
            <input name="city" placeholder="City / Town" value={form.city} onChange={handleChange} />
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
            <input name="landmark" placeholder="Landmark (Optional)" value={form.landmark} onChange={handleChange} />

            <div>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Home"
                  checked={form.type === "Home"}
                  onChange={handleChange}
                />
                Home
              </label>
              <label style={{ marginLeft: "15px" }}>
                <input
                  type="radio"
                  name="type"
                  value="Work"
                  checked={form.type === "Work"}
                  onChange={handleChange}
                />
                Work
              </label>
            </div>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={handleSave}
                style={{
                  background: "#1a73e8",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                {editingIndex !== null ? "Update Address" : "Save Address"}
              </button>
              <button
                onClick={resetForm}
                style={{
                  background: "#ccc",
                  color: "#000",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Addresses */}
      <h3>Saved Addresses</h3>
      {addresses.length === 0 && <p>No saved addresses yet.</p>}

      {addresses.map((addr, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <b>{addr.type}</b> — {addr.name} ({addr.phone})
          <br />
          {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
          {addr.landmark && <div>Landmark: {addr.landmark}</div>}
          <div style={{ marginTop: "8px" }}>
            <button onClick={() => handleEdit(i)}>✏️ Edit</button>
            <button
              onClick={() => handleDelete(i)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressManager;