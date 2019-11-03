import React from 'react';
import '../styles/Header.css';
 
const zeroAlpha1px = '000000-0.png';  

const Header = () => {
    return (
        <div className='Header'>
            <img src={zeroAlpha1px} alt="Foaming Conditioner Logo" />
        </div>
    )
};

export default Header;