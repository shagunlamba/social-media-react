import React from 'react';
import { FaReact } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="text-center py-3" style={{backgroundColor: "#f9f9f9"}}>
                <p> &lt;&#47;&gt; with &hearts; by <span id="name">Shubh Sanghavi, Poornartha Sawant and Shagun Lamba</span> using &nbsp;
                    <FaReact />
                </p>
        </footer>
    )
}

export default Footer;