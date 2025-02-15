import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ComparisonPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  // Calculate total distance from trips or use default.
  // If trips were entered in km (inputType === "km"), assume the stored totals are in km.
  // We convert them to miles (1 mile = 1.60934 km) for the fuel emissions calculation.
  let totalDistance = formData?.trips?.length
    ? formData.trips.reduce((acc, trip) => acc + (parseFloat(trip.total) || 0), 0)
    : 1000;
  const totalMiles = formData.inputType === "km" ? totalDistance / 1.60934 : totalDistance;

  // Determine fuel efficiency and fuel consumption based on input type.
  let fuelEfficiency = parseFloat(formData.efficiency) || 0;
  let fuelConsumedLiters = 0;
  if (formData.inputType === "miles") {
    // Efficiency is in mpg: convert miles to gallons, then gallons to liters (1 gallon = 3.785 L)
    fuelConsumedLiters = fuelEfficiency ? (totalMiles / fuelEfficiency) * 3.785 : 0;
  } else {
    // Efficiency is in km/l. Convert total miles to km (1 mile = 1.60934 km), then calculate liters.
    const totalKm = totalMiles * 1.60934;
    fuelConsumedLiters = fuelEfficiency ? totalKm / fuelEfficiency : 0;
  }

  // Emission factors (kg CO₂ per liter)
  let fuelEmissionFactor = 2.31;
  if (formData.fuelType === "diesel") {
    fuelEmissionFactor = 2.68;
  }
  const fuelCO2Emissions = fuelConsumedLiters * fuelEmissionFactor;

  const evOptions = [
    { 
      type: 'Small', 
      name: 'Small EV',
      batteryType: 'Lithium-ion',
      kw: 50,
      consumption: 0.28, // kWh per mile
      tariffs: {
        home: "£0.15/kWh",
        night: "£0.09/kWh",
        station: "£0.30/kWh"
      },
      estimatedSavings: 200
    },
    { 
      type: 'Mid', 
      name: 'Mid EV',
      batteryType: 'Lithium-ion',
      kw: 75,
      consumption: 0.30,
      tariffs: {
        home: "£0.15/kWh",
        night: "£0.09/kWh",
        station: "£0.30/kWh"
      },
      estimatedSavings: 300
    },
    { 
      type: 'Large', 
      name: 'Large EV',
      batteryType: 'Lithium-ion',
      kw: 100,
      consumption: 0.32,
      tariffs: {
        home: "£0.15/kWh",
        night: "£0.09/kWh",
        station: "£0.30/kWh"
      },
      estimatedSavings: 400
    },
    { 
      type: 'Luxury', 
      name: 'Luxury EV',
      batteryType: 'Lithium-ion',
      kw: 120,
      consumption: 0.35,
      tariffs: {
        home: "£0.15/kWh",
        night: "£0.09/kWh",
        station: "£0.30/kWh"
      },
      estimatedSavings: 500
    },
  ];


  const electricityEmissionFactor = 0.2;

  return (
    <>

      <div className="bg-white w-full shadow-md h-12 fixed top-0 left-0 flex items-center px-4 z-10">
        <span className="text-xl font-bold">ElectrifyMyCar</span>
      </div>

      <div className="container mx-auto p-4 mt-16">
        <h2 className="text-3xl font-bold text-center mb-6">Your Car vs EVs</h2>
        
      
        <div className="mb-8 w-full flex align-middle justify-center">
          <div className="bg-slate-100 ring-2 max-w-96 shadow-lg rounded-lg p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
      
              <span className="text-xl text-gray-700">Img</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Your {formData.fuelType} Car</h3>
            <p className="mb-1">Fuel Price: £{formData.fuelPrice}</p>
            <p className="mb-1">
              Efficiency: {formData.efficiency} {formData.inputType === "miles" ? "mpg" : "km/l"}
            </p>
            <p className="mb-1">Total Miles: {totalMiles.toFixed(0)}</p>
            <p className="mb-1">
              Estimated CO₂ Emissions: {fuelCO2Emissions ? fuelCO2Emissions.toFixed(0) : 0} kg/year
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {evOptions.map((ev, index) => {
            // Calculate EV CO₂ emissions for each EV option.
            const evCO2Emissions = totalMiles * ev.consumption * electricityEmissionFactor;
            const carbonSavings = fuelCO2Emissions - evCO2Emissions;
  
            return (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                  {/* Placeholder for EV image */}
                  <span className="text-xl text-gray-700">Img</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{ev.name}</h3>
                <p className="mb-1">Battery: {ev.batteryType}</p>
                <p className="mb-1">Power: {ev.kw} kW</p>
                <div className="mt-2 text-center">
                  <p className="text-sm font-semibold">Charging Tariffs</p>
                  <p className="text-xs">Home: {ev.tariffs.home}</p>
                  <p className="text-xs">Night: {ev.tariffs.night}</p>
                  <p className="text-xs">Station: {ev.tariffs.station}</p>
                </div>
                <div className="mt-4 bg-green-100 rounded px-3 py-1">
                  <p className="text-green-700 text-sm">
                    Estimated Savings: £{ev.estimatedSavings}/year
                  </p>
                </div>
                <div className="mt-2 bg-blue-100 rounded px-3 py-1">
                  <p className="text-blue-700 text-sm">
                    CO₂ Emissions: {evCO2Emissions.toFixed(0)} kg/year
                  </p>
                  <p className="text-blue-700 text-xs">
                    Carbon Savings: {carbonSavings > 0 ? carbonSavings.toFixed(0) : 0} kg/year
                  </p>
                </div>
              </div>
            );
          })}
        </div>
  
     
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/comparator')}
            className="px-6 py-2 bg-red-500 text-white rounded shadow"
          >
            Start Over
          </button>
        </div>
      </div>
    </>
  );
};

export default ComparisonPage;
