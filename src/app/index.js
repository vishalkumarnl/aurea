// import logo from './logo.svg';
import Header from 'screens/header';
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
import "./app.css"; // Importing CSS file for styles
import { ItemsProvider } from "context/itemsContext";


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
      </Routes>
      {/* Footer Section */}
      {/* <footer style={{"background": "#222",color: "white",padding: "15px 0"}}>Footer at bottom</footer> */}
      
      <img src="/images/footer1.png" className='imgP'></img>
       <img src="/images/footer.png" className='imgP'></img>
    </Router>
    </div>
    </ItemsProvider>
  );
}

export default App;
