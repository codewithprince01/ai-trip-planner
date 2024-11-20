import React from 'react'
import { Button } from '../button'
import { Link} from 'react-router-dom'

export default function () {
  return (
    <div className='flex flex-col items-center mx-56 gap-5 '>
       <h1 className='text-center text-red-600 text-[4rem] mt-14  font-extrabold'>Discover Your Next Adventure with AI:</h1>
       <h1 className='text-center text-black text-[4rem] font-extrabold  '>Personalized Itineraries at Your Fingertips</h1>
       <p className='text-center text-slate-600 text-[1.6rem] mt-8  '>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
    <Link to={'/create-trip'}>
       <Button className='text-center items-center mt-10 text-xl py-6'>Get Started, It's Free</Button>
       </Link>
    </div>
  )
}
