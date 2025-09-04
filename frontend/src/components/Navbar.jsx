import React from 'react'

function Navbar() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col'>
      <nav className='flex justify-between items-center p-5 bg-white shadow-md'>
        <h1 className='text-2xl font-bold text-teal-600'>
            Diabetes Predict
        </h1>
        <ul className='flex space-x-6 text-gray-700 font-medium'>
            <li className='hover:text-teal-600 cursor-pointer'>Home</li>
            <li className='hover:text-teal-600 cursor-pointer'>About</li>
            <li className='hover:text-teal-600 cursor-pointer'>Contact</li>
        </ul>
        <button className='bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-tea'>SignUp/Login</button>
      </nav>
    </div>
  )
}

export default Navbar;