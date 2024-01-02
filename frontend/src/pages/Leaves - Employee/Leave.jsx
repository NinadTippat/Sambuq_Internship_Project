/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import "./Leave.css";
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const Leave = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [userData, setUserData] = useState();


  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/userLeaves')
      .then(result => setLeaveHistory(result.data))
      .catch(err => console.log(err));
  }, []);

  const clearInputField = () => {
    setStartDate('');
    setEndDate('');
    setReason('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/applyLeave', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        startDate,
        endDate,
        reason
      })
    });

    if (response.status === 400) {
      window.alert('Please provide all required fields' || 'End date must be after start date');
    } else {
      window.alert('Leave Applied Successfully');
      clearInputField();
    }
  }




  const userExist = async()=>{
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
  userExist();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className='Leave-page'>
      <Navbar />
      <div className="leave-section">
        <div className="leave">
          <h1 className='h1'>Apply for Leave</h1>
          <br />
          <br />
          <div className="date">
            <label htmlFor="startDate">From : - <input type="date" onChange={(e) => setStartDate(e.target.value)} /></label>
            <label htmlFor="endDate" >To : - <input type="date" onChange={(e) => setEndDate(e.target.value)} className='to' /></label>
          </div>
          <div className="reason">
            <div className="reason-left">
              <label htmlFor="reason">Reason : - </label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} name="reason" id="reason" cols="35" placeholder='Please Mention Reason' rows="5"></textarea>
            </div>
            <div className="reason-right">
              <button className='apply-btn' onClick={handleSubmit}>Apply</button>
            </div>
          </div>
        </div>
        <div className="leave">
          <h1 className='h1'>Leave History</h1>
          <div className="leaves">
            {leaveHistory.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave) => (
                    <tr className='table-body' key={leave._id}>
                      <td>{new Date(leave.startDate).toLocaleDateString('en-GB')}</td>
                      <td>{new Date(leave.endDate).toLocaleDateString('en-GB')}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2>No Leaves in Past</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leave;
