import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">Hourrier</Link>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/shopping-cart">Cart</Link></li>
        </ul>
      </div>
    </nav>
  </div>
  )
}

export default Header;