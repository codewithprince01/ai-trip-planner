import React from 'react';
import { Link } from 'react-router-dom';

function PlaceCard({ place }) {
  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${place.name}`} 
      target="_blank"
      className="transform transition-all hover:scale-105 hover:shadow-lg hover:bg-teal-50"
    >
      <div className="border rounded-xl p-5 mt-5 flex gap-5 shadow-sm bg-white hover:border-teal-500 cursor-pointer">
        <img 
          src='/images/aeroplane.avif' 
          alt={place.name}
          className='w-[150px] h-[150px] rounded-xl object-cover transition-transform duration-300 ease-in-out'
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-semibold text-xl text-teal-700 mb-2">{place.name}</h2>
          <p className="text-sm text-gray-500 mb-3">{place.details}</p>
          <div className="flex justify-between items-center">
            <h2 className="text-md text-teal-600">⏰ {place.time}</h2>
            {/* <Button className='mt-2' size="sm"><FaMapLocation /></Button> */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
