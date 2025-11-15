import React, { useRef } from "react";
import "./modal.css";

export default function OTPInput({ length = 6 }) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // allow only numbers
    if (!/^\d*$/.test(value)) return;

    // set the value
    e.target.value = value;

    // Move to next box when a digit is entered
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous if BACKSPACE pressed and field empty
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();

    // allow only digits
    if (!/^\d+$/.test(paste)) return;

    const digits = paste.split("");

    digits.forEach((d, i) => {
      if (i < length) {
        inputsRef.current[i].value = d;

        // auto move forward
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
