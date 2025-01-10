import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ trip }) {
  return (
    <div className="my-12">
       <h2 className="font-extrabold text-3xl text-teal-800 mb-8 text-center">
      Places To Visit 🌍
      </h2>
      <div>
        {Array.isArray(trip?.tripData?.itinerary) ? (
          trip.tripData.itinerary.map((item, index) => (
            <div className="mt-10" key={index}>
              <h2 className="font-semibold text-2xl text-teal-700 mb-4">
                Day {item.day}
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {Array.isArray(item.places) &&
                  item.places.map((place, index) => (
                    <div key={index} className="transition-all hover:scale-105">
                      <h2 className="font-medium text-lg text-orange-600 mb-2">
                        {place.time}
                      </h2>
                      <PlaceCard place={place} />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-xl">
            No itinerary available.
          </p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
