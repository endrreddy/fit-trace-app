import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import bcrypt from 'bcryptjs'
import './Login.css'



function Login() {
    const [employeeid , setEmployeeid ] = useState('');
    const [password , setPassword] = useState('');
    
    const handleLogin =(e)=>{
        e.preventDefault();
        axios.get('https://u6rbpq9oii.execute-api.ap-south-1.amazonaws.com/v2/user?key='+employeeid)
        .then(
            (response) =>{
                 const datares = response.data;
                // console.log(response.data)
                 if(bcrypt.compareSync(password, datares.response.password)){
                    alert("Success")
                    // window.location.replace('/fit-trace/home')
                    localStorage.setItem('user', JSON.stringify(datares.response) )
                    localStorage.setItem('employeeid',parseInt(datares.response.employeeid))
                    console.log(localStorage.getItem('employeeid'))
                    console.log(localStorage.getItem('user'))
                    window.localStorage.setItem('isLoggedIn',true)
                    window.location.href='/fit-trace/home';
                 }
                 else{
                    alert("Incorrect Username/ Password")
                 }
                
            }
        )
        
    }

  return (
    <div className='login'>
        <div className="logo">
          <a href="/" className="logo-flex">
            <h1 className='fit-trace-login'>
              FIT <span>TRAcE</span>
            </h1>
          </a>
        </div>
        <form onSubmit={handleLogin}>
        <div className="card">
            <center><h1 className='login'>Login</h1></center>
            <label htmlFor="Employee Id">Employee Id :</label>
            <div><input type="text"
             placeholder='Employee Id'
             value={employeeid}
             onChange={(e) =>
                setEmployeeid(e.target.value)
             } /></div>
            
            <label htmlFor="Password">Password :</label>
            <div>
            <input type="password" 
             placeholder='Password'
             value={password}
             onChange ={(e) => 
                setPassword(e.target.value)
             } />
            </div>
            
            <div>
                <button className='btn-primary' type='submit'>Log In</button>
                <p>
                    Don't have an account?
                </p>
                <a className='btn'href="/fit-trace/register">Register </a>
            </div>
            

        </div>
        </form>
        
    </div>
  )
}

export default Login