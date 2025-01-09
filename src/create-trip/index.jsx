import { Input } from "@/components/ui/input";
import { Plane } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {}, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
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

      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData
        ,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });

      toast("Trip saved successfully!");
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      toast("Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-white via-teal-100 to-teal-200 text-teal-900 py-10 px-5 sm:px-10 md:px-32 lg:px-56">
      <h1 className="text-5xl font-bold text-center">
        Tell us your travel preferences 🏕️🌴
      </h1>
      <p className="text-slate-600 text-3xl text-center mt-4">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-16 space-y-12">
        <div>
          <h2 className="text-3xl font-medium mb-4">
            What is destination of choice?
          </h2>
          <Input
            className="w-full p-4 border-2 rounded-lg focus:outline-none shadow-lg bg-white text-teal-900"
            placeholder="Enter your destination"
            type="text"
            onChange={(e) => {
              setPlace(e.target.value);
              handleInputChange("location", e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-3xl font-medium mb-4">
            How many days are you planning your trip?
          </h2>
          <Input
            className="w-full p-4 border-2 rounded-lg focus:outline-none shadow-lg bg-white text-teal-900"
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-3xl font-medium mb-4">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-transform ease-in-out transform ${
                  formData?.budget === item.title
                    ? "shadow-2xl border-teal-500 bg-gradient-to-r from-teal-100 to-teal-300"
                    : "shadow-md border-teal-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r from-teal-100 to-teal-300"
                }`}
              >
                <h2 className="text-5xl text-teal-900">{item.icon}</h2>
                <h2 className="font-bold text-lg text-teal-900">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-600">{item.decs}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-medium mb-4">
            Who do you plan on traveling with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("travelers", item.people)}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-transform ease-in-out transform ${
                  formData?.travelers === item.people
                    ? "shadow-2xl border-teal-500 bg-gradient-to-r from-teal-100 to-teal-300"
                    : "shadow-md border-teal-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r from-teal-100 to-teal-300"
                }`}
              >
                <h2 className="text-5xl text-teal-900">{item.icon}</h2>
                <h2 className="font-bold text-lg text-teal-900">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-600">{item.decs}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-end">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="text-xl py-6 px-8 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-xl transition-all ease-in-out transform hover:scale-110 hover:shadow-2xl hover:opacity-90 focus:ring-4 focus:ring-teal-400"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin h-7 w-7 mr-2" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} className="transition-all transform">
        <DialogContent className="bg-gradient-to-r from-gray-100 to-gray-300 p-8 rounded-xl shadow-xl max-w-md mx-auto">
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center mb-6">
                <a href="/">
                  <img
                    src="images/logo.png"
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
