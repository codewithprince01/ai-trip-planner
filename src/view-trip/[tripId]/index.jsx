import { db } from '@/services/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../Components/infoSection';
import Hotel from '../Components/Hotel';
import PlacesToVisit from '../Components/PlacesToVisit';
import Footer from '../Components/Footer';

function ViewTrip() {

    const {tripId} = useParams();
    const [trip, setTrip] = useState([])

    useEffect(()=>{
     tripId&& GetTripData();
    },[tripId])
    
    const GetTripData=async()=>{
         const docRef = doc(db,'AITrips',tripId)
         const docSnap = await getDoc(docRef);

         if(docSnap.exists()){
            console.log("document",docSnap.data());
            setTrip(docSnap.data());
         }else{
            console.log("no such document")
            toast("No trip found")
         }
    }


  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 '>
        <InfoSection trip={trip}/>
        <Hotel trip={trip}/>
        <PlacesToVisit trip={trip}/>
        <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip