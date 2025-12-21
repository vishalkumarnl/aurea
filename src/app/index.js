// import logo from './logo.svg';
import Header from "screens/header";
import Footer from "screens/footer";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "screens/about";
import Home from "screens/home";
import Cart from "screens/cart";
import AuthForm from "screens/login";
import ProductDetails from "screens/productDetail";
import Checkout from "screens/checkout";
import PaymentPage from "screens/checkout/PaymentPage";
import { useDispatch } from "react-redux";
import { setProductColors, setProductSize } from "store/productSlice";
import { ItemsProvider } from "context/itemsContext";
import Profile from "screens/profile";
import LoginModal from "screens/login/LoginModal";
import { AuthProvider } from "context/authContext";
import ProtectedRoute from "context/protectedRoute";
import ReviewForm from "components/ReviewForm";
import OrderDetailsPage from "screens/orders/OrderDetails";
import OrderHistory from "screens/orders/OrderHistory";
import api from "api/axios";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
    // Check login when app loads

  useEffect(() => {
    api.get(`/sizes`)
      .then((res) => {
        dispatch(setProductSize(res?.data));
      });
    api.get(`/colors`)
      .then((res) => {
        dispatch(setProductColors(res?.data));
      });
  });
  return (
    <ItemsProvider>
    <AuthProvider>
    
      <Router>
        <Header setShowLogin={setShowLogin} />
        <div style={{ height: "95%", paddingTop: "60px" }}>
          {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signIn" element={<AuthForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/payment" element={<PaymentPage />} />
            <Route path="/orders" element={<ProtectedRoute setShowLogin={setShowLogin}><OrderHistory /></ProtectedRoute>} />
            <Route path="/productDetail" element={<ProductDetails />} />
            <Route path="/profile" element={<ProtectedRoute setShowLogin={setShowLogin}><Profile /></ProtectedRoute>} />
            <Route path="/review" element={<ReviewForm />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </AuthProvider>
    </ItemsProvider>
  );
}

export default App;
