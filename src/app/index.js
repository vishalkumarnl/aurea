// import logo from './logo.svg';
import Header from "screens/header";
import Footer from "screens/footer";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "screens/about";
import Home from "screens/home";
import Cart from "screens/cart";
import AuthForm from "screens/login";
import Orders from "screens/orders";
import ProductDetails from "screens/productDetail";
import { useDispatch } from "react-redux";
import { setProductColors, setProductSize } from "store/productSlice";
import { ItemsProvider } from "context/itemsContext";
import Profile from "screens/profile";
import LoginModal from "screens/login/LoginModal";
import api from "api/axios";
import { AuthProvider } from "context/authContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
    // Check login when app loads

  useEffect(() => {
    fetch(`http://localhost:8080/sizes`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProductSize(data));
      });
    fetch(`http://localhost:8080/colors`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProductColors(data));
      });
  });
  return (
    <AuthProvider>
    <ItemsProvider>
      <Router>
        <Header setShowLogin={setShowLogin} />
        <div style={{ height: "95%", paddingTop: "60px" }}>
          {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signIn" element={<AuthForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/productDetail" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </ItemsProvider>
    </AuthProvider>
  );
}

export default App;
