import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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

  const addItem = (item, quantity = 1) => {
    const date = new Date().toISOString();

    // Check if the product already exists in the cart
    const existingItem = items.find((e) => e.variant_id === item.variant_id);

    let newList;

    if (existingItem) {
      newList = items.map((e) =>
        e.variant_id === item.variant_id
          ? { ...e, quantity: e.quantity + quantity, date }
          : e
      );
    } else {
      const newItem = {
        ...item,
        date,
        size: item.size_id,
        selected: false,
        quantity: 1,
      };

      newList = [...items, newItem];
    }

    // ✅ Update state and localStorage
    setItems(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

    // ✅ Notify other tabs
    channelRef.current.postMessage({ type: "SYNC_ITEMS", payload: newList });
  };

  const removeProduct = (variant_id) => {
    const index = items.findIndex((item) => item.variant_id === variant_id);

    if (index !== -1) {
      items.splice(index, 1); // Remove element at that index
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    // ✅ Notify other tabs
    channelRef.current.postMessage({ type: "SYNC_ITEMS", payload: items });
  };

  const getItems = () => {
    return localStorage.getItem(STORAGE_KEY);
  };
  return (
    <ItemsContext.Provider value={{ items, addItem, getItems, removeProduct }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}
