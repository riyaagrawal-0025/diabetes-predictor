import React from 'react'
import { Link } from 'react-router-dom'
function SignUp() {
  return (
   <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-96'>
            <h2 className='text-2xl font-bold text-center text-teal-600 mb-6'>Sign up</h2>
            <form className='flex flex-col space-y-4'>
                <input type="text" placeholder='Full Name' className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                <input type="email" placeholder='Email' className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                <input type="password" placeholder='Password' className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2  focus:ring-teal-500'></input>
                <Link to="/" className='bg-teal-600 text-center text-white py-3 rounded-lg hover:bg-teal-700'>Sign up</Link>
            </form>
            <p className='text-sm text-gray-600 mt-4 text-center'>Already have an account?{" "}
                <a href="/login" className='text-teal-600 hover:underline'>Login</a>
            </p>  
        </div>
    </div>
  )
}

export default SignUp
