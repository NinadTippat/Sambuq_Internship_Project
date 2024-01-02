import React, { useEffect } from 'react'
import ManagerNavbar from '../../components/ManagerNav/ManagerNavbar';
import axios from "axios"
import "../About - Employee/AboutUser.css"
import {useNavigate} from "react-router-dom"
import { useState } from 'react';
import userImg from "../../assests/User.png"
import "./AboutManager.css"

const AboutManager = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [users, setUsers] = useState([]);


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
        axios.get('/users')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err));
        // eslint-disable-next-line
    }, []);

  return (
    <div className='About-page'>
     <ManagerNavbar/> 
     <div className="profile manager-profile">
       <div className="profile-section manager-profile-section">
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

       <div className="all-employees">
        <div className="emp">
            <h1 className='employee-heading'>Employees</h1>
            {users.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr className='table-body'  key={user._id}>
                      <td >{user.name}</td>
                      <td>{user.email}</td>
                      <td >{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3 className='noleaves'>No Employees</h3>
            )}
            </div>
       </div>
     </div>
    </div>
  )
}
export default AboutManager