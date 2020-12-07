import React from 'react';
import headerLogo from '../images/header_logo.svg';

function Header() {
  return(
    <header className="header">
      <img src={headerLogo} alt="header-logo" className="logo" />
    </header>
  )
}

export default Header;
