import React from 'react'
import Login from '../Login/Login'
import Navbar from '../Navbar/Navbar'
const Home = () => {
  return(localStorage.getItem('isLoggedIn'))? (
    
    <div>
      <Navbar />
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

export default Home