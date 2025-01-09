import React from 'react';

function Footer({ trip }) {
  return (
    <div className="my-7 text-center">
      <h2 className="text-lg font-semibold text-gray-500">
        🛫 Logged in as <span className="text-teal-600">{trip.userEmail}</span>
      </h2>
      <p className="text-sm text-gray-400 mt-2">
        Thank you for using our travel service. We hope you enjoy your trip!
      </p>
    </div>
  );
}

export default Footer;
