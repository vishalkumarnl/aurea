import React, { useState } from 'react';
import '../AuthForm.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = ({mobile, setMobile, isLogin, setIsLogin, sendOtp, loginUser}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");


  return (
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
                    disabled={
                      mobile.length !== 10 || (isLogin && password.length < 3)
                    }
                    onClick={isLogin ? () => loginUser({password}) : sendOtp}
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
   
  );
};

export default Login;