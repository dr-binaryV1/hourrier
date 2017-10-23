import React from 'react';

const Header = (props) => {
  return (
    <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo">Hourrier</a>
        <ul className="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
        </ul>
      </div>
    </nav>
  </div>
  )
}

export default Header;