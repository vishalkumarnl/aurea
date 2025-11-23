import React, { useState } from "react";
import OrderHistory from "components/OrderHistory";
import OrderDetails from "components/OrderDetails";

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial" }}>
      {!selectedOrder ? (
        <OrderHistory onSelectOrder={setSelectedOrder} />
      ) : (
        <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
