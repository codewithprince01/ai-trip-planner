import { db } from '@/services/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrip() {

  const navigate = useNavigate()
  const [userTrips, setUserTrips] = useState([]);

  useEffect(()=>{
    GetUsertrip();
  },[])

  const GetUsertrip=async()=>{
    const user=JSON.parse(localStorage.getItem('user'));
  

    if(!user){
    navigate('/')
    return ;
    }
    setUserTrips([]);
    const  q=query(collection(db,'AITrips'),where('userEmail','==',user?.email))

    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(preVal=>[...preVal, doc.data()])
});

  }



  return (
    <div className="sm:px-10 md:px-20 lg:px-56 xl:px-72 mt-10">
      <h2 className="font-bold text-3xl mb-5">My Trips</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {userTrips.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  )
}

export default MyTrip