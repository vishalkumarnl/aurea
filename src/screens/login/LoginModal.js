import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./modal.css";
import { useNavigate } from "react-router-dom";
import OTPInput from "./otpInput";
import {isMobile} from "utils/index"

const LoginModal = ({ onClose }) => {
  const [step, setStep] = useState("login"); // login | otp
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIregister] = useState(true);
  const navigate = useNavigate();

  const handleRequestOtp = () => {
    // if (mobile.length === 10) {
    setStep("otp");
    // }
  };
  const isMobileSys = isMobile();

  const handleHomePage = () => {
    onClose();
    navigate("/");
  };
  const verifYOtp = () => {
    setStep("register");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* LEFT PANE */}
        {!isMobileSys &&<div className="left-pane">
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
        </div>}

        {/* RIGHT PANE */}
        <div className="right-pane">
          {step === "login" && (
            <>
              <input
                type="text"
                maxLength={10}
                pattern="\d{10}"
                value={mobile}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    // allow only numbers
                    setMobile(val);
                  }
                }}
                className="input-box"
                placeholder="Enter mobile number"
              />
              {isLogin && (
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="input-box"
                  />

                  {/* Eye icon inside input */}
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "0px",
                      top: "38%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#555",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              )}

              <button
                className="primary-btn"
                onClick={isLogin ? handleHomePage : handleRequestOtp}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <span
                  className="toggle-link"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </span>
              </p>
            </>
          )}

          {step === "otp" && (
            <>
              <p className="otp-info">
                Please enter the OTP sent to <strong>{mobile}</strong>
              </p>

              {/* <div className="otp-boxes">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input key={i} maxLength="1" className="otp-input" />
                ))}
              </div> */}
              <OTPInput></OTPInput>

              <button className="primary-btn" onClick={verifYOtp}>
                Verify
              </button>

              <p className="resend">
                Not received the code? <span>Resend</span>
              </p>
            </>
          )}

          {step === "register" && (
            <>
              <p className="otp-info">namae</p>

              <div className="otp-boxes">password</div>

              <button className="primary-btn">Register</button>
              <p>
                {isRegister
                  ? "Already have an account?"
                  : "Already have an account?"}{" "}
                <span
                  className="toggle-link"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isRegister ? "Login" : "Sign Up"}
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
