import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowWidth from "components/useWindowWidth";
import { getFirstImage } from "utils";
import { FaCreditCard, FaMobileAlt, FaUniversity, FaMoneyBillWave, FaCheck } from "react-icons/fa";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;

  const navState = location.state || {};
  const items = navState.selectedItems || [];
  const shipping = navState.shipping || { name: "", address: "", city: "", phone: "" };
  const subtotal = navState.subtotal || 0;
  const shippingFee = navState.shippingFee || 40;
  const total = navState.total || subtotal + shippingFee;

  const paymentMethods = [
    { id: "card", label: "Credit/Debit Card", Icon: FaCreditCard, subtitle: "Visa, MasterCard, RuPay - secure" },
    { id: "upi", label: "UPI", Icon: FaMobileAlt, subtitle: "Pay instantly using UPI ID/QR" },
    { id: "netbanking", label: "Netbanking", Icon: FaUniversity, subtitle: "Fast online bank transfers" },
    { id: "cod", label: "Cash on Delivery", Icon: FaMoneyBillWave, subtitle: "Pay on delivery" },
  ];
  const [method, setMethod] = useState(paymentMethods[0].id);

  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");

  if (!items || items.length === 0) {
    return (
      <div style={{ padding: 30 }}>
        <h3>No order details found</h3>
        <p>Please go back to checkout to place an order.</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  const handleConfirmPayment = () => {
    // basic validation
    if (!shipping.name || !shipping.address) {
      alert("Shipping details missing. Please go back and select a shipping address.");
      return;
    }

    if (method === "card") {
      if (!card.number || !card.name || !card.expiry || !card.cvv) {
        alert("Please fill card details");
        return;
      }
    }

    if (method === "upi") {
      if (!upiId) {
        alert("Please enter UPI ID");
        return;
      }
    }

    // Create an order object and persist to localStorage so OrderHistory can show it later
    const order = {
      id: `ORD-${Date.now()}`,
      datePlaced: new Date().toLocaleDateString(),
      items: items,
      shipping,
      paymentMethod: method,
      subtotal,
      shippingFee,
      total,
    };

    try {
      const raw = localStorage.getItem("aurea_orders");
      const existing = raw ? JSON.parse(raw) : [];
      existing.unshift(order);
      localStorage.setItem("aurea_orders", JSON.stringify(existing));
    } catch (e) {
      console.error("Failed to save order", e);
    }

    // Simulate network/payment processing
    alert(`Payment confirmed. Charged ₹${total.toLocaleString()}. Order #${order.id}`);

    // Navigate to orders page (optionally pass order in state)
    navigate("/orders", { state: { order } });
  };

  const container = {
    maxWidth: 900,
    margin: "0 auto",
    padding: isMobile ? 10 : 20,
    fontFamily: "Amazon Ember, Arial, sans-serif",
    color: "#111",
  };

  const section = { border: "1px solid #d5d9d9", borderRadius: 8, padding: 14, marginBottom: 14, background: "#fff" };

  return (
    <div style={container}>
      <h2>Confirm Payment</h2>

      <div style={section}>
        <div style={{ fontSize: 14, color: "#565959" }}>Shipping To</div>
        <div style={{ marginTop: 8 }}>
          <div style={{ fontWeight: 700 }}>{shipping.name}</div>
          <div style={{ fontSize: 13, color: "#565959" }}>{shipping.address}</div>
          <div style={{ fontSize: 13, color: "#565959" }}>{shipping.city}</div>
          <div style={{ fontSize: 13, color: "#565959" }}>📞 {shipping.phone}</div>
        </div>
        <div style={{ marginTop: 8 }}>
          <button onClick={() => navigate(-1)} style={{ marginRight: 8 }}>Change</button>
        </div>
      </div>

      <div style={section}>
        <div style={{ fontSize: 14, color: "#565959" }}>Order Summary</div>
        <div style={{ marginTop: 8 }}>
          {items.map((it) => (
            <div key={it.variant_id || it.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
              <img src={getFirstImage(it.images)} alt={it.name || ""} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, marginRight: 12 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{it.name}</div>
                <div style={{ color: "#565959", fontSize: 13 }}>{it.quantity} × ₹{it.price}</div>
              </div>
              <div style={{ fontWeight: 700 }}>₹{(it.quantity * it.price).toLocaleString()}</div>
            </div>
          ))} 
        </div>

        <div style={{ borderTop: "1px solid #eee", paddingTop: 8, marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div>Subtotal</div>
            <div>₹{subtotal.toLocaleString()}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div>Shipping</div>
            <div>₹{shippingFee}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
            <div>Total</div>
            <div>₹{total.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div style={section}>
        <div style={{ fontSize: 14, color: "#565959", marginBottom: 8 }}>Choose Payment Method</div>
        <div className="paymentOptions" role="radiogroup" aria-label="Payment methods">
          {paymentMethods.map((m) => (
            <div
              key={m.id}
              className={`paymentMethodCard ${method === m.id ? 'selected' : ''}`}
              role="radio"
              aria-checked={method === m.id}
              tabIndex={0}
              onClick={() => setMethod(m.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setMethod(m.id); }}
            >
              <div className="pmIcon"><m.Icon size={18} /></div>
              <div className="pmDetails">
                <div className="pmTitle">{m.label}</div>
                <div className="pmSubtitle">{m.subtitle}</div>
              </div>
              <div className="pmCheck">{method === m.id ? <FaCheck /> : null}</div>
            </div>
          ))}
        </div> 

        {method === "card" && (
          <div className="paymentForm" style={{ marginTop: 8 }}>
            <label>
              Card number
              <input
                aria-label="Card number"
                placeholder="0000 0000 0000 0000"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
              />
            </label>

            <label>
              Card holder name
              <input
                aria-label="Card holder name"
                placeholder="Name as on card"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />
            </label>

            <div className="paymentRow">
              <label>
                Expiry
                <input
                  aria-label="Expiry"
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                />
              </label>

              <label>
                CVV
                <input
                  aria-label="CVV"
                  placeholder="123"
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                />
              </label>
            </div>
          </div>
        )}

        {method === "upi" && (
          <div className="paymentForm" style={{ marginTop: 8 }}>
            <label>
              UPI ID
              <input
                aria-label="UPI ID"
                placeholder="you@bank or yourid@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </label>
            <div style={{ marginTop: 6 }}>
              <button className="smallBtn" onClick={() => alert('Show QR to scan (stub)')}>Show QR</button>
            </div>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <button style={{ background: "var(--brand-green)", color: "#fff", padding: "10px 14px", borderRadius: 6 }} onClick={handleConfirmPayment}>Confirm and Pay ₹{total.toLocaleString()}</button>
          <button style={{ marginLeft: 8 }} onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
