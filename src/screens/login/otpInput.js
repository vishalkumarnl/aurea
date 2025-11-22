import "./modal.css";

import React, { useRef, useState, useEffect } from "react";

export default function OTPInput({ length = 6, onChangeOTP, onComplete }) {
  const inputsRef = useRef([]);
  const [otpValues, setOtpValues] = useState(Array(length).fill(""));

  const updateOtp = (index, value) => {
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    const otpString = newOtp.join("");

    // callback for parent on every change
    if (onChangeOTP) onChangeOTP(otpString);

    // callback when OTP complete
    // if (onComplete && otpString.length === length && !otpString.includes("")) {
    //   onComplete(otpString);
    // }

     // callback when OTP complete
    if (otpString.length === length && !otpString.includes(" ")) {
      onComplete(otpString);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    e.target.value = value;
    updateOtp(index, value);

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(paste)) return;

    const digits = paste.split("");

    digits.forEach((d, i) => {
      if (i < length) {
        inputsRef.current[i].value = d;
        updateOtp(i, d);

        if (i < length - 1) {
          inputsRef.current[i + 1].focus();
        }
      }
    });

    e.preventDefault();
  };

  return (
    <div className="otp-boxes" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          maxLength={1}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          ref={(el) => (inputsRef.current[i] = el)}
          className="otp-input"
        />
      ))}
    </div>
  );
}

