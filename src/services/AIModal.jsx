import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with Cheap budget, Give me a hotels option list with Hotel Name, Hotel address, Price, hotel image URL , geo coordinates, rating, description and suggest itinerary with Place Name, Place Details, Place Image URL Geo Coordinates, ticket, Pricing<rating, Time travel each of the location for  3 days with each day plan with best time to visit in one object  "JSON format".',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotel_options": [\n    {\n      "name": "The D Las Vegas",\n      "address": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "from $30 per night",\n      "image_url": "https://www.the-d.com/media/wysiwyg/The-D-Exterior-Night-View-1024x683.jpg",\n      "geo_coordinates": "36.1699, -115.1424",\n      "rating": 4.0,\n      "description": "A budget-friendly hotel located in the heart of downtown Las Vegas, offering a casino, restaurants, and live entertainment."\n    },\n    {\n      "name": "Golden Nugget Las Vegas",\n      "address": "129 E Fremont St, Las Vegas, NV 89101",\n      "price": "from $40 per night",\n      "image_url": "https://www.goldennugget.com/las-vegas/images/hotel-gallery/hotel-exterior.jpg",\n      "geo_coordinates": "36.1695, -115.1416",\n      "rating": 4.5,\n      "description": "A historic hotel with a vibrant atmosphere, featuring a casino, restaurants, a pool, and the famous shark tank."\n    },\n    {\n      "name": "Circus Circus Hotel & Casino",\n      "address": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "from $35 per night",\n      "image_url": "https://www.circuscircus.com/media/wysiwyg/Circus-Circus-Exterior.jpg",\n      "geo_coordinates": "36.1116, -115.1727",\n      "rating": 3.5,\n      "description": "A family-friendly hotel with a circus theme, offering a casino, restaurants, a midway, and a pool."\n    },\n    {\n      "name": "The Orleans Hotel & Casino",\n      "address": "4500 W Tropicana Ave, Las Vegas, NV 89103",\n      "price": "from $45 per night",\n      "image_url": "https://www.orleanscasino.com/media/wysiwyg/exterior-shot.jpg",\n      "geo_coordinates": "36.0974, -115.2029",\n      "rating": 4.0,\n      "description": "A hotel with a focus on entertainment, offering a casino, restaurants, live music, and a bowling alley."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "title": "Downtown Las Vegas & Fremont Street Experience",\n      "description": "Start your day exploring the vibrant downtown Las Vegas with a visit to the Fremont Street Experience, a pedestrian mall with live entertainment, street performers, and a canopy of LED lights.",\n      "places": [\n        {\n          "name": "Fremont Street Experience",\n          "details": "A pedestrian mall with live entertainment, street performers, and a canopy of LED lights.",\n          "image_url": "https://www.vegasexperience.com/wp-content/uploads/2019/07/Fremont-Street-Experience-las-vegas-lights.jpg",\n          "geo_coordinates": "36.1698, -115.1427",\n          "ticket": "Free",\n          "pricing": "N/A",\n          "rating": 4.5,\n          "time": "10:00 AM - 1:00 PM"\n        },\n        {\n          "name": "Golden Nugget Casino",\n          "details": "A historic casino featuring a world-famous shark tank, restaurants, and bars.",\n          "image_url": "https://www.goldennugget.com/las-vegas/images/casino-gallery/casino-floor.jpg",\n          "geo_coordinates": "36.1695, -115.1416",\n          "ticket": "Free",\n          "pricing": "N/A",\n          "rating": 4.0,\n          "time": "1:00 PM - 3:00 PM"\n        },\n        {\n          "name": "Mob Museum",\n          "details": "A museum dedicated to the history of organized crime in Las Vegas.",\n          "image_url": "https://www.themobmuseum.org/sites/default/files/styles/hero_banner_full/public/hero-images/mob-museum-exterior.jpg",\n          "geo_coordinates": "36.1687, -115.1437",\n          "ticket": "Adults: $29.95",\n          "pricing": "N/A",\n          "rating": 4.5,\n          "time": "3:00 PM - 5:00 PM"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "title": "The Strip & Bellagio Fountains",\n      "description": "Experience the iconic Las Vegas Strip, home to world-famous casinos, hotels, and entertainment venues. Don\'t miss the spectacular Bellagio Fountains show.",\n      "places": [\n        {\n          "name": "The Strip",\n          "details": "A 4.2-mile stretch of Las Vegas Boulevard South, home to world-famous casinos, hotels, and entertainment venues.",\n          "image_url": "https://www.visitlasvegas.com/sites/default/files/styles/social_share/public/2019-07/The-Strip-at-night.jpg",\n          "geo_coordinates": "36.1146, -115.1729",\n          "ticket": "Free",\n          "pricing": "N/A",\n          "rating": 5.0,\n          "time": "10:00 AM - 1:00 PM"\n        },\n        {\n          "name": "Bellagio Fountains",\n          "details": "A spectacular water and light show synchronized to music.",\n          "image_url": "https://www.bellagio.com/content/dam/bellagio/images/hero-banners/bellagio-fountains-hero-banner.jpg",\n          "geo_coordinates": "36.1171, -115.1732",\n          "ticket": "Free",\n          "pricing": "N/A",\n          "rating": 4.5,\n          "time": "1:00 PM - 3:00 PM"\n        },\n        {\n          "name": "The Venetian and The Palazzo",\n          "details": "A luxurious resort complex offering a gondola ride, shopping, dining, and entertainment.",\n          "image_url": "https://www.venetian.com/content/dam/venetian/images/hero-banners/venetian-hero-banner.jpg",\n          "geo_coordinates": "36.1181, -115.1738",\n          "ticket": "Free",\n          "pricing": "N/A",\n          "rating": 4.0,\n          "time": "3:00 PM - 5:00 PM"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "title": "Red Rock Canyon National Conservation Area",\n      "description": "Escape the hustle and bustle of the city and enjoy the scenic beauty of Red Rock Canyon National Conservation Area, a short drive from Las Vegas.",\n      "places": [\n        {\n          "name": "Red Rock Canyon National Conservation Area",\n          "details": "A scenic area with red sandstone cliffs, hiking trails, and stunning views.",\n          "image_url": "https://www.nps.gov/redr/learn/nature/images/red-rock-canyon-scenery-1.jpg",\n          "geo_coordinates": "36.1484, -115.2977",\n          "ticket": "Vehicle: $15",\n          "pricing": "N/A",\n          "rating": 4.5,\n          "time": "10:00 AM - 5:00 PM"\n        }\n      ]\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
