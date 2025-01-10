import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import { db } from "@/services/FirebaseConfig";

function MyTrip() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrip();
  }, []);

  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 via-teal-100 to-teal-300 p-6 flex flex-col items-center justify-start relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
        style={{ backgroundImage: "url('/your-background-image.jpg')" }}
      ></div>

      <div className="w-full sm:px-6 lg:px-24 xl:px-40 mt-10 z-10">
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-5 text-teal-600 flex items-center gap-3">
          ✈️ My Trips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {userTrips.length > 0
            ? userTrips.map((trip) => (
                <UserTripCardItem key={trip.id} trip={trip} />
              ))
            : Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[180px] sm:h-[220px] w-full bg-gradient-to-r from-teal-200 to-teal-300 animate-pulse rounded-xl shadow-md hover:shadow-xl transition-all ease-in-out transform hover:scale-105"
                ></div>
              ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-teal-300 opacity-40 z-[-1]"></div>
    </div>
  );
}

export default MyTrip;
