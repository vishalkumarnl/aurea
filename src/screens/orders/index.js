import React, { useState } from "react";
import OrderCard from "./OrderCard";
import OrderFilter from "./OrderFilter";
import { useItems } from "context/itemsContext";

const Orders=() =>{

  const {items} =useItems();
  const [orders, setOrders] = useState(items || []);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");



  // ✅ Filter and search logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = filter === "All" || order.status === filter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h2>Your Orders</h2>

      <OrderFilter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />


      {/* 🧩 Order Cards */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
export default Orders;