import React, { useState } from 'react';
import { RiShare2Line } from "react-icons/ri";
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";


const ShareProductButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = window.location.href; // Get the current URL
  const title = 'Check out this amazing product!'; // Customize your title

  const handleShare = (platform) => {
    let url = '';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + shareUrl)}`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, '_blank'); // Open the sharing URL in a new tab
    }
  };

  return (
    <div className="position-absolute top-0 end-0">
      {/* Share Button with SVG Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="btn btn-outline-none border-0" aria-label="Share" >
        <RiShare2Line className='fs-5'/>
      </button>

      {/* Dropdown for Share Options */}
      {isOpen && (
        <div className="dropdown-menu show position-absolute top-100 end-0 desc-sm" style={{ zIndex: 100 }}>
          <button className="dropdown-item d-flex align-items-center" onClick={() => handleShare('facebook')}><FaFacebook className='fs-5 me-1' style={{color: '#3b5998'}} /> Facebook</button>
          <button className="dropdown-item d-flex align-items-center" onClick={() => handleShare('twitter')}><FaSquareXTwitter className='fs-5 me-1' style={{color: '#000'}} /> X</button>
          <button className="dropdown-item d-flex align-items-center" onClick={() => handleShare('linkedin')}><FaLinkedin className='fs-5 me-1' style={{color: '#0e76a8'}} /> LinkedIn</button>
          <button className="dropdown-item d-flex align-items-center" onClick={() => handleShare('whatsapp')}><FaWhatsapp className='fs-5 me-1' style={{color: '#25d366'}} /> WhatsApp</button>
        </div>
      )}
    </div>
  );
};

export default ShareProductButton;
