import React from "react";

const CartFilter = ({ filter, setFilter, search, setSearch }) =>{
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Search your items"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 1,
          minWidth: "200px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="All">All</option>
        <option value="Delivered">Delivered</option>
        <option value="Shipped">Shipped</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
}
export default CartFilter;
