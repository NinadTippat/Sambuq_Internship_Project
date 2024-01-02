/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from '../../components/Navbar/Navbar';
import { UserContext } from '../../App';

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        role,
      }),
    });

    const data = await res.json();
    if (res.status === 401 || !data) {
      window.alert('Invalid Credential');
    } else if (res.status === 500) {
      window.alert('Internal server error');
    } else if (res.status === 400) {
      window.alert('Please provide email and password');
    } else {
      dispatch({ type: 'USER', payload: true });
      sessionStorage.setItem('user', JSON.stringify({ authenticated: true }));
      window.alert('Login Successful');
    //   navigate('/myinfo');
    if (data.user.role === 'Employee') {
        navigate('/leave');
      } else if (data.user.role === 'Manager') {
        navigate('/manager-dashboard');
      }
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login">
        <form className="login-form" method="POST">
          <h3>Login</h3>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <hr />
          <br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <hr />
          <br />
          <label htmlFor="role">Role</label>
          <select
            className="select"
            type="text"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            autoComplete="off"
          >
            <option className="option" value="select">
              Select Role
            </option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>
          <hr />
          <br />
          <button className="submit-btn" type="submit" onClick={loginUser}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
