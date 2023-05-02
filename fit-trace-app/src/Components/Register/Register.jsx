import React, { useEffect } from 'react'
import axios from 'axios'
import { FaHome } from 'react-icons/fa';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import './Register.css';
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie';


function Register () {
    

    const [employeeid , setEmployeeId] = useState('');
    const [empName, setEmpName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobile, setMobile] = useState('');
    const [empAccount, setEmpAccount] = useState('');
    const [empHeight, setEmpHeight] = useState('');
    const [empWeight, setEmpWeight] = useState('');
    const [empFitnessFocus, setEmpFitnessFocus] = useState('');
    const [empFitnessGoal, setEmpFitnessGoal] = useState('');
    const [empFitnessMantra, setEmpFitnessMantra] = useState('');
    const [password , setPassword] = useState('');

    const hashpass = bcrypt.hashSync(password)
    
const handleSubmit = (e) =>{
    e.preventDefault();
    const createUserJSON = {
        emailId: emailId,
        employeeid: employeeid,
        empName : empName,
        mobile : mobile,
        empAccount : empAccount,
        empHeight : empHeight,
        empWeight : empWeight,
        empFitnessGoal:empFitnessGoal,
        empFitnessFocus : empFitnessFocus,
        empFitnessMantra : empFitnessMantra,
        password : hashpass,
        registered_challenges: [],
        challengeAcceptedDateTime : [],
        updates : []
    }
    
   
    axios.post('https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/user', createUserJSON)
    .then((res)=>{

        if(res.status === 200){
            const resRegUser = res.data;
            alert("Registration Successfull")
           
            window.location.replace('/')
        }
       
    });
    
}

return (
    <div>
        <center>
            <div className='card'>
            <center><h1 className='register'>Register Yourself</h1></center>
            
            <div className="falogohome"> <Link className='fahomelogo' to='/' ><FaHome /> </Link></div>
        
            <div >
            
            <form onSubmit={handleSubmit}>
            
            <div className="container">
            
            <div className="left">
                
                

                <label htmlFor='employeeId'>Employee ID :</label><br />

                <input 
                    type='text'
                    name='Employee ID' 
                    placeholder='Employee ID' 
                    value={employeeid} 
                    onChange={(e) =>
                        {
                            const empid = e.target.value
                            if(/^[0-9]*$/.test(empid)){
                                setEmployeeId(empid)
                            }
                            else{
                                alert('Employee Id Should be only digits')
                            }
                        }
                    }
                    required/><br /><br />
                
                <label htmlFor='password'> Password :</label><br />
                <input 
                    type='password'
                    name='password' 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required/><br /><br />
                

                <label htmlFor='employeeName'>Employee Name :</label><br />
                <input type='text'
                    name='Employee Name'
                    placeholder='Employee Name'
                    value={empName}
                    onChange={(e) =>
                        {
                            const name = e.target.value
                            if(/^[a-zA-Z\s]*$/.test(name)){
                                setEmpName(name);
                            }
                            else{
                                alert('Employee name should be a String')
                            }
                        }
                    }
                        required /> <br /><br/>

                <label htmlFor='emailId'>Email ID :</label><br />
                <input type='email'
                name='Email ID'
                placeholder='Email ID'
                value={emailId}
                onChange={(e) =>
                    {
                        const email = e.target.value;
                        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && email.length <= 20) {
                            setEmailId(email);
                        }
                        else{
                            alert('Enter a valid email format [example@something.com]')
                        }
                    }
                }
                required /> <br/><br />

                <label htmlFor='employeeMobile'>Employee Mobile </label><br />
                <input type='tel'
                name='Mobile Number'
                pattern='[0-9]{10}'
                placeholder='Employee Mobile'
                value={mobile}
                onChange = {(e)=>{
                    const mobileNumber = e.target.value;
                    if (/^\d{0,10}$/.test(mobileNumber)) {
                    setMobile(mobileNumber);
                    }
                    else{
                        alert('Mobile number should be only numbers')
                    }
                }
            }
                required /><br /><br />
{/*                 
                
                <label htmlFor='employeeAccount'>Employee Account</label><br />
                <input type='text'
                name='Employee Account'
                placeholder='Employee Account'
                value={empAccount}
                onChange = {(e)=>
                    setEmpAccount(e.target.value)
                }
                required />
                <br /><br /> */}

                
                </div>
                <div className='height'>

                <label htmlFor='height' >Height (Cms)</label><br />
                <input type='number'
                name='Height'
                placeholder='Height (in Cms)'
                value={empHeight}
                onChange = {(e) =>
                    {
                        const height = e.target.value
                        if(/^\d{0,3}$/.test(height)){
                            setEmpHeight(height)
                        }
                        else{
                            alert('Height should be 3 digits')
                        }
                    }
                }
                required /><br /><br />
                

                <label htmlFor='weight'>Weight (Kgs)</label><br />
                <input type='number'
                name='Weight'
                placeholder='Weight (in Kgs)'
                value={empWeight}
                onChange ={(e)=>
                    {
                        const weight = e.target.value
                        if(/^\d{0,3}$/.test(weight)){
                            setEmpWeight(weight)
                        }
                        else{
                            alert('Weight should be 3 digits')
                        }
                    }
                }
                required/><br /><br />

                <label htmlFor='fitnessGoals'>Fitness Goals</label><br />
                <input type='text'
                name = 'Fitness Goals'
                placeholder='Fitness Goals'
                value={empFitnessGoal}
                onChange={(e)=>
                    {
                        const fitnessGoal = e.target.value;
                        if (/^[a-zA-Z\s]*$/.test(fitnessGoal)) {
                            setEmpFitnessGoal(fitnessGoal);
                        }
                        else{
                            alert('It should be only string')
                        }
                    }
                }
                /><br /><br />

                <label htmlFor='fitnessFocus'>Fitness Focus</label><br />
                <input type='text'
                name='Fitness Focuss'
                placeholder='Fitness Focus'
                value={empFitnessFocus}
                onChange={(e)=>
                    {
                        const fitnessFocus = e.target.value;
                        if (/^[a-zA-Z\s]*$/.test(fitnessFocus)) {
                            setEmpFitnessFocus(fitnessFocus);
                        }
                        else{
                            alert('It should be only string')
                        }
                    }
                }
                ></input><br /><br />

                <label htmlFor='fitnessMantra'>Fitness Mantra</label><br />
                <input type='Fitness Mantra'
                placeholder='Fitness Mantra'
                value={empFitnessMantra}
                onChange={(e) =>
                    {
                        const fitnessMantra = e.target.value;
                        if (/^[a-zA-Z\s]*$/.test(fitnessMantra)) {
                            setEmpFitnessMantra(fitnessMantra);
                        }
                        else{
                            alert('It should be only string')
                        }
                    }
                }></input><br /><br />
                
                </div>
                
                </div>
                <center>
                    <button type='submit' >Submit</button>
                </center>
                
            </form>
            </div>
            
        </div>
        </center>
    </div>
    
  )
}

export default Register