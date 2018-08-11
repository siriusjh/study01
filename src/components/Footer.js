import React from 'react';
import {
    FaArrowRight,
    FaArrowLeft
} from 'react-icons/fa';

const Footer = () => (
    <footer>
        <div id="btn-steps">
            <button type="button" className="footer-btn"><FaArrowLeft/>이전</button>
            <button type="button" className="footer-btn">다음<FaArrowRight/></button>
        </div>
    </footer>
)

export default Footer;