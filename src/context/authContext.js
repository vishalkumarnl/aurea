import { createContext, useState, useEffect } from "react";
import api from "api/axios";
import { useItems } from "context/itemsContext";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  loginUser,
  logoutUser,
  addLocalToRemoteCart,
} from "../redux/actionCreators";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userData?.user);

  const [loading, setLoading] = useState(true);
  const { getCartItems, clearCartProduct } = useItems();

  // Check login when app loads
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const addLocalCartToRemoteCart = () => {
    const items = getCartItems() || [];
    if (items.length === 0) return;

    dispatch(addLocalToRemoteCart({ items }));
    clearCartProduct();
  };

  const login = ({ email, mobile, password }) => {
    dispatch(loginUser({ email, mobile, password, addLocalCartToRemoteCart }));
  };

  const logout = () => {
    dispatch(logoutUser());
    // Clear local cart when logging out to keep header in sync without reload
    clearCartProduct();
  };

  return (
    <AuthContext.Provider value={{ user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
