/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../../App';


const Logout = () => {

    const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();
    useEffect(() => {
      fetch('/logout', {
        method:'GET',
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
      }).then((res)=>{
        dispatch({type:"USER", payload: false});
        sessionStorage.removeItem('user', JSON.stringify({ authenticated: false }));
        navigate("/login", {replace:true});
        if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
        }
      }).catch((err)=>{
        console.log(err);
      })
    })
    
  return (
    <>

    </>
  )
}

export default Logout