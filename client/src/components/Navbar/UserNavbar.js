import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom'

import { IoHomeOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaUpload } from 'react-icons/fa';
import { BsFilePost } from 'react-icons/bs';

const USerNavbar = (props) => {

    const username = JSON.parse(localStorage.getItem('user-info')).username;
    const pathName = `/profile/${username}`;
    
    return (
        <div className="Navbar">
            <div className="nav-icons">
                {props.iconName==="home" && <IoHomeOutline color="#6155a6" fontSize="30px" />} 
                {props.iconName==="profile" && <ImProfile color="#6155a6" fontSize="30px" />}   
                {props.iconName==="upload" && <FaUpload color="#6155a6" fontSize="25px" />} 
                {props.iconName==="posts" && <BsFilePost color="#6155a6" fontSize="25px" />} 
            </div>

            <div>
                <NavLink exact to="/feed" activeStyle={{
                    fontWeight: "bold",
                    color: "#6155a6"
                }}>
                    Home
                </NavLink>
                <NavLink exact to="/upload" activeStyle={{
                    fontWeight: "bold",
                    color: "#6155a6"
                }}>
                   Upload
                </NavLink>

                <NavLink exact to={pathName} activeStyle={{
                    fontWeight: "bold",
                    color: "#6155a6"
                }}>
                   Profile
                </NavLink>
            </div>
        </div>
    );

}

export default USerNavbar;