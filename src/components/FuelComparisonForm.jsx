import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CarSelector from './CarSelector';

const defaultEfficiencyMap = {
  petrol: { miles: '30', km: '13' },
  diesel: { miles: '35', km: '15' },
};

const FuelComparisonForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [tripError, setTripError] = useState('');
  const [carSelectorValue, setCarSelectorValue] = useState('');
  const [formData, setFormData] = useState({
    carType: '',
    inputType: 'miles',
    fuelType: 'petrol',
    efficiency: '', // leave empty so user sees help text and can type in new value
    fuelPrice: '1.50',
    trips: [],
    tripLabel: '',
    tripFrequency: '',
    distance: '',
  });
  const [fuelPrices, setFuelPrices] = useState(null);

  // Load mock fuel prices
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockFuelPrices = { petrol: 1.45, diesel: 1.55 };
      setFuelPrices(mockFuelPrices);
      setFormData(prev => ({
        ...prev,
        fuelPrice: mockFuelPrices[prev.fuelType].toFixed(2),
      }));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Update fuelPrice when fuelType changes
  useEffect(() => {
    if (!fuelPrices) return;
    setFormData(prev => ({
      ...prev,
      fuelPrice: fuelPrices[prev.fuelType].toFixed(2),
    }));
  }, [formData.fuelType, fuelPrices]);

  // Reset efficiency to the default when the unit (or fuelType) changes.
  const prevInputTypeRef = useRef(formData.inputType);
  useEffect(() => {
    setFormData(prev => {
      if (prevInputTypeRef.current !== prev.inputType) {
        prevInputTypeRef.current = prev.inputType;
        // reset efficiency to default rather than converting existing value
        return { ...prev, efficiency: defaultEfficiencyMap[prev.fuelType][prev.inputType] };
      }
      return prev;
    });
  }, [formData.inputType, formData.fuelType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'carType') {
      setCarSelectorValue('');
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCarSelect = (car) => {
    if (car) {
      setFormData(prev => ({
        ...prev,
        carType: car.label,
        fuelType: car.fuelType,
        efficiency: car.mpg.toString(),
      }));
      setCarSelectorValue(car.label);
    } else {
      setFormData(prev => ({ ...prev, carType: '' }));
    }
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  // Frequency factor: update daily factors to multiply by 52 weeks.
  const addTrip = () => {
    if (!formData.tripLabel || !formData.tripFrequency || !formData.distance) {
      setTripError("Please fill out all trip fields.");
      return;
    }
    const frequencyFactor = {
      'daily (5-days a week)': 5 * 52,   // 260 days/year
      'daily (7-days a week)': 7 * 52,   // 364 days/year
      weekly: 52,
      monthly: 12,
      yearly: 1,
    };
    const totalDistance =
      (parseFloat(formData.distance) || 0) *
      (frequencyFactor[formData.tripFrequency] || 0);

    const newTrip = {
      label: formData.tripLabel,
      frequency: formData.tripFrequency,
      distance: formData.distance,
      total: totalDistance,
    };

    setFormData(prev => ({
      ...prev,
      trips: [...prev.trips, newTrip],
      tripLabel: '',
      tripFrequency: '',
      distance: '',
    }));
    setTripError('');
  };

  const removeTrip = (index) => {
    setFormData(prev => ({
      ...prev,
      trips: prev.trips.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step !== 2) return;
    if (formData.trips.length === 0) {
      formData.trips = [{
        label: "Default Annual Trip",
        frequency: "yearly",
        distance: "10000",
        total: 10000,
      }];
    }
    onSubmit(formData);
  };

  const renderCarDetails = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Car Details</h2>
      <p className="text-sm text-gray-200">
        Either select a car from the list below to auto‑populate your details or type your own.
      </p>

      <CarSelector
        selectedValue={carSelectorValue}
        setSelectedValue={setCarSelectorValue}
        onCarSelect={handleCarSelect}
      />

      <div>
        <label className="block text-sm mb-1">Car Model</label>
        <input
          type="text"
          name="carType"
          value={formData.carType}
          onChange={handleChange}
          placeholder="Enter your car model (e.g. Ford Focus)"
          className="w-full p-2 border border-slate-500 rounded bg-slate-600 text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Fuel Type</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full p-2 border border-slate-500 rounded bg-slate-600 text-white"
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Distance Unit</label>
          <select
            name="inputType"
            value={formData.inputType}
            onChange={handleChange}
            className="w-full p-2 border border-slate-500 rounded bg-slate-600 text-white"
          >
            <option value="miles">Miles</option>
            <option value="km">Kilometers</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">
            Fuel Efficiency ({formData.inputType === 'miles' ? 'mpg' : 'km/l'})
          </label>
          <input
            type="number"
            name="efficiency"
            value={formData.efficiency}
            onChange={handleChange}
            placeholder={`e.g. ${defaultEfficiencyMap[formData.fuelType][formData.inputType]}`}
            className="w-full p-2 border border-slate-500 rounded bg-slate-600 text-white"
          />
          {/* Help text for fuel efficiency */}
          <small className="text-gray-400 text-xs">
            Average fuel efficiency (2025 estimates): Petrol ~30 mpg (13 km/l), Diesel ~35 mpg (15 km/l)
          </small>
        </div>
        <div>
          <label className="block text-sm mb-1">Fuel Price (£/unit)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300">£</span>
            <input
              type="text"
              name="fuelPrice"
              value={formData.fuelPrice}
              onChange={handleChange}
              placeholder="e.g. 1.50"
              className="w-full p-2 pl-7 border border-slate-500 rounded bg-slate-600 text-white"
            />
          </div>
          {/* Help text for fuel price */}
          <small className="text-gray-400 text-xs">
            Average 2025 prices: Petrol ~£1.50 per liter, Diesel ~£1.60 per liter.
          </small>
        </div>
      </div>
    </div>
  );

  const renderTripDetails = () => (
    <div className="space-y-6 border border-slate-500 rounded p-4">
      <h2 className="text-2xl font-bold">Trip Details</h2>
      <p className="text-sm text-gray-200">
        Provide details for your trips. You can add multiple trips.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Trip Name</label>
          <input
            type="text"
            name="tripLabel"
            value={formData.tripLabel}
            onChange={handleChange}
            placeholder="e.g. Commute to work"
            className="w-full p-2 border border-slate-500 rounded bg-slate-600 text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Frequency</label>
          <select
            name="tripFrequency"
            value={formData.tripFrequency}
            onChange={handleChange}
            className="w-full p-2 border border-slate-500 rounded bg-slate-600 text-white"
          >
            <option value="">Select</option>
            <option value="daily (5-days a week)">Daily (5 days/week)</option>
            <option value="daily (7-days a week)">Daily (7 days/week)</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">
            Distance per Trip ({formData.inputType})
          </label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            placeholder="e.g. 20"
            className="w-full p-2 border border-slate-500 rounded bg-slate-600 text-white"
          />
        </div>
      </div>
      {tripError && <p className="text-red-400 text-sm">{tripError}</p>}
      <button
        type="button"
        onClick={addTrip}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add Trip
      </button>
      {formData.trips.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-md font-semibold">Your Trips</h4>
          <ul className="space-y-2">
            {formData.trips.map((trip, index) => (
              <li
                key={index}
                className="flex justify-between items-center border border-slate-600 p-2 rounded bg-slate-600 text-white"
              >
                <div className="text-sm">
                  <span className="font-semibold">{trip.label}</span> — {trip.frequency}, {trip.distance} {formData.inputType} per trip
                  <span className="ml-2 text-gray-300">(~{trip.total} {formData.inputType} / year)</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeTrip(index)}
                  className="text-red-300 hover:text-red-500 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        className="bg-slate-700 text-white rounded-xl p-6 shadow-xl space-y-8"
      >
        {step === 1 ? renderCarDetails() : renderTripDetails()}

        <div className="flex justify-between items-center mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded hover:bg-slate-500 transition"
            >
              <FaArrowLeft />
              Back
            </button>
          )}
          {step === 1 && (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded hover:bg-slate-500 transition"
            >
              Next
              <FaArrowRight />
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="px-6 py-3 bg-slate-700 text-white rounded-xl shadow-xl hover:bg-slate-600 transition duration-300"
            >
              Compare with Electric Cars
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default FuelComparisonForm;
