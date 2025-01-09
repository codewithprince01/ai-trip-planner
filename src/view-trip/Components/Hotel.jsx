import React from 'react';
import { Link } from 'react-router-dom';

function Hotel({ trip }) {
  return (
    <div className="my-8">
      <h2 className="font-extrabold text-4xl text-teal-900 mb-8 text-center">✨ Hotel Recommendations ✨</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <Link
            key={hotel?.id || index}
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.name},${hotel?.address}`}
            target="_blank"
            className="transform hover:scale-105 transition-all duration-500 ease-in-out"
          >
            <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl overflow-hidden max-w-sm w-full">
              <div className="relative w-full h-56">
                <img
                  src="/images/aeroplane.avif" // You should replace this with a hotel image URL if available
                  alt={hotel.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-teal-800 to-transparent opacity-40"></div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-2xl text-teal-900 mb-3">{hotel.name}</h3>
                <p className="text-sm text-gray-600 mb-3">📍{hotel?.address}</p>
                <div className="flex items-center justify-between text-sm sm:text-md">
                  <span className="font-bold text-xl text-teal-600">💸 {hotel.price}</span>
                  <div className="flex items-center">
                    <span className="text-teal-500 text-lg">{`⭐ ${hotel.rating}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotel;
