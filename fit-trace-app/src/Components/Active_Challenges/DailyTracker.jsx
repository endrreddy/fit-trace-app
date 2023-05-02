import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DailyTracker() {
    const navigate = useNavigate()
    const [date , setDate] = useState('')
    var userData = JSON.parse(localStorage.getItem('user'))
    const challengeId = parseInt(localStorage.getItem('updateForChallenge'))
    const dailyTracker = async() =>{
        console.log(localStorage.getItem('updateForChallenge'))
        const updateTrackerJSON={
            "challengekey" : challengeId,
            "status" : date
        }
        userData.updates.push(updateTrackerJSON)
        axios.post('https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/user',userData)
        .then((response) =>
        {
            console.log(response.data)
            localStorage.setItem('user',JSON.stringify(response.data.body))
            window.location.href=('/fit-trace/active-challenges')
        })
        navigate('/fit-trace/active-challenges')
    }
    
  return(localStorage.getItem('isLoggedIn'))? (
    <div className='card'>
        <center>
        <h3>Daily Tracker</h3>
        <div>
            <form onSubmit={dailyTracker}>
                <label htmlFor=""></label>
                <input type="date"
                    placeholder='Todays date' 
                    value={date} 
                    onChange={(e) =>
                        setDate(e.target.value)
                    }
                />
                <button type='submit' >Submit</button>
            </form>
        </div>
        </center>
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

export default DailyTracker