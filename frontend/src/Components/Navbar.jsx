import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate= useNavigate()
    const token = localStorage.getItem('token');

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      navigate('/login');
    };

  return (
          <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">🚌 Bus Yatra</h1>
        <div className="space-x-6">
          <a href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </a>
          <Link to="/my-bookings" className="text-gray-600 hover:text-blue-600">
            My Bookings </Link>
       
          <button 
            onClick={token ? handleLogout : () => navigate("/login")} 
            className={`px-4 py-2 text-white rounded-xl transition ${token ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {token ? "Logout" : "Login"}
          </button>
        </div>
      </nav>
  )
}

export default Navbar