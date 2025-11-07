import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const ItemsContext = createContext();

const CHANNEL_NAME = "shared_items_channel";
const STORAGE_KEY = "my_items";

export function ItemsProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const channelRef = useRef(null);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === "SYNC_ITEMS") {
        setItems(payload);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      }
    };

    return () => channel.close();
  }, []);

  const addItem = (item) => {
    const newList = [...items, item];
    setItems(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

    // Notify other tabs
    channelRef.current.postMessage({ type: "SYNC_ITEMS", payload: newList });
  };

  return (
    <ItemsContext.Provider value={{ items, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}
