import React from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  return (
    <Link to={"/view-trip/" + trip.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src="/aeroplane.avif"
          alt="Trip image"
          className="object-cover rounded-xl hover:shadow-lg transition-shadow duration-300 h-[220px] w-full"
        />
        <div className="mt-4">
          <h2 className="font-bold text-xl text-teal-900 hover:text-teal-700">
            {trip?.userSelection?.location}
          </h2>
          <h2 className="text-sm text-gray-600">
            {trip?.userSelection?.noOfDays} Days trip •{" "}
            <span className="font-medium text-teal-800">
              {trip?.userSelection?.budget} Budget
            </span>
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
