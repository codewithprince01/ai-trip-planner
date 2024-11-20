// import { Button } from '@/components/ui/button'
// import { FaMapLocation } from "react-icons/fa6";

import React from 'react'
import { Link } from 'react-router-dom'

function PlaceCard({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.name} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src='/aeroplane.avif' className='w-[130px] h-[150px] rounded-xl'/>
        <div>
          
            <h2 className='font-bold text-lg '>{place.name}</h2>
            <p className='text-sm text-gray-400'>{place.details}</p>
            <h2 className='mt-2'>⏰{place.time}</h2>
            {/* <Button className='mt-2' size="sm"  ><FaMapLocation />
            </Button> */}
        </div>
    </div>
    </Link>
  )
}

export default PlaceCard