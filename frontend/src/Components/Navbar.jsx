import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate= useNavigate()
  return (
          <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">🚌 Bus Yatra</h1>
        <div className="space-x-6">
          <a href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </a>
          <Link to="/mybookings" className="text-gray-600 hover:text-blue-600">
            My Bookings </Link>
       
          <Link className='text-gray-600 hover:text-blue-600' to={"/contact"} > Contact Us </Link>
          <button onClick={()=> navigate("/login")} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Login
          </button>
        </div>
      </nav>
  )
}

export default Navbar