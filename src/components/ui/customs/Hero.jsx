import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

export default function HeroSection() {

  const images = [
    "public/road.jpg",
    "public/2.webp",
    "public/3.avif",
    "public/4.avif"
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-white via-teal-100 to-teal-200 text-teal-900">
      <div className="relative flex flex-col items-center gap-8 text-center mx-6 md:mx-16 lg:mx-32 py-16">
        <h1
          className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-extrabold text-teal-900 tracking-wide leading-tight animate-fade-down"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Embark on Your Dream Journey ✈️
        </h1>

        <h2
          className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium text-teal-800 tracking-wide animate-fade-up"
        >
          Tailored Itineraries with the Power of AI 🤖
        </h2>

        <p
          className="text-lg md:text-xl lg:text-2xl text-teal-700 mt-4 leading-relaxed animate-fade-in"
          style={{
            maxWidth: "750px",
          }}
        >
          Whether it's a solo adventure, a family holiday, or a romantic getaway, 
          let us craft the perfect trip for you. Plan smarter, travel better.
        </p>

        <Link to={'/create-trip'}>
          <Button className="px-8 py-4 mt-6 text-lg md:text-xl font-semibold bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl hover:from-purple-600 hover:to-teal-500 transform-gpu hover:scale-105 transition-all duration-300">
            Start Planning Your Trip 🚀
          </Button>
        </Link>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-zoom-in">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={`/${image}`} // Using the images from the array
                alt={`Travel Image ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
