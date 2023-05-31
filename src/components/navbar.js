import '../pages/App.css';
import Logo from '../assets/images/logo.png'
import Logo3 from '../assets/images/logo3.png'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';


const Navbar = () => {

  const [navbar, setNavbar] = useState(false)

  const displayNone = {
    display: "none"
  }
  const displayBlock = {
    display: "block"
   
  }

  const changeBackground = () => {
    if (window.scrollY >= 690) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  window.addEventListener('scroll', changeBackground)

  return (
    <div>
      <header>
        <div className="Logo">
          <a style={navbar ? displayNone : displayBlock} href="#"> <img src={Logo3} className="Logo-img" alt="" title="muharris" /></a>
          <a style={navbar ? displayBlock : displayNone} href="#"> <img src={Logo} className="Logo-img2" alt="" title="muharris" /></a>
        </div>
        <nav>
          <ul>
            <li>
                <Link to="about" style={navbar ? displayNone : displayBlock} className="Nav-text">ABOUT</Link>
                <Link to="about"  style={navbar ? displayBlock : displayNone} className="Nav-text2" >ABOUT</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;