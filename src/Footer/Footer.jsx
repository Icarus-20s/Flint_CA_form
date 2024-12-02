import React from 'react';
import { Link } from 'react-router-dom';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        <ul className="footer-nav">
          
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
        </ul>
        <div className="social-icons">
          
          <h2>Follow Us</h2>
          <ul>
            <li>
              <a href="https://www.facebook.com/gces.pokhara" target="_blank" rel="noopener noreferrer">
                <FacebookRoundedIcon />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/gcesitclub/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/GCES_College" target="_blank" rel="noopener noreferrer">
                <XIcon />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@GCES.Pokhara" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon />
              </a>
            </li>
          </ul>
        </div>
      </nav>
       <p> © 2024 Chartered Accountant Firm. All Rights Reserved.</p>
       </footer>
  );
};

export default Footer;
