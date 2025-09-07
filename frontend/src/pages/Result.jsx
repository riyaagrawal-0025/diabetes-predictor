import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Result({result}) {
    const navigate=useNavigate();
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50  to-green-50'>
        <div className='bg-white p-10 rounded-2xl shadow-xl text-center w-[400px]'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Prediction result</h2>
            <p className='text-lg text-gray-700 mg-6'>
                {result===1 ? "⚠️ High Risk of Diabetes": " Low Risk of Diabetes"}
            </p>
            <button onClick={()=>navigate("/predict")} className='bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700'>Try Again</button>
        </div>  
    </div>
  );
}

export default Result
