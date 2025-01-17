import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import "../Footer/Footer.css"
import insta from '../Assets/instagram-logo.png'
import fb from '../Assets/facebook-logo.png'
import linked from '../Assets/linkedin-logo.png'
import tweeter from '../Assets/twitter-logo.png'

function Footer() {
  const [menu, setMenu] = useState('/')

  return (
    <div className="footer">
      <div className="footer_content">
        <div className="support">
          <h2>E-Gebeya</h2>
          <h3>Subscribe</h3>
          <p>Get 10% off your first order</p>
          <input type="email" placeholder="Enter Your email" />
        </div>
        <div className="support">
          <h3>Support</h3>
          <ul>
            <li> Yabets and Henok,</li>
            <li>Addis Ababa, Ethiopia</li>
            <li>@eGebeya@gmail.com</li>
            <li>+251-976-678-541</li>
          </ul>
        </div>
        <div className="support">
          <h3>Account</h3>
          <ul>
            <li onClick={() => { setMenu('profile') }}>
              <Link to="/profile"  style={{ textDecoration: 'none', color: "white" }}>My Account</Link>
            </li>
            <li onClick={() => { setMenu('profile') }}>
              <Link to="/login"  style={{ textDecoration: 'none', color: "white" }}>Login / Register</Link>
            </li>
            <li onClick={() => { setMenu('cart') }}>
              <Link  style={{ textDecoration: 'none', color: "white" }} to="/cart">Cart</Link>
            </li>
            <li onClick={() => { setMenu('wishlist') }}>
              <Link to="/wishlist"  style={{ textDecoration: 'none', color: "white" }}>Wishlist</Link>
            </li>
            <li onClick={() => { setMenu('profile') }}>
              <Link  style={{ textDecoration: 'none', color: "white" }} to="/shop">Shop</Link>
            </li>
          </ul>
        </div>
        <div className="support">
          <h3>Quick Link</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>FAQ</li>
            <li><Link  to="/contact" style={{ textDecoration: 'none', color: "white" }}>Contact</Link> </li>
          </ul>
        </div>
        <div className="socials">
          <h3>Follow us on socials</h3>
          <ul>
            <li><img src={fb} alt="Facebook" /></li>
            <li><img src={insta} alt="Instagram" /></li>
            <li><img src={linked} alt="LinkedIn" /></li>
            <li><img src={tweeter} alt="Twitter" /></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;