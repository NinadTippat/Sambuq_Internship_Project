import React, { createContext, useReducer, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import AboutUser from './pages/About - Employee/AboutUser.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Leave from './pages/Leaves - Employee/Leave.jsx';
import Logout from './pages/Logout/Logout.jsx';
import { initialState, reducer } from './components/Reducer/UseReducer.js';
import ManagerHome from './pages/Dashboard - Manager/ManagerHome.jsx';
import AboutManager from './pages/About - Manager/AboutManager.jsx';
import ManagerHomeApproved from "./pages/Dashboard - Manager/ManagerHomeApproved.jsx"
import ManagerHomeDenied from "./pages/Dashboard - Manager/ManagerHomeDenied.jsx"

export const UserContext = createContext();

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/myinfo" element={<AboutUser />} />
        <Route path="/manager-info" element={<AboutManager />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/manager-dashboard" element={<ManagerHome />} />
        <Route path="/manager-dashboard-approved" element={<ManagerHomeApproved />} />
        <Route path="/manager-dashboard-denied" element={<ManagerHomeDenied />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      dispatch({ type: 'USER', payload: JSON.parse(user) });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
