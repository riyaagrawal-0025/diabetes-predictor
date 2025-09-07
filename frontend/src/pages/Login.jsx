import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-96'>
            <h2 className='text-2xl font-bold text-center text-teal-600 mb-6'>Login</h2>
            <form className='flex flex-col space-y-4'>
                <input type="email" placeholder='Email' className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                <input type="password" placeholder='Password' className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                <Link to="/" className='bg-teal-600 text-center text-white py-3 rounded-lg hover:bg-teal-700'>Login</Link>
            </form>
            <p className='text-sm text-gray-600 mt-4 text-center'>Don't have an account?{" "}
                <a href="/signup" className='text-teal-600 hover:underline'>Signup</a>
            </p>  
        </div>
    </div>
  )
}

export default Login
