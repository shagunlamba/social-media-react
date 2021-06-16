import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom'
// import { IoHomeOutline } from "react-icons/io5";
import { HiLogin } from "react-icons/hi";
import { ImPencil } from "react-icons/im";
import { BsFillPeopleFill } from "react-icons/bs";


const Navbar = (props) => {
    return (
        <div className="Navbar">
            <div className="nav-icons">
                {props.iconName==="home" && <BsFillPeopleFill color="#6155a6" fontSize="30px" />}
                {props.iconName==="login" && <HiLogin color="#6155a6" fontSize="30px" />}
                {props.iconName==="register" && <ImPencil color="#6155a6" fontSize="25px" />}
            </div>

            <div>
                <NavLink exact to="/" activeStyle={{
                    fontWeight: "bold",
                    color: "#6155a6"
                }}>
                    U N I F Y
                </NavLink>
                <NavLink exact to="/login" activeStyle={{
                    fontWeight: "bold",
                    color: "#6155a6"
                }}>
                    Login
                </NavLink>
                <NavLink exact to="/register" activeStyle={{
                    fontWeight: "bold",
                    color: "#6155a6"
                }}>
                    Register
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;