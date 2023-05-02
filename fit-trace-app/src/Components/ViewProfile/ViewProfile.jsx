import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaHome } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import './ViewProfile.css'

function ViewProfile() {
    function updateProfile(){
        window.location.replace('/fit-trace/update-profile')
    }
    const userProfileData = JSON.parse(localStorage.getItem('user'));
    const [challengeData , setChallengeData] = useState([]);
    useEffect=()=>{
        axios.get('https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/challenge')
        .then((response) => {
            setChallengeData(response.data.response);
          })
    }
    
  return(localStorage.getItem('isLoggedIn'))? (
    
    <div>
    <div className="falogohome"> <Link className='fahomelogo' to='/' ><FaHome /> </Link></div>
  <button className="btn"><b>View Profile</b></button>
  <div className="card-container">
    <table className='profile'>
      <thead>
        <tr>
          <th><b>Employee ID</b></th>
          <th><b>Employee Name</b></th>
          <th><b>Fitness Goal</b></th>
          <th><b>Fitness Mantra</b></th>
          <th><b>Height(Cms)</b></th>
          <th><b>Weight(Kgs)</b></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{userProfileData.employeeid}</td>
          <td>{userProfileData.empName}</td>
          <td>{userProfileData.empFitnessGoal}</td>
          <td>{userProfileData.empFitnessMantra}</td>
          <td>{userProfileData.empHeight}</td>
          <td>{userProfileData.empWeight}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
  <div className='update-btn'><button onClick={updateProfile} >Update</button></div>
  <span></span>
  <div className='card-profile'>
    <center><h4>Challenges Accepted</h4></center>
    <table>
      <thead>
        <tr>
          <th>Accepted Challenges</th>
          <th>Fitness Points Earned</th>
          <th>Date of Registration</th>
        </tr>
      </thead>
      <tbody>
        {challengeData.map((challenges) => 
            {
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData.registered_challenges.includes(parseInt(challenges.challengeid))) {
                    const acceptedChallengeIndex = userData.registered_challenges.indexOf(parseInt(challenges.challengeid));
                    return (
                        <tr key={challenges.challengeid}>
                            <td>{challenges.name}</td>
                            <td>0</td>
                            <td>{userData.challengeAcceptedDateTime[acceptedChallengeIndex]}</td>
                        </tr>
                    );
                }
            })
        }

      </tbody>
    </table>
    
  </div>
</div>

    ):
    (
      <div>
        {
          window.location.replace('/')
        }
      </div>
    )
}

export default ViewProfile