import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ItemsContext = createContext();

const CHANNEL_NAME = "shared_items_channel";
const STORAGE_CART_KEY = "my_items";

export function ItemsProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem(STORAGE_CART_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const channelRef = useRef(null);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === "SYNC_ITEMS") {
        setCartItems(payload);
        localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(payload));
      }
    };

    return () => channel.close();
  }, []);

  const addCartItem = (item, quantity = 1) => {
    const date = new Date().toISOString();

    // Check if the product already exists in the cart
    const existingItem = cartItems.find((e) => e.variant_id === item.variant_id);

    let newList;

    if (existingItem) {
      newList = cartItems.map((e) =>
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

      newList = [...cartItems, newItem];
    }

    // ✅ Update state and localStorage
    setCartItems(newList);
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(newList));

    // ✅ Notify other tabs
    channelRef.current.postMessage({ type: "SYNC_ITEMS", payload: newList });
  };

  const removeCartProduct = (variant_id) => {
    const index = cartItems.findIndex((item) => item.variant_id === variant_id);

    if (index !== -1) {
      cartItems.splice(index, 1); // Remove element at that index
    }
     setCartItems(cartItems);
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartItems));

    // ✅ Notify other tabs
    channelRef.current.postMessage({ type: "SYNC_ITEMS", payload: cartItems });
  };


  const clearCartProduct = () => {
    // Clear only the cart key (don't wipe all local storage)
    const empty = [];
    setCartItems(empty);
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(empty));

    // ✅ Notify other tabs
    channelRef.current.postMessage({ type: "SYNC_ITEMS", payload: empty });
  };

  

  const getCartItems = () => {
    return cartItems;
  };
  return (
    <ItemsContext.Provider value={{ cartItems, addCartItem, getCartItems, removeCartProduct, clearCartProduct }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}
