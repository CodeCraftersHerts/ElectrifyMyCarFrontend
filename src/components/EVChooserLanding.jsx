import React from 'react';

const EVChooserLanding = () => {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-3xl font-bold text-green-600">Welcome to EV Chooser</h2>
      <p className="text-gray-700">
        Compare electric cars with traditional fuel options. Find the best choice for your lifestyle.
      </p>
      <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition-colors">
        Get Started
      </button>
    </div>
  );
};

export default EVChooserLanding;
