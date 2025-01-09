import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  return (
    <div className="bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
      <img
        src="/images/aeroplane.avif"
        className="h-[450px] w-full object-cover rounded-xl mb-6 transition-all transform hover:scale-105"
        alt="Trip"
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-5 max-w-xl">
          <h2 className="font-bold text-3xl text-teal-800">
            {trip?.userSelection?.location}
          </h2>

          <div className="flex flex-wrap gap-4">
            <div className="p-2 px-4 bg-white rounded-full shadow-md text-teal-700 text-sm font-semibold transition-all duration-200 hover:bg-teal-100">
              📆 {trip?.userSelection?.noOfDays} Days
            </div>
            <div className="p-2 px-4 bg-white rounded-full shadow-md text-teal-700 text-sm font-semibold transition-all duration-200 hover:bg-teal-100">
              💰 {trip?.userSelection?.budget} Budget
            </div>
            <div className="p-2 px-4 bg-white rounded-full shadow-md text-teal-700 text-sm font-semibold transition-all duration-200 hover:bg-teal-100">
              🥂 {trip?.userSelection?.travelers} Traveler
              {trip?.userSelection?.travelers > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <Button className="bg-teal-600 text-white rounded-full flex items-center py-3 px-6 gap-3 shadow-lg hover:bg-teal-700 transition-all duration-200 transform hover:scale-105">
          <IoIosSend size={24} />
          <span>Send Info</span>
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
