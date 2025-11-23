import React, { useContext } from "react";
import "../index.css";
import { AuthContext } from "context/authContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  return (
    <main className="content">
      <div className="section-title">
        <h2>Personal Information</h2>
        <span className="edit-btn">Edit</span>
      </div>

      <div className="input-row">
        <input type="text" value={user?.name}/>
      </div>

      <p className="label">Your Gender</p>
      <div className="radio-row">
        <label>
          <input type="radio" /> Male
        </label>
        <label>
          <input type="radio" /> Female
        </label>
      </div>

      <div className="section-title small-top">
        <h3>Email Address</h3>
        <span className="edit-btn">Edit</span>
      </div>
      <input className="full-input" type="text" value={user.email}/>

      <div className="section-title small-top">
        <h3>Mobile Number</h3>
        <span className="edit-btn">Edit</span>
      </div>
      <input className="full-input" type="text" value={user.mobile} />

      <h3 className="faq-title">FAQs</h3>

      <div className="faq-block">
        <p className="faq-question">
          What happens when I update my email address (or mobile number)?
        </p>
        <p className="faq-answer">
          Your login email id (or mobile number) changes, likewise. You'll
          receive all your account related communication on your updated email
          address (or mobile number).
        </p>
      </div>

      <div className="faq-block">
        <p className="faq-question">
          When will my Aurea account be updated with the new email address?
        </p>
        <p className="faq-answer">
          It happens as soon as you confirm the verification code sent to your
          email (or mobile) and save the changes.
        </p>
      </div>

      <div className="faq-block">
        <p className="faq-question">
          What happens to my existing Aurea account when I update my email?
        </p>
        <p className="faq-answer">
          Updating your email address (or mobile number) doesn't invalidate your
          account. Your account remains fully functional. You'll continue seeing
          your Order history, saved information and personal details.
        </p>
      </div>
    </main>
  );
}
