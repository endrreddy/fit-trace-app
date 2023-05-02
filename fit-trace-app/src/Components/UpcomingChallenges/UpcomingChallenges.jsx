import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function UpcomingChallenges() {
    const [inactivedata, setInactiveData] = useState([]);
    const userdata = JSON.parse(localStorage.getItem('user'));
    console.log(userdata.registered_challenges.indexOf(10))
    // console.log(localStorage.getItem('datetime'))

    useEffect(() => {
        try {
          fetch("https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/challenge")
            .then((inactivedata) => inactivedata.json())
            .then((inactivedata) => {
              setInactiveData(inactivedata.response);
            });
    
        } catch (error) {
    
          console.error("Error fetching data:", error);
    
        }
    
      }, []);

  return(localStorage.getItem('isLoggedIn')) ? (
    <div>
        

<button className="btn"><b>Upcoming Challenges</b></button>
<div className="falogohome"><Link to="/"><FaHome /></Link></div>

<div className="card-container">
  {inactivedata
    .filter((challenge) => challenge.challenge_status === 'Inactive')
    .map((challenge) => 
      (
        <div
        key={challenge.challengeid} className='card'
      >
        <center>
          <div className="img-container">{
            <img src={challenge.image[0]} alt='' height={100} />
          }</div>
          <div ><h4>{challenge.name}</h4></div>
          <div ><p>{challenge.description}</p></div>
        </center>

        </div>
    )
    )
  }
    </div>
</div>
  ) : (
    <div>
        {
            window.location.replace('/')
        }
    </div>
  );
}

export default UpcomingChallenges;