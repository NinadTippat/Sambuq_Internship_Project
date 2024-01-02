import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import axios from "axios"
import "./AboutUser.css"
import {useNavigate} from "react-router-dom"
import { useState } from 'react';
import userImg from "../../assests/User.png"

const About = () => {
    
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    
    const callAboutPage = async()=>{
        try {
            const response = await axios.get('/myinfo', {
                headers:{
                    Accept:"application/json",
                    'ContentType': 'application/json',
                },
                credentials:'include'
            });
            const data = await response.data;
            setUserData(data);
            console.log(data);
            
            if(!response.status === 200){
                const error = new Error(response.error);
                throw error;
            }
            
        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    }
    
    useEffect(()=>{
        callAboutPage();
        // eslint-disable-next-line
    }, []);

  return (
    <div className='About-page'>
     <Navbar/> 
     <div className="profile">
       <div className="profile-section">
       <div className="profile-left">
            <div className="userImg">
                <img src={userImg} alt="" />
            </div>
        </div>
        <div className="profile-right">
            <div className="info"><label>Name : -</label> <span>{userData.name}</span></div>
            
           <div className="info"> <label>Email : -</label> <span>{userData.email} </span></div>
            
           <div className="info"><label>Phone : -</label> <span> {userData.phone} </span></div> 

           <div className="info"><label>Role : -</label> <span> {userData.role}</span></div> 
        </div>
       </div>
     </div>
    </div>
  )
}
export default About