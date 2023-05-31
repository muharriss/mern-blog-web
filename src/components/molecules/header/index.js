import { Logo, LogoBlack, LogoWhite } from '../../../assets';
import { Logo3 } from '../../../assets';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const Header = () => {

    const [navbar, setNavbar] = useState(false)

    const displayNone = {
        display: "none"
    }
    const displayBlock = {
        display: "block"

    }

    const changeBackground = () => {
        if (window.scrollY >= 720) {
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
                    <Link to='/' style={navbar ? displayNone : displayBlock} > <img src={LogoWhite} className="Logo-img" alt="" title="muharris" /></Link>
                    <Link to='/' style={navbar ? displayBlock : displayNone} > <img src={LogoBlack} className="Logo-img2" alt="" title="muharris" /></Link>
                </div>
                <div className='nav-text-wrapper'>
                    <div>
                        <Link to="/blog" style={navbar ? displayNone : displayBlock} className="Nav-text">BLOG</Link>
                        <Link to="/blog" style={navbar ? displayBlock : displayNone} className="Nav-text2" >BLOG</Link>
                    </div>
                    <div>
                        <Link to="/about" style={navbar ? displayNone : displayBlock} className="Nav-text">ABOUT</Link>
                        <Link to="/about" style={navbar ? displayBlock : displayNone} className="Nav-text2" >ABOUT</Link>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;