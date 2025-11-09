// // import React, { useState, useEffect } from "react";

// // const STORAGE_KEY = "my_items";

// // function Orders() {
// //   const [items, setItems] = useState(() => {
// //     // Initialize from localStorage if available
// //     const stored = localStorage.getItem(STORAGE_KEY);
// //     return stored ? JSON.parse(stored) : [];
// //   });

// //   // Add a new item
// //   const addItem = () => {
// //     const newItem = `Item ${Date.now()}`;
// //     const newList = [...items, newItem];
// //     setItems(newList);
// //     localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
// //   };

// //   // Listen for updates from other tabs
// //   useEffect(() => {
// //     const handleStorageChange = (event) => {
// //       if (event.key === STORAGE_KEY) {
// //         const newData = event.newValue ? JSON.parse(event.newValue) : [];
// //         setItems(newData);
// //       }
// //     };
// //     window.addEventListener("storage", handleStorageChange);
// //     return () => window.removeEventListener("storage", handleStorageChange);
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Shared Items (Across Tabs)</h2>
// //       <button onClick={addItem}>Add Item</button>
// //       <ul>
// //         {items.map((item, idx) => (
// //           <li key={idx}>{item}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default Orders;

// import React, { useState, useEffect, useRef } from "react";

// const CHANNEL_NAME = "shared_items_channel";
// const STORAGE_KEY = "my_items";

// function Orders() {
//   const [items, setItems] = useState(() => {
//     const stored = localStorage.getItem(STORAGE_KEY);
//     return stored ? JSON.parse(stored) : [];
//   });

//   const channelRef = useRef(null);

//   useEffect(() => {
//     // Create channel
//     const channel = new BroadcastChannel(CHANNEL_NAME);
//     channelRef.current = channel;

//     // Listen for messages from other tabs
//     channel.onmessage = (event) => {
//       const { type, payload } = event.data;

//       if (type === "SYNC_ITEMS") {
//         setItems(payload);
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
//       }
//     };

//     return () => {
//       channel.close();
//     };
//   }, []);

//   const addItem = () => {
//     const newItem = `Item ${Date.now()}`;
//     const newList = [...items, newItem];
//     setItems(newList);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

//     // Notify other tabs
//     channelRef.current.postMessage({
//       type: "SYNC_ITEMS",
//       payload: newList,
//     });
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Shared Items (Across Tabs)</h2>
//       <button onClick={addItem}>Add Item</button>
//       <ul>
//         {items.map((item, idx) => (
//           <li key={idx}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Orders;

import React from "react";
import { useItems } from "context/itemsContext";

export default function Products() {
  const { items, addItem } = useItems(); 

  return (
    <div>
      <h2>Order Page</h2>
      <button onClick={() => addItem(`Item ${Date.now()}`)}>
        Add Product
      </button>

      <p>Total items: {items.length}</p>
    </div>
  );
}