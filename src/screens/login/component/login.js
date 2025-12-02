import React, { useState } from "react";
import "../AuthForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({
  mobile,
  setMobile,
  isLogin,
  setIsLogin,
  sendOtp,
  loginUser,
  isForgotPassword,
  setIsForgotPassword
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const isValidMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const onButtonClick = () => {
    if (!isValidMobile(mobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }
    if (isLogin && password.length < 3) {
      setErrorPassword("Please enter valid password");
      return;
    }
    isLogin ? loginUser({ password }) : sendOtp();
  };

  const onForgotPassword = () => {
    setIsForgotPassword(true);
    setIsLogin(false);
  }

  const onContextSwitch = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
  }

  return (
    <>
      <input
        type="text"
        maxLength={10}
        pattern="\d{10}"
        value={mobile}
        onChange={(e) => {
          const val = e.target.value;
          setError("");
          if (/^\d*$/.test(val)) {
            // allow only numbers
            setMobile(val);
          }
        }}
        className="input-box"
        placeholder="Enter mobile number"
      />
      {error && <p style={{ color: "red", marginTop: 4 }}>{error}</p>}

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
          {errorPassword && <p style={{ color: "red", marginTop: 4 }}>{errorPassword}</p>}
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
        disabled={false}
        onClick={onButtonClick}
      >
        {isForgotPassword ? "Reset Password" : isLogin ? "Login" : "Sign Up"}
      </button>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="toggle-link" onClick={() => onContextSwitch()}>
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
      {!isForgotPassword && (<p>
        <span className="toggle-link" onClick={() => onForgotPassword()}>
          {"Forgot Password?"}
        </span>
      </p>)}
    </>
  );
};

export default Login;
