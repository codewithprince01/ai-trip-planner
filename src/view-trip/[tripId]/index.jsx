import { db } from "@/services/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Hotel from "../Components/Hotel";
import PlacesToVisit from "../Components/PlacesToVisit";
import Footer from "../Components/Footer";
import InfoSection from "../Components/InfoSection";


function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("document", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("no such document");
      toast("No trip found");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 via-teal-100 to-teal-200 p-10 md:px-20 lg:px-44 xl:px-56">
      <div className="text-teal-900 text-center">
        <h1 className="font-bold text-4xl mb-6 text-teal-800">
          {trip?.tripTitle}
        </h1>

        <div className="p-2 mb-8">
          <InfoSection trip={trip} />
        </div>

        <div className=" p-6  mb-8">
          <Hotel trip={trip} />
        </div>

        <div className="p-6  mb-8">
          <PlacesToVisit trip={trip} />
        </div>

        <Footer trip={trip} />
      </div>
    </div>
  );
}

export default ViewTrip;
