import React from 'react';
import {
  FaGasPump,
  FaBolt,
  FaLeaf,
  FaMoneyBillWave,
  FaGifts,
  FaSmokingBan,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';

const ComparisonPage = ({ formData, onReset }) => {
  // Sum total distances from all trips in the user’s chosen unit.
  const totalDistance = formData.trips?.reduce(
    (acc, trip) => acc + (parseFloat(trip.total) || 0),
    0
  ) || 1000;

  // We still do calculations in miles behind the scenes,
  // because EV consumption is given in kWh/mile.
  const totalMiles = formData.inputType === 'km'
    ? totalDistance / 1.60934
    : totalDistance;

  const fuelEfficiency = parseFloat(formData.efficiency) || 0;

  // Convert to liters consumed
  let fuelConsumedLiters = 0;
  if (fuelEfficiency > 0) {
    if (formData.inputType === 'miles') {
      // If user originally typed in mpg, totalDistance is already miles
      fuelConsumedLiters = (totalDistance / fuelEfficiency) * 3.785;
    } else {
      // If user typed in km/l, totalDistance is in km
      // but EV calculations still need miles, so we do totalMiles for that
      const totalKm = totalMiles * 1.60934;
      fuelConsumedLiters = totalKm / fuelEfficiency;
    }
  }

  // CO₂ and cost for the fuel car
  const fuelEmissionFactor = formData.fuelType === 'diesel' ? 2.68 : 2.31;
  const fuelCO2Emissions = fuelConsumedLiters * fuelEmissionFactor;

  const fuelPrice = parseFloat(formData.fuelPrice) || 0;
  const fuelCarCost = fuelConsumedLiters * fuelPrice;

  // EV comparison data
  const evOptions = [
    {
      type: 'Small',
      name: 'Small EV',
      batteryType: 'Lithium-ion',
      kw: 50,
      consumption: 0.28, // kWh per mile
      tariffs: {
        home: '£0.15/kWh',
        night: '£0.09/kWh',
        station: '£0.30/kWh',
      },
    },
    {
      type: 'Mid',
      name: 'Mid EV',
      batteryType: 'Lithium-ion',
      kw: 75,
      consumption: 0.30, // kWh per mile
      tariffs: {
        home: '£0.15/kWh',
        night: '£0.09/kWh',
        station: '£0.30/kWh',
      },
    },
    {
      type: 'Large',
      name: 'Large EV',
      batteryType: 'Lithium-ion',
      kw: 100,
      consumption: 0.32, // kWh per mile
      tariffs: {
        home: '£0.15/kWh',
        night: '£0.09/kWh',
        station: '£0.30/kWh',
      },
    },
  ];
  const evOptionsToDisplay = evOptions.slice(0, 3);

  // Emission factor for electricity (kg CO2 per kWh)
  const electricityEmissionFactor = 0.2;

  // For displaying the total distance in whichever unit the user picked.
  const isKm = formData.inputType === 'km';
  const distanceUnitLabel = isKm ? 'km' : 'miles';
  // The "displayedDistance" is simply the user’s original unit total,
  // so they see 30,000 km if they typed 30,000 km, etc.
  const displayedDistance = isKm ? totalDistance : totalMiles;

  // Summaries for each EV
  const evSummaries = evOptionsToDisplay.map((ev) => {
    // This still uses totalMiles behind the scenes,
    // because the EV's consumption (kWh per mile) is in miles
    const evCO2Emissions = totalMiles * ev.consumption * electricityEmissionFactor;
    const carbonSavings = fuelCO2Emissions - evCO2Emissions;

    // Typically assume we charge at the "home" tariff for cost comparison
    const homeTariffRate = parseFloat(ev.tariffs.home.replace(/[^\d.]/g, '')) || 0;
    const evCost = totalMiles * ev.consumption * homeTariffRate;
    const costSavings = fuelCarCost - evCost;

    return {
      name: ev.name,
      evCO2Emissions,
      carbonSavings,
      costSavings,
    };
  });

  return (
    <div className="min-h-screen bg-slate-800 text-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Your Car vs EVs</h2>
        <p className="text-center text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Compare the annual cost and CO₂ emissions of your current fuel car with various
          electric vehicles. The table below shows your car’s performance compared to EVs,
          followed by a summary of the savings in both emissions and money.
        </p>

        {/* Summary of Savings */}
        <div className="my-8">
          <h3 className="text-2xl font-bold text-center mb-4">Summary of Savings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {evSummaries.map((summary, index) => (
              <div
                key={index}
                className="bg-slate-200 text-gray-800 p-4 rounded-lg shadow-lg text-center"
              >
                <h4 className="text-xl font-bold mb-2">{summary.name}</h4>
                <p className="text-sm mb-1">
                  Emission Reduction: {summary.carbonSavings.toFixed(0)} kg/year
                </p>
                <p className="text-sm">
                  Annual Cost Savings: £{summary.costSavings.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto rounded-xl bg-slate-400 p-4 mb-8">
          <table className="min-w-full border-collapse text-sm md:text-base">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-slate-500 text-center">
                  <IconContext.Provider
                    value={{ size: '1.5em', className: 'inline text-yellow-400 mr-2' }}
                  >
                    <FaGasPump />
                  </IconContext.Provider>
                  Your {formData.fuelType} Car
                </th>
                {evOptionsToDisplay.map((ev, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 border border-slate-500 text-center whitespace-nowrap"
                  >
                    <IconContext.Provider
                      value={{ size: '1.5em', className: 'inline text-green-400 mr-2' }}
                    >
                      <FaBolt />
                    </IconContext.Provider>
                    {ev.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* TOTAL DISTANCE (in user's chosen unit) */}
              <tr>
                <td className="px-4 py-3 border border-slate-500 text-center">
                  Total {distanceUnitLabel}: {displayedDistance.toFixed(0)}
                </td>
                {evOptionsToDisplay.map((_, index) => (
                  <td
                    key={index}
                    className="px-4 py-3 border border-slate-500 text-center whitespace-nowrap"
                  >
                    Total {distanceUnitLabel}: {displayedDistance.toFixed(0)}
                  </td>
                ))}
              </tr>

              {/* EFFICIENCY / CONSUMPTION */}
              <tr>
                <td className="px-4 py-3 border border-slate-500 text-center">
                  Efficiency: {formData.efficiency}{' '}
                  {formData.inputType === 'km' ? 'km/l' : 'mpg'}
                </td>
                {evOptionsToDisplay.map((ev, index) => (
                  <td
                    key={index}
                    className="px-4 py-3 border border-slate-500 text-center whitespace-nowrap"
                  >
                    Consumption: {ev.consumption} kWh/mile
                  </td>
                ))}
              </tr>

              {/* FUEL / ELECTRIC PRICE */}
              <tr>
                <td className="px-4 py-3 border border-slate-500 text-center">
                  Fuel Price: £{fuelPrice.toFixed(2)}
                </td>
                {evOptionsToDisplay.map((ev, index) => (
                  <td
                    key={index}
                    className="px-4 py-3 border border-slate-500 text-center whitespace-nowrap"
                  >
                    <div>Home: {ev.tariffs.home}</div>
                    <div>Night: {ev.tariffs.night}</div>
                    <div>Station: {ev.tariffs.station}</div>
                  </td>
                ))}
              </tr>

              {/* CO2 EMISSIONS */}
              <tr>
                <td className="px-4 py-3 border border-slate-500 text-center">
                  CO₂: {fuelCO2Emissions.toFixed(0)} kg/year
                </td>
                {evOptionsToDisplay.map((ev, index) => {
                  const evCO2Emissions =
                    totalMiles * ev.consumption * 0.2 /* electricityEmissionFactor */;
                  const carbonSavings = fuelCO2Emissions - evCO2Emissions;
                  return (
                    <td
                      key={index}
                      className="px-4 py-3 border border-slate-500 text-center whitespace-nowrap"
                    >
                      <div>CO₂: {evCO2Emissions.toFixed(0)} kg/year</div>
                      <div>
                        Savings: {carbonSavings > 0 ? carbonSavings.toFixed(0) : 0} kg/year
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* EV DETAILS */}
              <tr>
                <td className="px-4 py-3 border border-slate-500 text-center">-</td>
                {evOptionsToDisplay.map((ev, index) => (
                  <td
                    key={index}
                    className="px-4 py-3 border border-slate-500 text-center whitespace-nowrap"
                  >
                    <div>Battery: {ev.batteryType}</div>
                    <div>Power: {ev.kw} kW</div>
                  </td>
                ))}
              </tr>

              {/* COST COMPARISON */}
              <tr>
                <td className="px-4 py-3 border border-slate-500 text-center">
                  Cost: £{fuelCarCost.toFixed(2)}
                </td>
                {evOptionsToDisplay.map((ev, index) => {
                  const homeRate = parseFloat(ev.tariffs.home.replace(/[^\d.]/g, '')) || 0;
                  const evCost = totalMiles * ev.consumption * homeRate;
                  const costSavings = fuelCarCost - evCost;
                  return (
                    <td
                      key={index}
                      className="px-4 py-3 border border-slate-500 text-center whitespace-nowrap"
                    >
                      Est. Savings: £{costSavings > 0 ? costSavings.toFixed(2) : '0.00'}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-slate-700 text-white rounded shadow hover:bg-slate-600"
          >
            Start Over
          </button>
        </div>

        {/* Some extra info about EVs */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">EV vs. Traditional Fuel Facts</h3>
          <IconContext.Provider value={{ size: '2em', className: 'text-green-400 mx-auto mb-4' }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-slate-200 text-gray-800 p-6 rounded-lg shadow-lg text-center">
                <FaLeaf className="mx-auto mb-2" />
                <h4 className="text-xl font-bold mb-2">Lower Emissions</h4>
                <p className="text-sm">
                  EVs emit significantly less CO₂ compared to conventional vehicles.
                </p>
              </div>
              <div className="bg-slate-200 text-gray-800 p-6 rounded-lg shadow-lg text-center">
                <FaMoneyBillWave className="mx-auto mb-2" />
                <h4 className="text-xl font-bold mb-2">Cost Savings</h4>
                <p className="text-sm">
                  Lower energy costs and reduced maintenance translate to big savings.
                </p>
              </div>
              <div className="bg-slate-200 text-gray-800 p-6 rounded-lg shadow-lg text-center">
                <FaGifts className="mx-auto mb-2" />
                <h4 className="text-xl font-bold mb-2">Incentives</h4>
                <p className="text-sm">
                  Many governments offer grants and tax breaks for EV owners.
                </p>
              </div>
              <div className="bg-slate-200 text-gray-800 p-6 rounded-lg shadow-lg text-center">
                <FaSmokingBan className="mx-auto mb-2" /> 
                <h4 className="text-xl font-bold mb-2">No Tailpipe Emissions</h4>
                <p className="text-sm">
                  EVs help reduce urban pollution and improve air quality.
                </p>
              </div>
            </div>
          </IconContext.Provider>
        </section>
      </div>
    </div>
  );
};

export default ComparisonPage;
