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
    <div className="min-h-screen bg-gradient-to-r from-teal-50 via-teal-100 to-teal-200 p-4 sm:p-8 md:px-16 lg:px-32 xl:px-48">
      <div className="text-teal-900 text-center">

        {/* Trip Info Section */}
        <div className="p-2 mb-6 sm:mb-8 lg:mb-10">
          <InfoSection trip={trip} />
        </div>

        {/* Hotel Section */}
        <div className="p-4 sm:p-6 mb-6 sm:mb-8 lg:mb-10">
          <Hotel trip={trip} />
        </div>

        {/* Places to Visit Section */}
        <div className="p-4 sm:p-6 mb-6 sm:mb-8 lg:mb-10">
          <PlacesToVisit trip={trip} />
        </div>

        {/* Footer Section */}
        <div className="p-4 sm:p-6">
          <Footer trip={trip} />
        </div>
      </div>
    </div>
  );
}

export default ViewTrip;
