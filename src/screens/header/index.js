// Header.js
import React from "react";
import "./Header.css"; // We'll define styles here
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/">
        <div className="header__logo">
          <img
            src="./images/aurea_logo.png"
            height={42}
            width={42}
            alt="Aurea Logo"
          />
        </div>
      </Link>

      {/* Search Bar */}
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <FaSearch className="header__searchIcon" />
      </div>

      {/* Navigation Links */}
      <div className="header__nav">
        <button
          style={{
            background: "transparent",
            "padding-inline": "0px",
            "border-width": "0px",
          }}
          onClick={() => navigate("/signIn")}
        >
          <div className="header__option">
            <span className="header__optionLineOne">Hello, Sign in</span>
            <span className="header__optionLineTwo">Account & Lists</span>
          </div>
        </button>
        <button
          style={{
            background: "transparent",
            "padding-inline": "0px",
            "border-width": "0px",
          }}
          onClick={() => navigate("/orders")}
        >
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </button>

        <button
          style={{
            background: "transparent",
            "padding-inline": "0px",
            "border-width": "0px",
          }}
          onClick={() => navigate("/cart")}
        >
          <div className="header__optionCart">
            <FaShoppingCart />
            <span className="header__optionLineTwo header__cartCount">0</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
