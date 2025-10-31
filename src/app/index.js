// import logo from './logo.svg';
import Header from 'screens/header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "screens/about";
import Home from "screens/home";
import Cart from "screens/cart";
import AuthForm from 'screens/login';
import ProductDetails from 'screens/productDetail';

function App() {
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
