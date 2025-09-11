import React, {useState, useEffect} from 'react';
import { Link , useNavigate} from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [auth, setAuth]= useState(false);

  useEffect(()=>{
    const token= localStorage.getItem('token');
    if(token){
      setAuth(true)
    }
    else{
      setAuth(false)
    }
  },[]);

  return (
      <nav className='flex justify-between items-center p-5 bg-white shadow-md'>
        <h1 className='text-2xl font-bold text-teal-600'>
            Diabetes Predict
        </h1>
        <ul className='flex space-x-6 text-gray-700 font-medium'>
            <li className='hover:text-teal-600 cursor-pointer'>Home</li>
            <li className='hover:text-teal-600 cursor-pointer'>About</li>
            <li className='hover:text-teal-600 cursor-pointer'>Contact</li>
        </ul>
        {!auth && <Link to="/login" className='bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-tea'>Login</Link>}
        {auth && <button onClick={()=>{
          localStorage.removeItem('token');
          navigate('/login');
        }} className='bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700'>Logout</button>}
      </nav>
  )
}

export default Navbar;