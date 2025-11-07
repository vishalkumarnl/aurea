import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function FloatingWhatsApp() {
  const handleClick = () => {
    const phoneNumber = '9590766865';
    const message = 'Hello! I am interested in your services.';
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '30px',
        cursor: 'pointer',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
    >
      <FaWhatsapp />
    </div>
  );
}

export default FloatingWhatsApp;
