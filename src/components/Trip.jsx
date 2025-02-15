import React from "react";

const Trip = ({ trip, index, removeTrip }) => {
  return (
    <div className="p-4 border rounded-md mb-2 flex items-center justify-between bg-gray-50">
      <div>
        <p className="font-semibold text-lg">{trip.label}</p>

        <div className="flex text-xs space-x-1">
        <p className="text-sm text-gray-700">
          Frequency: <span className="font-medium">{trip.frequency}</span>
        </p>
        <p className="text-sm text-gray-700">
          Distance per trip: <span className="font-medium">{trip.distance} miles</span>
        </p>
        <p className="text-sm text-gray-700">
          Total yearly distance: <span className="font-medium">{trip.total} miles</span>
        </p>
        </div>
       
      </div>
      <button
        type="button"
        onClick={() => removeTrip(index)}
        className="text-red-500 font-bold text-xl ml-4"
      >
        ×
      </button>
    </div>
  );
};

export default Trip;
