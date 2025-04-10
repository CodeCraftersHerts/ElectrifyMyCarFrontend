import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import MobileNavBar from "../components/MobileNavBar";
import Footer from "../components/Footer";
import { traditionalVehicles } from "../data/traditionalVehicles";
import { fetchVehicles } from "../utils/fetchVehicles";
import StepsNavigator from "../components/StepsNavigator";

const VehicleComparison = () => {
  const [electricVehicles, setElectricVehicles] = useState([]);
  const [selectedTraditionalVehicle, setSelectedTraditionalVehicle] = useState(null);
  const [selectedElectricVehicle, setSelectedElectricVehicle] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchVehicles();
      setElectricVehicles(data);
    };
    getData();
  }, []);

  const handleTraditionalSelect = (e) => {
    const selected = traditionalVehicles.find(
      (vehicle) => vehicle.model === e.target.value
    );
    setSelectedTraditionalVehicle(selected || null);
  };

  const handleElectricSelect = (e) => {
    const selected = electricVehicles.find(
      (vehicle) => vehicle.model === e.target.value
    );
    setSelectedElectricVehicle(selected || null);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-slate-800">
        <NavBar />
        <MobileNavBar />
        <StepsNavigator className="mt-28" currentStep={3} />
        <header className="text-center my-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Vehicle Comparison Tool</h1>
          <p className="text-xl mx-auto max-w-2xl">
          Choose an EV and a conventional fuel car from the dropdown selectors to compare them.
          </p>
        </header>
        <div className="flex flex-col align-middle items-center w-full px-4 mt-12">
         

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl justify-center mb-8">
            <div className="flex-1">
              <label htmlFor="traditional-select" className="block mb-1 text-white font-semibold">
                Select Convential Vehicle:
              </label>
              <select
                id="traditional-select"
                className="w-full p-2 rounded"
                onChange={handleTraditionalSelect}
                value={selectedTraditionalVehicle?.model || ""}
              >
                <option value="">-- Select --</option>
                {traditionalVehicles.map((vehicle, idx) => (
                  <option key={idx} value={vehicle.model}>
                    {vehicle.make} {vehicle.model}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="electric-select" className="block mb-1 text-white font-semibold">
                Select Electric Vehicle:
              </label>
              <select
                id="electric-select"
                className="w-full p-2 rounded"
                onChange={handleElectricSelect}
                value={selectedElectricVehicle?.model || ""}
              >
                <option value="">-- Select --</option>
                {electricVehicles.map((ev, idx) => (
                  <option key={idx} value={ev.model}>
                    {ev.carMake} {ev.model} {ev.modelVariant}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full max-w-4xl bg-slate-700 rounded-lg p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-white">
                <thead className="bg-slate-900 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">Specification</th>
                    <th className="px-4 py-2">Convential</th>
                    <th className="px-4 py-2">Electric</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 font-semibold">Price</td>
                    <td className="px-4 py-2">
                      {selectedTraditionalVehicle ? `£${selectedTraditionalVehicle.price}` : "--"}
                    </td>
                    <td className="px-4 py-2">
                      {selectedElectricVehicle ? `£${selectedElectricVehicle.price}` : "--"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 font-semibold">BHP</td>
                    <td className="px-4 py-2">
                      {selectedTraditionalVehicle ? selectedTraditionalVehicle.brakeHorsePower : "--"}
                    </td>
                    <td className="px-4 py-2">
                      {selectedElectricVehicle ? selectedElectricVehicle.brakeHorsePower : "--"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 font-semibold">0-60 (seconds)</td>
                    <td className="px-4 py-2">
                      {selectedTraditionalVehicle ? selectedTraditionalVehicle.acceleration : "--"}
                    </td>
                    <td className="px-4 py-2">
                      {selectedElectricVehicle ? selectedElectricVehicle.acceleration : "--"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 font-semibold">Top Speed (mph)</td>
                    <td className="px-4 py-2">
                      {selectedTraditionalVehicle ? selectedTraditionalVehicle.topSpeed : "--"}
                    </td>
                    <td className="px-4 py-2">
                      {selectedElectricVehicle ? selectedElectricVehicle.topSpeed : "--"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 font-semibold">Fuel Efficiency / Range</td>
                    <td className="px-4 py-2">
                      {selectedTraditionalVehicle ? `${selectedTraditionalVehicle.fuelEfficiency} mpg` : "--"}
                    </td>
                    <td className="px-4 py-2">
                      {selectedElectricVehicle ? `${selectedElectricVehicle.batteryRange} miles` : "--"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 font-semibold">Cost per mile / Battery Capacity</td>
                    <td className="px-4 py-2">
                      {selectedTraditionalVehicle ? `${selectedTraditionalVehicle.costPerMile} pence` : "--"}
                    </td>
                    <td className="px-4 py-2">
                      {selectedElectricVehicle ? `${selectedElectricVehicle.batteryCapacity} kWh` : "--"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default VehicleComparison;
