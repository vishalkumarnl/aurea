import React, { useState } from "react";
import "../AuthForm.css";
import OTPInput from "../otpInput";

const OtpVerification = ({ mobile, setStep, isForgotPassword }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

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
        isForgotPassword ? setStep("reset"): setStep("register");
        console.log("OTP verification successful!");
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <>
      <p className="otp-info">
        Please enter the OTP sent to <strong>{mobile}</strong>
      </p>
      <OTPInput onComplete={(value) => setOtp(value)}></OTPInput>
      {error && <p style={{ color: "red", marginTop: 4 }}>{error}</p>}
      <button className="primary-btn" onClick={verifYOtp}>
        Verify
      </button>

      <p className="resend">
        Not received the code? <span>Resend</span>
      </p>
    </>
  );
};
export default OtpVerification;
