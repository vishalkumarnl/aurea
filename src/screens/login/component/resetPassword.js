import React, { useState } from "react";
import "../AuthForm.css";
import PasswordStrength from "./PasswordStrength";

const ResetPassword = ({ mobile, loginUser }) => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipC, setShowTooltipC] = useState(false);

  const resetPassword = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          mobile,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);
      if (res.ok) {
        loginUser({ password });
      } else {
        console.log(data.message || "Reset password failed!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <>

      <PasswordStrength password={password} setPassword={setPassword} showTooltip={showTooltip} setShowTooltip={setShowTooltip}/>
      <PasswordStrength password={confirmPassword} setPassword={setConfirmPassword} showStrength={false} showTooltip={false} setShowTooltip={setShowTooltipC} />

      {/* PASSWORD */}


      <button className="primary-btn" onClick={resetPassword}>
        Continue
      </button>

    </>
  );
};
export default ResetPassword;
