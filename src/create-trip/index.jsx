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
        <div className="relative min-h-screen bg-gradient-to-r from-white via-teal-100 to-teal-200 text-teal-900 py-8 px-4 sm:px-10 md:px-16 lg:px-32 xl:px-48">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            Tell us your travel preferences 🏕️🌴
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 text-center mt-4">
            Just provide some basic information, and our trip planner will generate
            a customized itinerary based on your preferences.
          </p>
    
          <div className="mt-12 space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4">
                What is your destination of choice?
              </h2>
              <Input
                className="w-full p-3 md:p-4 border-2 rounded-lg focus:outline-none shadow-lg bg-white text-teal-900"
                placeholder="Enter your destination"
                type="text"
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
    
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4">
                How many days are you planning for your trip?
              </h2>
              <Input
                className="w-full p-3 md:p-4 border-2 rounded-lg focus:outline-none shadow-lg bg-white text-teal-900"
                placeholder="Ex. 3"
                type="number"
                onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              />
            </div>
    
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4">
                What is your Budget?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {SelectBudgetOption.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={`p-5 rounded-lg border-2 cursor-pointer transition-transform ease-in-out transform ${
                      formData?.budget === item.title
                        ? "shadow-xl border-teal-500 bg-gradient-to-r from-teal-100 to-teal-300"
                        : "shadow-md border-teal-300 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r from-teal-100 to-teal-300"
                    }`}
                  >
                    <h2 className="text-4xl md:text-5xl text-teal-900">
                      {item.icon}
                    </h2>
                    <h2 className="font-bold text-base md:text-lg text-teal-900">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">{item.decs}</p>
                  </div>
                ))}
              </div>
            </div>
    
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4">
                Who do you plan on traveling with?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {SelectTravelesList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("travelers", item.people)}
                    className={`p-5 rounded-lg border-2 cursor-pointer transition-transform ease-in-out transform ${
                      formData?.travelers === item.people
                        ? "shadow-xl border-teal-500 bg-gradient-to-r from-teal-100 to-teal-300"
                        : "shadow-md border-teal-300 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r from-teal-100 to-teal-300"
                    }`}
                  >
                    <h2 className="text-4xl md:text-5xl text-teal-900">
                      {item.icon}
                    </h2>
                    <h2 className="font-bold text-base md:text-lg text-teal-900">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">{item.decs}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          <div className="mt-12 flex justify-center">
            <Button
              disabled={loading}
              onClick={onGenerateTrip}
              className="text-lg sm:text-xl px-6 py-4 md:py-5 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-xl transition-transform ease-in-out transform hover:scale-105 hover:shadow-2xl"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
              ) : (
                "Generate Trip"
              )}
            </Button>
          </div>
    
          <Dialog open={openDialog}>
            <DialogContent className="w-[90%] md:w-[70%] lg:w-[50%] p-6 rounded-xl shadow-xl">
              <DialogHeader>
                <DialogDescription>
                  <div className="flex items-center mb-4">
                    <a href="/">
                      <img
                        src="images/logo.png"
                        alt="Logo"
                        className="w-12 md:w-16 h-12 md:h-16 mr-4"
                      />
                    </a>
                    <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-400">
                      AI Trip Planner
                    </h1>
                  </div>
                  <h2 className="font-bold text-lg md:text-2xl text-gray-900">
                    Sign In With Google
                  </h2>
                  <p className="text-gray-700 text-sm md:text-lg">
                    Sign in to securely generate trips.
                  </p>
                  <Button
                    onClick={login}
                    className="mt-4 w-full flex gap-4 items-center justify-center bg-gray-700 text-white py-3 rounded-lg hover:scale-105 transition-transform ease-in-out"
                  >
                    <FcGoogle className="h-6 w-6" /> Sign In With Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
