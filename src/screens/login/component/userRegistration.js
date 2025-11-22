import React, { useState } from "react";
import "../AuthForm.css";

const UserRegistration = ({ mobile, setIsLogin, loginUser }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const genders = ["male", "female", "other"];

  const registerUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          gender: selectedGender,
          mobile,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);
      if (res.ok) {
        loginUser({email, password});
      } else {
        console.log(data.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <>
      {/* FIRST NAME */}
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="input-box"
        placeholder="Name"
      />

      {/* LAST NAME */}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-box"
        placeholder="Email"
      />

      {/* PASSWORD */}
      <div style={{ position: "relative" }}>
        <input
          type={"text"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
          placeholder="Password"
        />
      </div>

      {/* CONFIRM PASSWORD */}
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-box"
        placeholder="Confirm Password"
      />

      {/* GENDER */}
      <div style={{ flexDirection: "column", marginBottom: "10px" }}>
        {genders.map((g) => (
          <label key={g} style={{ cursor: "pointer", paddingRight: "10px" }}>
            <input
              type="radio"
              name="gender"
              value={g}
              checked={selectedGender === g}
              onChange={(e) => setSelectedGender(e.target.value)}
            />
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </label>
        ))}
      </div>

      <button className="primary-btn" onClick={registerUser}>
        Register
      </button>

      <p>
        Already have an account?{" "}
        <span className="toggle-link" onClick={() => setIsLogin(true)}>
          Login
        </span>
      </p>
    </>
  );
};
export default UserRegistration;
