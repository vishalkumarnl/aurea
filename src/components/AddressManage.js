import React, { useState, useEffect } from "react";

const STORAGE_KEY = "user_addresses";

const AddressManager = () => {
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    altPhone: "",
    type: "Home",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Use current location and reverse geocode
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
          );
          const data = await response.json();

          const address = data.address || {};
          setForm((prev) => ({
            ...prev,
            address: data.display_name || "",
            city:
              address.city ||
              address.town ||
              address.village ||
              address.county ||
              "",
            state: address.state || "",
            pincode: address.postcode || "",
            locality: address.suburb || address.neighbourhood || "",
          }));
        } catch (err) {
          console.error(err);
          alert("Unable to fetch address details.");
        }
      },
      (error) => {
        console.error(error);
        alert("Unable to get your location.");
      }
    );
  };

  // ✅ Save address
  const handleSave = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill in required fields.");
      return;
    }

    const updated = [...addresses, form];
    setAddresses(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setForm({
      name: "",
      phone: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      landmark: "",
      altPhone: "",
      type: "Home",
    });
  };

  // ✅ Delete address
  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h3>Add a New Address</h3>

      <button
        onClick={handleUseCurrentLocation}
        style={{
          background: "#e6f2ff",
          border: "1px solid #007bff",
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "15px",
          cursor: "pointer",
        }}
      >
        📍 Use My Current Location
      </button>

      <div className="form">
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
          />
          <input
            name="locality"
            placeholder="Locality"
            value={form.locality}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="address"
          placeholder="Address (Area and Street)"
          value={form.address}
          onChange={handleChange}
          rows="2"
          style={{ width: "100%", marginTop: "10px" }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            name="city"
            placeholder="City/District/Town"
            value={form.city}
            onChange={handleChange}
          />
          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            name="landmark"
            placeholder="Landmark (Optional)"
            value={form.landmark}
            onChange={handleChange}
          />
          <input
            name="altPhone"
            placeholder="Alternate Phone (Optional)"
            value={form.altPhone}
            onChange={handleChange}
          />
        </div>

        <div style={{ margin: "10px 0" }}>
          <label>
            <input
              type="radio"
              name="type"
              value="Home"
              checked={form.type === "Home"}
              onChange={handleChange}
            />{" "}
            Home
          </label>{" "}
          <label>
            <input
              type="radio"
              name="type"
              value="Work"
              checked={form.type === "Work"}
              onChange={handleChange}
            />{" "}
            Work
          </label>
        </div>

        <button
          onClick={handleSave}
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
            marginRight: "10px",
          }}
        >
          Save
        </button>
        <button
          onClick={() =>
            setForm({
              name: "",
              phone: "",
              pincode: "",
              locality: "",
              address: "",
              city: "",
              state: "",
              landmark: "",
              altPhone: "",
              type: "Home",
            })
          }
          style={{
            background: "#ddd",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
          }}
        >
          Cancel
        </button>
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h4>Saved Addresses</h4>
      {addresses.length === 0 ? (
        <p>No addresses saved yet.</p>
      ) : (
        addresses.map((addr, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{addr.type.toUpperCase()}</div>
            <div>
              {addr.name} — {addr.phone}
            </div>
            <div>
              {addr.address}, {addr.city}, {addr.state} — {addr.pincode}
            </div>
            <button
              onClick={() => handleDelete(index)}
              style={{
                marginTop: "8px",
                background: "transparent",
                border: "1px solid red",
                color: "red",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AddressManager;
