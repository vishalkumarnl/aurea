import React from "react";
import "../AuthForm.css";
import OTPInput from "../otpInput";

const OtpVerification = ({ mobile, setOtp, verifYOtp }) => {
  return (
    <>
      <p className="otp-info">
        Please enter the OTP sent to <strong>{mobile}</strong>
      </p>
      <OTPInput onComplete={(value) => setOtp(value)}></OTPInput>

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
