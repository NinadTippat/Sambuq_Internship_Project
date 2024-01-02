import React from 'react'
import "./LandingPage.css"
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import heroImg from '../../assests/heroImg.png'

const LandingPage = () => {
  return (
    <div className='landing'>
        <Navbar/>
       <div className='landing-page'>
       <div className="hero-section">
            <div className="hero-left">
                <h1>Leave Management made Simpler !</h1>
                <p>Leave management made easy, login /Signup now to avail its Benefit</p>
                <Link to="/register" className='hero-btn'><p>Get Started</p></Link>
            </div>
            <div className="hero-right">
                <img src={heroImg} alt="img" />
            </div>
        </div>
       </div>
    </div>
  )
}

export default LandingPage