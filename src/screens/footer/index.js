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
      <footer className="site-footer">
        <div className="footer-overlay" />
        <div className="footer-container">
          <div className="footer-col logo-col">
            <h3 className="footer-title">Aurea Organic</h3>
            <p className="footer-desc">Natural, sustainable, and locally sourced health & wellness products crafted with care.</p>
            <div className="footer-social">
              <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-col contact-col">
            <h4>Contact</h4>
            <p className="contact-row"><FaPhoneAlt className="footer-icon" /> <a href={`tel:${phone}`}>{phone}</a></p>
            <p className="contact-row"><FaEnvelope className="footer-icon" /> <a href={`mailto:${email}`}>{email}</a></p>
            <p className="contact-row"><FaMapMarkerAlt className="footer-icon" /> <a href={mapLink} target="_blank" rel="noopener noreferrer">{address}</a></p>
          </div>

          <div className="footer-col extras-col">
            <div className="extras-lists">
              <div className="list-block">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/products">Products</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>

              <div className="list-block">
                <h4>Policies</h4>
                <ul className="legal-links">
                  <li><a href="/privacy">Privacy Policy</a></li>
                  <li><a href="/terms">Terms &amp; Conditions</a></li>
                  <li><a href="/refund">Refund Policy</a></li>
                  <li><a href="/shipping">Shipping Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="subscribe">
              <input aria-label="Email for newsletter" placeholder="Subscribe for updates" />
              <button className="subscribeBtn">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Centered subscribe for desktop */}
        <div className="footer-subscribe" aria-hidden="false">
          <div className="subscribe subscribe-center">
            <input aria-label="Email for newsletter" placeholder="Subscribe for updates" />
            <button className="subscribeBtn">Subscribe</button>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Aurea Organic. All rights reserved.</div>
          <div className="footer-credit">Built with care • <a href="/privacy">Privacy</a></div>
        </div>
      </footer>
      <FloatingWhatsApp />
    </>
  );
};

export default Footer;
