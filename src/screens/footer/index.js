import React from "react";
import "./footer.css"; // We'll define styles here
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import FloatingWhatsApp from "components/WhatsAppButton";

const Footer = () => {
  const phone = "+917903092097";
  const email = "aureaorganic@gmail.com";
  const address = "Trinity Sunrise, Bangalore, Karnataka - 562125";
  const mapLink = "https://www.google.com/maps?q=12.862742,77.768337";
  const facebook = "https://www.facebook.com/aureaorganic";
  const instagram = "https://www.instagram.com/aureaorganic";

  const handleClick = () => {
    const subject = encodeURIComponent("Inquiry about your service");
    const body = encodeURIComponent("Hello,\n\nI'd like to know more about...");
    // window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    // Gmail compose URL format
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    
    window.open(gmailUrl, "_blank");
  };

  return (
    <>
      {/* Footer Section */}
      <img src="/images/footer.png" className="imgP"></img>
      <img src="/images/footer1.png" className="imgP"></img>
      <footer
        style={{
          backgroundColor: "#111",
          color: "#f1f1f1",
          padding: "40px 20px",
          textAlign: "center",
          lineHeight: "1.8",
        }}
      >
        <h3 style={{ color: "#00ffcc", marginBottom: "10px" }}>
          Aurea Organic
        </h3>

        {/* Phone */}
        <p>
          <FaPhoneAlt style={{ color: "#00ffcc", marginRight: "6px" }} />
          <a
            href={`tel:${phone}`}
            style={{
              color: "#00ffcc",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            {phone}
          </a>
        </p>

        {/* Email */}
        <p>
          <FaEnvelope style={{ color: "#00ffcc", marginRight: "6px" }} />
          <button
            onClick={handleClick}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1a73e8",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {email}
          </button>
        </p>

        {/* Address */}
        <p>
          <FaMapMarkerAlt style={{ color: "#00ffcc", marginRight: "6px" }} />
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#00ffcc",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            {address}
          </a>
        </p>

        {/* Social Icons */}
        <div style={{ marginTop: "20px" }}>
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: "0 15px",
              color: "#1877F2", // Facebook blue
              fontSize: "1.8rem",
            }}
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>

          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: "0 15px",
              color: "#E1306C", // Instagram pink
              fontSize: "1.8rem",
            }}
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "20px" }}>
          © {new Date().getFullYear()} Aurea Organic. All rights
          reserved.
        </p>
      </footer>
      <FloatingWhatsApp />
    </>
  );
};

export default Footer;
