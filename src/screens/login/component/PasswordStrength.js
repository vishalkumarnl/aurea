import { useState } from "react";
import "../AuthForm.css";

export default function PasswordStrength({
  password,
  setPassword,
  showStrength = true,
  showTooltip = false,
  setShowTooltip
}) {
  const [showPassword, setShowPassword] = useState(false);

  const rules = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const strengthScore = Object.values(rules).filter(Boolean).length; // 0–5
  const percentage = (strengthScore / 5) * 100;

  const strengthLevels = [
    { label: "Very Weak", color: "#ff4d4d", emoji: "❌" },
    { label: "Weak", color: "#ff884d", emoji: "😕" },
    { label: "Okay", color: "#ffcc00", emoji: "😐" },
    { label: "Good", color: "#99cc33", emoji: "🙂" },
    { label: "Strong", color: "#33cc33", emoji: "💪" },
    { label: "Excellent", color: "#009900", emoji: "🚀" },
  ];

  const currentLevel = strengthLevels[strengthScore];

  return (
    <div>
      <div style={{ position: "relative" }}>

        {/* Password Input + Eye Toggle */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            className="input-box"
          />

          {/* Eye icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              cursor: "pointer",
              fontSize: 18,
              userSelect: "none",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
{/* Strength Bar */}
      {password&& showStrength && (
        <div style={{ marginTop: 5 }}>
          <div
            style={{
              height: 10,
              background: "#eee",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${percentage}%`,
                background: currentLevel.color,
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* Label + percentage */}
          <p
            style={{
              marginTop: 5,
              color: currentLevel.color,
              fontWeight: "bold",
            }}
          >
            {currentLevel.emoji} {currentLevel.label} ({percentage}%)
          </p>
        </div>
      )}
        {/* Tooltip checklist */}
        {showTooltip && (
          <div
            style={{
              // position: "absolute",
              // top: "110%",
              // width: "100%",
              marginBottom: 5,
              background: "#fff",
              padding: 12,
              borderRadius: 6,
              border: "1px solid #ddd",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
              zIndex: 10,
            }}
          >
            <strong>For Strong Password use:</strong>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {Object.entries({
                "At least 6 characters": rules.length,
                "One uppercase letter": rules.uppercase,
                "One lowercase letter": rules.lowercase,
                "One number": rules.number,
                "One special char (@$!%*?&)": rules.special,
              }).map(([label, valid]) => (
                <li key={label} style={{ color: valid ? "green" : "red" }}>
                  {valid ? "✓" : "✗"} {label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      
    </div>
  );
}
