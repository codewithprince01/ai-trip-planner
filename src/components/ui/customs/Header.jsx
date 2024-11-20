import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";


export default function() {

  const user = JSON.parse(localStorage.getItem('user'))
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload()
      });
  };



  useEffect(()=>{
    console.log(user)
  },[])


  return (
    <div className='p-3 shadow-sm flex justify-between items-centerm px-6'>
        <img className='ml-8' src='/logo.svg'></img>
        <div>{user?<div className='flex flex-wrap gap-3 items-center '>
          <a href='/create-trip'>
          <Button variant='outline' className='rounded-full '>+ Create Trip</Button></a>
          <a href='/my-trips'>
          <Button variant='outline' className='rounded-full '>My Trip</Button></a>
         
          <Popover>
              <PopoverTrigger> <img src={user?.picture} className='rounded-full w-10 h-10'/></PopoverTrigger>
              <PopoverContent className='cursor-pointer' onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Logout</PopoverContent>
            </Popover>
        </div>:<Button className='text-lg p-7 mr-8' onClick={()=>setOpenDialog(true)}>Sign in</Button>}
        </div>
        <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg"></img>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
       
    </div>
  )
}

