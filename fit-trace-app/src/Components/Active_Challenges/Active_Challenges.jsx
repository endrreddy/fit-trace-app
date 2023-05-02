import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import './active_challenges.css';
import DailyTracker from "./DailyTracker";


const Active_Challenges = () => {

  const [data, setData] = useState([]);
  //to handle the daily tracker
  const handleDailyTracker = (challengeid) =>{
    axios.get('https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/challenge')
    .then(
      (response) => console.log(challengeid),
      localStorage.setItem('updateForChallenge', challengeid),
    window.location.replace('/fit-trace/daily-tracker')
    )
    
  }
  // To handle Accept Challenges on click
  function handleAcceptChallenge(challengeid){
    // console.log(challengeid) // To check the challengeid on click
    const userData =JSON.parse (localStorage.getItem('user'))
    // console.log(userData)
    localStorage.setItem('datetime', new Date() )
    if (!userData.registered_challenges.includes(parseInt(challengeid))){
      userData.registered_challenges.push(parseInt(challengeid))
      userData.challengeAcceptedDateTime.push(localStorage.getItem('datetime'))
      axios.put('https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/user', userData)
      .then((response) =>
        { 
        console.log(response.data.body)
        localStorage.setItem('user',JSON.stringify(response.data.body))
        window.location.reload('/fit-trace/active-challenges')
        }
      )
    }
    
  }

useEffect(() => {

    try {
      axios.get('https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/challenge')
      .then((response) => {
        setData(response.data.response);
      })
      } 
      catch (error) {

          console.error("Error fetching data:", error);

          }

          }, []);

        return(localStorage.getItem('isLoggedIn')) ? (
          
          <div>

            <button className="btn"><b>Active Challenges</b></button>
            <div className="falogohome"><Link to="/"><FaHome /></Link></div>
            
            <div className="card-container">
            {
            data
              .filter((challenge) => challenge.challenge_status === 'Active')
              .map((challenge) => {
                const userdata = JSON.parse(localStorage.getItem('user'));
                console.log(userdata)
                console.log(userdata.registered_challenges.includes(challenge.challengeid))
                if (userdata.registered_challenges.includes(parseInt(challenge.challengeid))) {
                  // console.log('if executed')
                    return (
                      <div key={challenge.challengeid} className='card'>
                        <center>
                          <div className="img-container">
                            <img src={challenge.image[0]} alt='' height={100} />
                          </div>
                          <div><h4>{challenge.name}</h4></div>
                          <div><p>{challenge.description}</p></div>
                          <div>
                            <button className="btn-pink" id = {challenge.challengeid} onClick={()=> handleDailyTracker(challenge.challengeid)}>Daily Tracker</button>
                            
                          </div>
                        </center>
                      </div>
                    );

            } else {
              console.log('else executed')
              return (
                <div key={challenge.challengeid} className='card'>
                  <center>
                    <div className="img-container">
                      <img src={challenge.image[0]} alt='' height={100} />
                    </div>
                    <div><h4>{challenge.name}</h4></div>
                    <div><p>{challenge.description}</p></div>
                    <div>
                      <button className="btn-pinkac" id="btn-pink" name="Accept Challenge" onClick={() => handleAcceptChallenge(challenge.challengeid)}>Accept Challenge</button>
                    </div>
                  </center>
                </div>
              );
              
            }
          
          }
        
          )
        }
        </div>

      </div>

    ):(
      <div>
        {
          window.location.replace('/')
        }
      </div>
    );
  };

export default Active_Challenges;
