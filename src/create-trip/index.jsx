import { Input } from "@/components/ui/input";
import { Plane } from "lucide-react";
import React, { useEffect, useState } from "react";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelesList,
} from "@/constant/Options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/services/AIModal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import { json } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {}, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async (name, value) => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDay > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.travelers
    ) {
      toast("Please fill all details.");

      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.travelers)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

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
        onGenerateTrip();
      });
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        throw new Error("User not found");
      }
  
      const docId = Date.now().toString(); // Generate a unique doc ID based on the current timestamp
  
      // Use setDoc to specify a custom document ID
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId, // Store the document ID in the data
      });
  
      toast("Trip saved successfully!");
      navigate(`/view-trip/${docId}`); // Navigate to the view trip page with the docId
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl-10 px-5 mt-10 ">
      <h1 className="text-5xl font-bold">
        Tell us your travel preferences 🏕️🌴
      </h1>
      <p className="text-slate-600 text-3xl mt-4">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-32 flex flex-col">
        <div>
          <h2 className="text-3xl font-medium mb-4">
            What is destination of choice?
          </h2>
          <Input
            placeholder="Enter your destination"
            type="text"
            onChange={(e) => {
              setPlace(e.target.value);
              handleInputChange("location", e.target.value);
            }}
          ></Input>
        </div>
        <div>
          <h2 className="text-3xl font-medium mt-16 mb-4 ">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          ></Input>
        </div>
        <div>
          <h2 className="text-3xl font-medium mt-16 mb-4 ">
            What is Your Budget?
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-5  mt-5">
          {SelectBudgetOption.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 rounded-lg hover:shadow-lg p-8 border-2 ${
                formData?.budget == item.title && "shadow-2xl border-black"
              }`}
            >
              <h2 className="text-6xl ">{item.icon}</h2>
              <h2 className="font-bold text-[1.5rem]">{item.title}</h2>
              <h2 className="text-[1.3rem] text-gray-500">{item.decs}</h2>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl font-medium mt-16 mb-4 ">
            Who do you plan on traveling with on your next adventure?
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-5  mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("travelers", item.people)}
              className={`p-4 rounded-lg hover:shadow-lg p-8 border-2 ${
                formData?.travelers == item.people && "shadow-2xl border-black"
              }`}
            >
              <h2 className="text-6xl">{item.icon}</h2>
              <h2 className="font-bold text-[1.5rem]">{item.title}</h2>
              <h2 className="text-[1.3rem] text-gray-500">{item.decs}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className=" my-20 justify-end flex ">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="text-xl py-6 justify-end "
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
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
  );
}
