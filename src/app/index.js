// import logo from './logo.svg';
import Header from 'screens/header';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "screens/about";
import Home from "screens/home";
import Cart from "screens/cart";
import AuthForm from 'screens/login';
import ProductDetails from 'screens/productDetail';
import { useDispatch } from "react-redux";
import { setProductColors, setProductSize } from 'store/productSlice';

function App() {
const dispatch = useDispatch();
  useEffect(() => {
      fetch(`http://localhost:8080/sizes`).then(res => res.json()).then(data => {
        dispatch(setProductSize(data));
      });
      fetch(`http://localhost:8080/colors`).then(res => res.json()).then(data => {
        dispatch(setProductColors(data));;
      });
    }, []);
  return (
    <div>
      <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signIn" element={<AuthForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productDetail" element={<ProductDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
