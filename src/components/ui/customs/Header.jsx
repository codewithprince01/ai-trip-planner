import React, { useEffect, useState } from "react";
import { Button } from "../button";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
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
        window.location.reload();
      });
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="p-4 shadow-md bg-gradient-to-r  from-teal-100 via-teal-200 to-teal-300 flex justify-between items-center px-8">
      <div className="flex items-center">
        <a href="/">
          <img
            src="/images/logo.png"
            alt="AI Trip Planner Logo"
            className="w-16 h-16 mr-2 cursor-pointer hover:scale-105 transition-transform"
          />
        </a>
        <a
          href="/"
          className="hover:scale-110 transition-transform duration-300"
        >
          <h1 className="text-4xl font-extrabold tracking-tight font-[Merriweather] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 flex items-center gap-3">
            AI Trip Planner
          </h1>
        </a>
      </div>

      <div>
        {user ? (
          <div className="flex flex-wrap gap-4 items-center">
            <a href="/create-trip">
              <Button className="rounded-full px-5 py-2 bg-teal-500 text-white hover:bg-teal-600 hover:text-gray-100 transition-all shadow-md">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button className="rounded-full px-5 py-2 bg-teal-500 text-white hover:bg-teal-600 hover:text-gray-100 transition-all shadow-md">
                My Trip
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="User Profile"
                  className="rounded-full w-12 h-12 border-2 border-teal-300 cursor-pointer hover:scale-110 transition-transform shadow-sm"
                />
              </PopoverTrigger>
              <PopoverContent className="bg-white text-teal-800 text-sm py-2 px-4 rounded-lg shadow-md">
                <p
                  className="cursor-pointer hover:text-teal-500"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </p>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            className="text-lg px-6 py-2 font-semibold bg-teal-500 text-white hover:bg-teal-600 hover:text-gray-100 rounded-md shadow-lg transition-all"
            onClick={() => setOpenDialog(true)}
          >
            Sign in
          </Button>
        )}
      </div>

      <Dialog open={openDialog} className="transition-all transform">
        <DialogContent className="bg-gradient-to-r from-gray-100 to-gray-300 p-8 rounded-xl shadow-xl max-w-md mx-auto">
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center mb-6">
                <a href="/">
                  <img
                    src="/images/logo.png"
                    alt="AI Trip Planner Logo"
                    className="w-16 h-16 mr-4 cursor-pointer hover:scale-105 transition-transform ease-in-out"
                  />
                </a>
                <a
                  href="/"
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <h1 className="text-4xl font-extrabold tracking-tight font-[Merriweather] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 flex items-center gap-3">
                    AI Trip Planner
                  </h1>
                </a>
              </div>

              <h2 className="font-bold text-2xl text-gray-900 mb-3">
                Sign In With Google
              </h2>
              <p className="text-gray-700 text-lg mb-5">
                Sign in to the app with Google authentication securely
              </p>

              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center justify-center bg-gray-700 text-white rounded-lg py-4 transition-all ease-in-out transform hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-gray-500"
              >
                <FcGoogle className="h-7 w-7" /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
