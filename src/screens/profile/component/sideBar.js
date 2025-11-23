import React, { useContext } from "react";
import "./sideBar.css";
import {
  FiUser,
  FiMapPin,
  FiCreditCard,
  FiGift,
  FiSmartphone,
  FiTag,
  FiStar,
  FiBell,
  FiHeart,
  FiPackage,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/authContext";

export default function SideBar({section, setSection}) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      {/* USER HEADER */}
      <div className="user-header">
        <div className="avatar"></div>
        <div className="user-info">
          <p className="greet">Hello,</p>
          <p className="username">{user.name}</p>
        </div>
      </div>

      {/* MY ORDERS */}
      <button className="sidebar-section"  onClick={() => navigate("/orders")}>
        <h4>MY ORDERS</h4>
        <p>
          <FiPackage className="icon" /> My Orders
        </p>
      </button>

      {/* ACCOUNT SETTINGS */}
      <div className="sidebar-section">
        <h4>ACCOUNT SETTINGS</h4>
        <button className={section ==="profile" ? "active": ""} onClick={() => {setSection("profile")}}>
          <FiUser className="icon" /> Profile Information
        </button>
        <button className={section ==="address" ? "active": ""} onClick={() => {setSection("address")}}>
          <FiMapPin className="icon" /> Manage Addresses
        </button>
        <p>
          <FiCreditCard className="icon" /> PAN Card Information
        </p>
      </div>

      {/* PAYMENTS */}
      <div className="sidebar-section">
        <h4>PAYMENTS</h4>
        <p>
          <FiGift className="icon" /> Gift Cards{" "}
          <span className="green">₹0</span>
        </p>
        <p>
          <FiSmartphone className="icon" /> Saved UPI
        </p>
        <p>
          <FiCreditCard className="icon" /> Saved Cards
        </p>
      </div>

      {/* MY STUFF */}
      <div className="sidebar-section">
        <h4>MY STUFF</h4>
        <p>
          <FiTag className="icon" /> My Coupons
        </p>
        <p>
          <FiStar className="icon" /> My Reviews & Ratings
        </p>
        <p>
          <FiBell className="icon" /> All Notifications
        </p>
        <p>
          <FiHeart className="icon" /> My Wishlist
        </p>
      </div>

      {/* LOGOUT */}
      <div className="logout">
        <FiLogOut className="icon" /> Logout
      </div>
    </aside>
  );
}
