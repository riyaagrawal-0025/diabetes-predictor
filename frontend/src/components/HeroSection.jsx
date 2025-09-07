import React from 'react'
import { Link } from 'react-router-dom'
function HeroSection() {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-50 to-green-50'>
      <h2 className='text-4xl font-bold text-gray-800'>Diabetes Risk Prediction</h2>
      <p className='text-lg text-gray-600 mt-4 max-w-xl'>Enter your health details and instantly know your diabetes risk.</p>
      <Link to="/predict" className='mt-6 bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700'>Get Started</Link>
      </section>
  )
}

export default HeroSection
