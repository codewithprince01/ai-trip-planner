import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  return (
    <Link to={'/view-trip/'+trip.id} >
    <div className='hover:scale-105 transition-all '>
        <img src='/aeroplane.avif' className='object-cover rounded-xl hover:shadow-md h-[220px]'/>

        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='font-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip {trip?.userSelection?.budget} Budugt</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem