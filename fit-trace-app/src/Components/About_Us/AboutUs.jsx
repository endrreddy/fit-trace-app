import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function AboutUs() {
  return(localStorage.getItem('isLoggedIn'))? (
    <div>
      <div className="logo">
          <a href="/" className="logo-flex">
            <h1 className='fit-trace-login'>
              FIT <span>TRAcE</span>
            </h1>
          </a>
        </div>
        <center><h1 className='register'>About Us</h1></center>
        <div className="falogohome"> <Link className='fahomelogo' to='/' ><FaHome /> </Link></div>   
    </div>
  ) :
  (
    <div>
      {
        window.location.replace('/')
      }
    </div>    
  )
}

export default AboutUs