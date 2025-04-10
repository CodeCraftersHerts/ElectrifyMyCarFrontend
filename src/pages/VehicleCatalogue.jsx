import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MobileNavBar from "../components/MobileNavBar";
import Footer from "../components/Footer";
import { fetchVehicles } from "../utils/fetchVehicles";
import StepsNavigator from "../components/StepsNavigator";

const VehicleCatalogue = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchVehicles();
      setVehicles(data);
    };
    getData();
  }, []);

  const rowDefinitions = [
    { label: "Retail Price( £)", field: "price" },
    { label: "Battery Range (miles)", field: "batteryRange" },
    { label: "Brake Horse Power (bhp)", field: "brakeHorsePower" },
    { label: "Top Speed (mph)", field: "topSpeed" },
    { label: "2.3kW - Three-pin Plug (Slow) charge to 100%", field: "slowChargeTime" },
    { label: "22kW - Home charging Point (Fast) charge to 100%", field: "fastChargeTime" },
    { label: "50kW - Public Charging Point (Rapid) charge to 80%", field: "rapidChargeTime" },
    { label: "Top up Charge up to 30 miles Public Station", field: "topUpChargeTime" },
    { label: "Battery Capacity (kWh)", field: "batteryCapacity" },
    { label: "Vehicle h x l x w (mm)", field: "dimensions" },
    { label: "Luggage Capacity with seats down (litres)", field: "luggageCapacitySeatsDown" }
  ];

  const availableRows =
    vehicles.length > 0
      ? rowDefinitions.filter((row) =>
          vehicles.every((vehicle) => vehicle.hasOwnProperty(row.field))
        )
      : rowDefinitions;

  const headers = ["Property", ...vehicles.map((vehicle) => vehicle.carMake)];

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-800">
      <Navbar />
      <MobileNavBar />

      <StepsNavigator className="mt-28" currentStep={4} />
      <header className="text-center my-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Vehicle catalogue</h1>
          <p className="text-xl mx-auto max-w-2xl">
          Explore detailed specs and charging times for different electric vehicles.
          </p>
        </header>

     

      <div className="text-white text-4xl mt-12 font-bold self-center"></div>

      <div className="mt-10 mx-auto w-full md:w-10/12 xl:w-11/12 overflow-auto ring-2 ring-slate-500 rounded-lg">
        <table className="border-slate-500 text-white text-sm table-fixed w-max">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className={`
                    border border-slate-600 px-4 py-3 text-center font-bold 
                    whitespace-normal break-words
                    ${i === 0 ? "sticky left-0 z-10 bg-gray-800 max-w-[200px]" : "bg-gray-700 max-w-[150px]"}
                  `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {availableRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-gray-800 odd:bg-gray-900">
                <td
                  className="
                    border border-slate-600 px-4 py-4 text-center sticky left-0 z-0 bg-gray-800 font-bold
                    whitespace-normal break-words max-w-[200px]
                  "
                >
                  {row.label}
                </td>
                {vehicles.map((vehicle, colIndex) => (
                  <td
                    key={colIndex}
                    className="
                      border border-slate-600 px-4 py-4 text-center 
                      whitespace-normal break-words max-w-[150px]
                    "
                  >
                    {vehicle[row.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleCatalogue;
