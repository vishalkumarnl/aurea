// Header.js
import React from "react";
import "./Header.css"; // We'll define styles here
import { FaShoppingCart, FaSearch } from "react-icons/fa";



const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </div>

      {/* Search Bar */}
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <FaSearch className="header__searchIcon" />
      </div>

      {/* Navigation Links */}
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello, Sign in</span>

          <span className="header__optionLineTwo">Account & Lists</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__optionCart">
          <FaShoppingCart />
          <span className="header__optionLineTwo header__cartCount">0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
