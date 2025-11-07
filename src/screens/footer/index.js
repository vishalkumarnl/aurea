import React from "react";
import "./footer.css"; // We'll define styles here

import { useNavigate } from "react-router-dom";
import FloatingWhatsApp from "components/WhatsAppButton"

const Footer = () => {
const navigate = useNavigate();
return(
    <>
    {/* Footer Section */}
      <footer style={{"background": "#222",color: "white",padding: "15px 0"}}>
        Footer at bottom
        
    </footer>
    <FloatingWhatsApp />
      
      <img src="/images/footer1.png" className='imgP'></img>
       <img src="/images/footer.png" className='imgP'></img>
       </>
);
}

export default Footer;