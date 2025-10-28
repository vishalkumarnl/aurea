// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import OrdersPage from "./OrdersPage";
import AuthForm from './components/AuthForm';

function App() {
  return (
    <div className="App">
      <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signIn" element={<AuthForm />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
