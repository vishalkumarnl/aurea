// Header.js
import React from "react";
import "./Header.css"; // We'll define styles here
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <nav>
        <Link to="/"><div className="header__logo">
          <img
            src="./images/logo.png"
            height={42}
            width={42}
            alt="Aurea Logo"
          />
        </div></Link>
      </nav>


      {/* Search Bar */}
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <FaSearch className="header__searchIcon" />
      </div>

      {/* Navigation Links */}
      <div className="header__nav">
        <div className="header__option">
          <nav>
            <Link to="/signIn"><span className="header__optionLineOne">Hello, Sign in</span></Link>
          </nav>
          <span className="header__optionLineTwo">Account & Lists</span>
        </div>
        <nav>
          <Link to="/orders"><div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div></Link>
        </nav>

        <div className="header__optionCart">
          <FaShoppingCart />
          <span className="header__optionLineTwo header__cartCount">0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
