import React, { useState } from "react";
import { FaUserCircle, FaGift, FaBell, FaPowerOff } from "react-icons/fa";
import { MdFlashOn, MdCardGiftcard } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BsTicketPerforated, BsBag } from "react-icons/bs";
import "./MenuDropdown.css";
import { useNavigate } from "react-router-dom";

const MenuDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="menu-container"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="menu-button">
        Kumari <span className="arrow">▼</span>
      </div>

      {open && (
        <div className="dropdown-box">
          <div className="menu-item" onClick={()=> navigate("/profile")}>
            <FaUserCircle /> My Profile
          </div>

          <div className="menu-item">
            <MdFlashOn /> SuperCoin Zone
          </div>

          <div className="menu-item">
            <MdCardGiftcard /> Aurea Plus Zone
          </div>

          <div className="menu-item">
            <BsBag /> Orders
          </div>

          <div className="menu-item wishlist-row">
            <AiFillHeart /> Wishlist
            <span className="wishlist-count">121</span>
          </div>

          <div className="menu-item">
            <BsTicketPerforated /> Coupons
          </div>

          <div className="menu-item">
            <FaGift /> Gift Cards
          </div>

          <div className="menu-item">
            <FaBell /> Notifications
          </div>

          <div className="menu-item logout">
            <FaPowerOff /> Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
