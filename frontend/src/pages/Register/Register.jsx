import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./Register.css"
import Navbar from '../../components/Navbar/Navbar';

const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "", email: "", phone: "" , password: "", role: ""
  })

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone,  password, role } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, password, role
      })
    });
    const data = await res.json();

    if (data.status === 400 || !data) {
      window.alert("Please provide all required fields");
    } else {
      window.alert("Registration Successful");
      navigate("/login");
    }
  }


  return (
    <div className='signup'>
      <Navbar />
      <div className='register'>
        <form className='register-form' method='POST'>
        <h3>Sign-Up</h3>
          <label>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInput}
            autoComplete='off'
          />
          <hr />
          <br />
          <label>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            autoComplete='off'
          />
          <hr />
          <br />
          <label>
            Phone:
          </label>
          <input
            type="phone"
            name="phone"
            value={user.phone}
            onChange={handleInput}
            autoComplete='off'
          />
          <hr />
          <br />
          <label>
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            autoComplete='off'
          />
          <hr />
          <br />
          <label>
            Role:
          </label>
          <select
            className='select'
            type="text"
            name="role"
            value={user.role}
            onChange={handleInput}
            autoComplete='off'
          >
          <option className='option' value="select">Select Role</option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          </select>
          <hr />
          <br />
          <button className='submit-btn' type="submit" onClick={postData}>SignUp</button>
        </form>
      </div>
    </div>
  )
}

export default Register