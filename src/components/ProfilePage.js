import React from "react";
import "./profile.css";
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
  FiLogOut
} from "react-icons/fi";


export default function ProfilePage() {
  return (
    <div className="page-container">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
  {/* USER HEADER */}
  <div className="user-header">
    <div className="avatar"></div>
    <div className="user-info">
      <p className="greet">Hello,</p>
      <p className="username">Kumari Sanjula</p>
    </div>
  </div>

  {/* MY ORDERS */}
  <div className="sidebar-section">
    <h4>MY ORDERS</h4>
    <p><FiPackage className="icon" /> My Orders</p>
  </div>

  {/* ACCOUNT SETTINGS */}
  <div className="sidebar-section">
    <h4>ACCOUNT SETTINGS</h4>
    <p className="active"><FiUser className="icon" /> Profile Information</p>
    <p><FiMapPin className="icon" /> Manage Addresses</p>
    <p><FiCreditCard className="icon" /> PAN Card Information</p>
  </div>

  {/* PAYMENTS */}
  <div className="sidebar-section">
    <h4>PAYMENTS</h4>
    <p><FiGift className="icon" /> Gift Cards <span className="green">₹0</span></p>
    <p><FiSmartphone className="icon" /> Saved UPI</p>
    <p><FiCreditCard className="icon" /> Saved Cards</p>
  </div>

  {/* MY STUFF */}
  <div className="sidebar-section">
    <h4>MY STUFF</h4>
    <p><FiTag className="icon" /> My Coupons</p>
    <p><FiStar className="icon" /> My Reviews & Ratings</p>
    <p><FiBell className="icon" /> All Notifications</p>
    <p><FiHeart className="icon" /> My Wishlist</p>
  </div>

  {/* LOGOUT */}
  <div className="logout">
    <FiLogOut className="icon" /> Logout
  </div>
</aside>



      {/* RIGHT CONTENT */}
      <main className="content">
        <div className="section-title">
          <h2>Personal Information</h2>
          <span className="edit-btn">Edit</span>
        </div>

        <div className="input-row">
          <input type="text" placeholder="Kumari" />
          <input type="text" placeholder="Sanjula" />
        </div>

        <p className="label">Your Gender</p>
        <div className="radio-row">
          <label><input type="radio" /> Male</label>
          <label><input type="radio" /> Female</label>
        </div>

        <div className="section-title small-top">
          <h3>Email Address</h3>
          <span className="edit-btn">Edit</span>
        </div>
        <input className="full-input" type="text" />

        <div className="section-title small-top">
          <h3>Mobile Number</h3>
          <span className="edit-btn">Edit</span>
        </div>
        <input className="full-input" type="text" placeholder="+919279712075" />

        <h3 className="faq-title">FAQs</h3>

        <div className="faq-block">
          <p className="faq-question">What happens when I update my email address (or mobile number)?</p>
          <p className="faq-answer">
           Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).
          </p>
        </div>

        <div className="faq-block">
          <p className="faq-question">When will my Aurea account be updated with the new email address?</p>
          <p className="faq-answer">
            It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.
          </p>
        </div>

        <div className="faq-block">
          <p className="faq-question">
            What happens to my existing Aurea account when I update my email?
          </p>
          <p className="faq-answer">
            Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.
          </p>
        </div>
      </main>
    </div>
  );
}
