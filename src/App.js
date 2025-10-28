// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import OrdersPage from "./OrdersPage";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <OrdersPage />
      <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
