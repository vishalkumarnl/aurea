import React, { useContext, useState } from "react";
import "./modal.css";
import { useNavigate } from "react-router-dom";
import api from "api/axios";
import Login from "./component/login";
import OtpVerification from "./component/otpVerification";
import UserRegistration from "./component/userRegistration";
import { AuthContext } from "context/authContext";


const LoginModal = ({ onClose }) => {
  const [step, setStep] = useState("login"); // login | otp
  const [mobile, setMobile] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login} = useContext(AuthContext);
  
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();


  const isValidMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const sendOtp = async () => {
     if (!isValidMobile(mobile)) {
      console.log("Please enter a valid 10-digit mobile number.");
      return;
    }
    setStep("otp");
    try {
      const res = await fetch("http://localhost:8080/requestOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobile,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const verifYOtp = async () => {
    try {
      const res = await fetch("http://localhost:8080/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobile,
          otp,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);
      if (res.ok) {
        setStep("register");
        console.log("OTP verification successful!");
      } else {
        console.log(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  

  const loginUser = async ({email, password,}) => {
    try {
      login( { email, password, mobile });



        onClose();

    } catch (err) {
      console.error("Error:", err);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* LEFT PANE */}
          <div className="left-pane">
            <h2>{isLogin ? "Login" : "Looks like you're new here!"}</h2>
            <p>
              {isLogin
                ? "Get access to your Orders, Wishlist and Recommendations"
                : "Sign up with your mobile number to get started"}
            </p>
            <img
              src="/images/loginImg.png"
              alt="illustration"
              className="side-image"
            />
          </div>

        {/* RIGHT PANE */}
        <div className="right-pane">
          {step === "login" && (
            <Login mobile={mobile} setMobile={setMobile} isLogin={isLogin} setIsLogin={setIsLogin} sendOtp={sendOtp} loginUser={loginUser}></Login>
          )}

          {step === "otp" && (
            <OtpVerification mobile={mobile} setOtp={setOtp} verifYOtp={verifYOtp}></OtpVerification>
          )}

          {step === "register" && (
           <UserRegistration mobile={mobile} setIsLogin={setIsLogin} loginUser={loginUser}></UserRegistration>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
