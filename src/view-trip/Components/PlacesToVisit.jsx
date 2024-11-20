import React from 'react'
import PlaceCard from './PlaceCard'

function PlacesToVisit({trip}) {
  return (
    <div >
        <h2 className='font-bold text-lg'>Places To Visit</h2>
        <div>
            {trip?.tripData?.itinerary?.map((item,index)=>(
                <div className='mt-5'>
                    <h2 className='font-medium text-lg'>Day {item.day}</h2>
                        <div className='grid lg:grid-cols-2 gap-5'>
                        {item.places?.map((place,index)=>(
                            <div >
                                <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                               <PlaceCard place={place}/>
                            </div>
                        ))}
                        </div>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit