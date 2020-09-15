import React from 'react'
import {ReactComponent as PoliceLogo} from '../../police.svg';
import './header.css';
const Header = () => (
  <div className="header">
    <PoliceLogo fill="#fff"/>
    <div className="header__content">
      <h1>Police Department of Berlin</h1>
      <h2>Stolen Bykes</h2>
    </div>
    
    {/* <p>
      <button onClick={() => props.changePage()}>
        Go to About
      </button>
    </p> */}
  </div>
);

export default Header;

