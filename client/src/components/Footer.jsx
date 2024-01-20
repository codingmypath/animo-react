import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';
import { Link } from "react-router-dom";






export default function Footer() {
    const {currentUser } = useSelector(state => state.user)
    return (

<footer className="footer font-mulish bg-lightestGreen w-full text-center text-veryDarkGreen h-90 bottom-0 mt-auto">
        {/* <a className="footer-links font-bold" href="calendar.html">Home</a> */}
        {/* <a className="footer-links" href="/events"><img class="animo m-auto w-20" src="public/butterfly-logo-remove.png" /></a>  */}
        <h2 id="title-footer" className="font-bold text-xl pt-4">Contact</h2>
        <ul className="flex justify-center p-4">
            <li className="p-2"><Link to='https://www.twitter.com/codingmypath' target="_blank" ><FaXTwitter className="text-3xl text-middleGreen hover:text-darkGreen" /></Link></li>
            <li className="p-2"><Link to='https://www.instagram.com/codingmypath' target="_blank"><FaInstagram className="text-3xl text-middleGreen hover:text-darkGreen" /></Link></li>
            <li className="p-2"><Link to='https://www.linkedin.com/in/eherrera09/' target="_blank"><FaLinkedin className="text-3xl text-middleGreen hover:text-darkGreen" /></Link></li>
            <li className="p-2"><Link to='https://www.github.com/codingmypath' target="_blank"><FaGithub className="text-3xl text-middleGreen hover:text-darkGreen" /></Link></li>
        </ul>
        
        
        {/* <a class="social-links" href="https://www.twitter.com/codingmypath"><FontAwesomeIcon icon="fa-brands fa-x-twitter" /></a>
        <a class="social-links" href="https://www.instagram.com/codingmypath"><i class="fa-brands fa-instagram"></i></a>
        <a class="social-links" href="https://www.linkedin.com/in/eherrera09/"><i class="fa-brands fa-linkedin"></i></a>
        <a class="social-links" href="https://www.github.com/codingmypath"><i class="fa-brands fa-github"></i></a> */}
        <p id="copyright-footer" className="p-4 pt-10 text-darkGreen">Copyright &copy; Edgar Herrera - 2024</p>
</footer>
    )
}