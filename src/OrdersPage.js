import React, { useState } from "react";
import OrderCard from "./components/OrderCard";
import OrderFilter from "./components/OrderFilter";

const dummyOrders = [
  {
    id: 1,
    productName: "Apple iPhone 15",
    date: "2025-10-20",
    price: 89999,
    status: "Delivered",
    image: "https://via.placeholder.com/120",
  },
  {
    id: 2,
    productName: "Samsung Galaxy S24 Ultra",
    date: "2025-09-15",
    price: 129999,
    status: "Shipped",
    image: "https://via.placeholder.com/120",
  },
  {
    id: 3,
    productName: "Sony WH-1000XM5 Headphones",
    date: "2025-08-10",
    price: 29999,
    status: "Cancelled",
    image: "https://via.placeholder.com/120",
  },
];

const OrdersPage= () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredOrders = dummyOrders.filter((order) => {
    const matchesSearch = order.productName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = filter === "All" || order.status === filter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f5f5" }}>
      <h2>Your Orders</h2>
      <OrderFilter filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
      <div style={{ marginTop: "20px" }}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}
export default OrdersPage;
