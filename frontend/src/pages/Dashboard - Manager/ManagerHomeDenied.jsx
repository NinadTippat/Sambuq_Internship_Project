import React, { useEffect, useState } from 'react'
import "./ManagerHome.css"
import ManagerNavbar from '../../components/ManagerNav/ManagerNavbar'
import axios  from 'axios';
import { Link } from 'react-router-dom';


const ManagerHome = () => {

    const [leaves, setLeaves] = useState([]);
 
    useEffect(() => {
        axios.get('/deniedLeaves')
          .then(result => setLeaves(result.data))
          .catch(err => console.log(err));
      }, []);
    

  return (
    <div className='manager-page'>
        <ManagerNavbar/>
        <div className="manager-section">
        <div className="manager">
        <div className="secondary-nav">
          <ul className='sec-nav'>
            <Link to="/manager-dashboard"> <li>Pending Leaves</li></Link>
            <Link to="/manager-dashboard-approved"><li>Approved Leaves</li></Link> 
            <Link to="/manager-dashboard-denied"><li>Denied Leaves</li></Link> 
          </ul>
        </div>
        <h1 className='pending-heading'>Denied Leaves</h1>
            {leaves.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr className='table-body' key={leave._id}>
                      <td>{leave.userName}</td>
                      <td>{new Date(leave.startDate).toLocaleDateString('en-GB')}</td>
                      <td>{new Date(leave.endDate).toLocaleDateString('en-GB')}</td>
                      <td >{leave.reason}</td>
                      <td>
                        {leave.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3 className='noleaves'>No Leaves in Past</h3>
            )}
            </div>
        </div>
    </div>
  )
}

export default ManagerHome