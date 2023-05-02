import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function UpdateProfile() {
    const [empName, setEmpName] = useState(JSON.parse(localStorage.getItem('user')).empName)
    const [empFitnessGoal, setEmpFitnessGoal] =useState(JSON.parse(localStorage.getItem('user')).empFitnessGoal)
    const [empFitnessMantra, setEmpFitnessMantra] = useState(JSON.parse(localStorage.getItem('user')).empFitnessMantra)
    const [empHeight,setEmpHeight] = useState(JSON.parse(localStorage.getItem('user')).empHeight)
    const [empWeight, setEmpWeight] = useState(JSON.parse(localStorage.getItem('user')).empWeight) 
     var userData = JSON.parse(localStorage.getItem('user'))

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userData.empName != null){userData.empName = empName}
        if(userData.empFitnessGoal != null){userData.empFitnessGoal = empFitnessGoal}
        if(userData.empFitnessMantra != null){userData.empFitnessMantra =empFitnessMantra}
        if(userData.empWeight != null){userData.empWeight = empWeight}
        if(userData.empHeight != null){userData.empHeight = empHeight}
        
        axios
          .put('https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/user', userData)
          .then((response) => {
            console.log(response.data.body);
            
            localStorage.setItem('user',JSON.stringify(response.data.body))
            window.location.replace('/fit-trace/view-profile/user-profile');
          });
      };

  return (localStorage.getItem('isLoggedIn'))?(
    <div className='card'>
        <h3>Update Profile</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="Employee Name">Employee Name</label>
            <input type="text" placeholder='Employee Name' value={empName} onChange={(e) =>
                        setEmpName(e.target.value)
                    } required/>
            <br />
            <label htmlFor="Fitness Goal">Fitness Goal</label>
            <input type="text" placeholder='Fitness Goal' value={empFitnessGoal} onChange={(e) =>
                        setEmpFitnessGoal(e.target.value)} />
            <br />
            <label htmlFor="Fitness Mantra">Fitness Mantra</label>
            <input type="text" placeholder='Fitness Mnatra' value={empFitnessMantra} onChange={(e) =>
                        setEmpFitnessMantra(e.target.value)} />
            <br />
            <label htmlFor="Height">Height(Cms)</label>
            <input type="text" placeholder='Height(Cms)' value={empHeight} onChange={(e) =>
                        setEmpHeight(e.target.value)} required/>
            <br />
            <label htmlFor="Weight(Kgs)">Weight(Kgs)</label>
            <input type="text" placeholder='Weight(Kgs)' value={empWeight} onChange={(e) =>
                        setEmpWeight(e.target.value)} required/>
            <button type='submit' className='btn-success'>update</button>
            <button type='cancel' className='btn-error'>cancel</button>

        </form>
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

export default UpdateProfile