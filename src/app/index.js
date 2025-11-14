// import logo from './logo.svg';
import Header from 'screens/header';
import Footer from 'screens/footer';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "screens/about";
import Home from "screens/home";
import Cart from "screens/cart";
import AuthForm from 'screens/login';
import Orders from 'screens/orders';
import ProductDetails from 'screens/productDetail';
import { useDispatch } from "react-redux";
import { setProductColors, setProductSize } from 'store/productSlice';
import { ItemsProvider } from "context/itemsContext";
import Profile from 'screens/profile';

function App() {
const dispatch = useDispatch();
  useEffect(() => {
      fetch(`http://localhost:8080/sizes`).then(res => res.json()).then(data => {
        dispatch(setProductSize(data));
      });
      fetch(`http://localhost:8080/colors`).then(res => res.json()).then(data => {
        dispatch(setProductColors(data));;
      });
    });
  return (<ItemsProvider>
            <div style={{height: "95%"}}>

      <Router>
      <Header></Header>
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
    </Router>
    </div>
    </ItemsProvider>
  );
}

export default App;
