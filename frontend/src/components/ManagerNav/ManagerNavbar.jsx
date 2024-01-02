/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { Axios } from "axios";
import { UserContext } from '../../App';

const Navbar = () => {

  const {state, dispatch} = useContext(UserContext);
console.log(state);
  const RenderMenu = () => {

    if (state) {
      return (
        <>
          <li>
            <NavLink to="/manager-dashboard">Home</NavLink>
          </li>
          <li>
            <NavLink to="/manager-info">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink to="/manager-dashboard">Home</NavLink>
          </li>
          <li>
            <NavLink to="/manager-info">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/register">SignUp</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      );
    }
  };

  const [showMediaIcons, setShowMediaIcons] = useState(false);


  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
         <Link to="/manager-dashboard"><h1>Holiday</h1></Link>
        </div>
        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <RenderMenu/>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <Link href="/" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;