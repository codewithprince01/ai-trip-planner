import { Button } from '@/components/ui/button'
import { IoIosSend } from "react-icons/io";

// import React, { useEffect } from 'react'
// import  GetPlaceDetails  from '@/services/GlobalApi';
 
function InfoSection({trip}) {

  // useEffect(()=>{
  //   trip&&GetPlacePhoto();
  // },[trip])

  // const GetPlacePhoto=async()=>{

  //   const data = {
  //     textQuery:trip?.userSelection?.location
  //   }
  //   const result = await GetPlaceDetails(data).then((res)=>{
  //     console.log(res.data)
  //   })
  // }



  return (
    <div>
       <img src='/aeroplane.avif' className='h-[400px] w-full object-cover rounded-xl'/>

    <div className='flex justify-between items-center'> 
       <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
        <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📆{trip?.userSelection?.noOfDays} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂No.of Traveler: {trip?.userSelection?.travelers} </h2>
        </div>
       </div>
       <Button><IoIosSend /></Button>
       </div>
    </div>
  )
}

export default InfoSection