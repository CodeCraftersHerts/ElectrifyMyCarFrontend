import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import CarSelector from './CarSelector';

const defaultEfficiencyMap = {
  petrol: { miles: '30', km: '13' },
  diesel: { miles: '35', km: '15' },
};

const step1Schema = z.object({
  carType: z.string().nonempty('Please select or enter your car model.'),
});
const step4Schema = z.object({
  efficiency: z
    .string()
    .nonempty('Fuel efficiency is required.')
    .refine((val) => parseFloat(val) > 0, { message: 'Enter a valid positive number.' }),
});
const step5Schema = z.object({
  fuelPrice: z
    .string()
    .nonempty('Fuel price is required.')
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0.01 && num <= 9.99;
    }, { message: 'Fuel price must be between £0.01 and £9.99.' }),
});

const tripSchema = z.object({
  tripLabel: z.string().nonempty('Trip label is required.'),
  tripFrequency: z.enum([
    'daily (5-days a week)',
    'daily (7-days a week)',
    'weekly',
    'monthly',
    'yearly',
  ]),
  distance: z
    .string()
    .nonempty('Distance is required.')
    .refine((val) => parseFloat(val) > 0, { message: 'Distance must be a positive number.' }),
});

const TripPanel = ({
  trips,
  formData,
  handleChange,
  addTrip,
  removeTrip,
  tripError,
}) => {
  return (
    <div className="mt-2">
    
      <p className="text-sm text-gray-600 mb-2">
        Provide trip details for a more personalized comparison. If left empty,
        a default annual value of 10,000 {formData.inputType} will be used.
      </p>
      <div className="grid grid-cols-1 gap-2 text-sm">
        <div>
          <label htmlFor="tripLabel" className="block font-medium mb-1">
            Trip Name
          </label>
          <input
            id="tripLabel"
            name="tripLabel"
            type="text"
            placeholder="e.g. Commute to work"
            value={formData.tripLabel}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label
            htmlFor="tripFrequency"
            className="block text-sm font-medium mb-1"
          >
            Frequency
          </label>
          <select
            id="tripFrequency"
            name="tripFrequency"
            value={formData.tripFrequency}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select frequency</option>
            <option value="daily (5-days a week)">Daily (5 days/week)</option>
            <option value="daily (7-days a week)">Daily (7 days/week)</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div>
          <label htmlFor="distance" className="block text-sm font-medium mb-1">
            Distance per Trip
          </label>
          <input
            id="distance"
            name="distance"
            type="number"
            placeholder={`Distance in ${formData.inputType}`}
            value={formData.distance}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {tripError && <p className="text-red-500 text-sm">{tripError}</p>}
        <button
          type="button"
          onClick={addTrip}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Trip
        </button>
      </div>
      {trips.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-2">Trips Added</h4>
          <ul className="space-y-2">
            {trips.map((trip, index) => (
              <li
                key={index}
                className="flex justify-between items-center border border-gray-200 p-2 rounded"
              >
                <span className="text-sm">
                  {trip.label} – {trip.frequency} – {trip.distance} (
                  {trip.total})
                </span>
                <button
                  type="button"
                  onClick={() => removeTrip(index)}
                  className="text-red-600 text-sm hover:underline"
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
};

const FuelComparisonMultiStepForm = ({ className, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const defaultFuelPrice = '1.50';
  const [errors, setErrors] = useState({});
  const [tripError, setTripError] = useState('');

  const initialFormData = {
    carType: '',
    inputType: 'miles',
    fuelType: 'petrol',
    efficiency: '',
    fuelPrice: defaultFuelPrice,
    tripFrequency: '',
    tripLabel: '',
    distance: '',
    trips: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedCar, setSelectedCar] = useState(null);
  const [fuelPrices, setFuelPrices] = useState(null);

  useEffect(() => {
    setLoading(true);

    const mockFuelPrices = { petrol: 1.45, diesel: 1.55 };
    const timer = setTimeout(() => {
      setFuelPrices(mockFuelPrices);
      setFormData((prev) => ({
        ...prev,
        fuelPrice: mockFuelPrices[prev.fuelType]?.toFixed(2) || defaultFuelPrice,
      }));
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!fuelPrices) return;
    setFormData((prev) => {
      const updatedFuelPrice =
        fuelPrices[prev.fuelType]?.toFixed(2) || defaultFuelPrice;
      return { ...prev, fuelPrice: updatedFuelPrice };
    });
    // eslint-disable-next-line
  }, [formData.fuelType, fuelPrices]);

  useEffect(() => {
    setFormData((prev) => {
      if (!prev.efficiency) {
        return {
          ...prev,
          efficiency: defaultEfficiencyMap[prev.fuelType][prev.inputType],
        };
      }
      return prev;
    });
  }, [formData.fuelType, formData.inputType]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'carType') {
      setSelectedCar(null);
    }
    if (name === 'fuelPrice') {
      // Keep only digits and at most one decimal point
      value = value.replace(/[^0-9.]/g, '');
      const decimalCount = (value.match(/\./g) || []).length;
      if (decimalCount > 1) return;
      if (value.includes('.')) {
        const [integerPart, decimalPart] = value.split('.');
        if (decimalPart.length > 2) {
          value = `${integerPart}.${decimalPart.slice(0, 2)}`;
        }
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (['tripLabel', 'tripFrequency', 'distance'].includes(name)) {
      setTripError('');
    }
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setFormData((prev) => ({
      ...prev,
      carType: car.model || car.name || '',
    }));
  };

  const validateStep = () => {
    try {
      if (step === 1) {
        step1Schema.parse({ carType: formData.carType });
      } else if (step === 4) {
        step4Schema.parse({ efficiency: formData.efficiency });
      } else if (step === 5) {
        step5Schema.parse({ fuelPrice: formData.fuelPrice });
      }
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const nextStep = () => {
    if (validateStep() && step < 6) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const addTrip = () => {
    try {
      const tripData = {
        tripLabel: formData.tripLabel,
        tripFrequency: formData.tripFrequency,
        distance: formData.distance,
      };
      tripSchema.parse(tripData);
      const frequencyFactor = {
        'daily (5-days a week)': 5,
        'daily (7-days a week)': 7,
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

      if (formData.trips.length >= 5) return; // max 5 trips
      setFormData((prev) => ({
        ...prev,
        trips: [...prev.trips, newTrip],
        tripLabel: '',
        tripFrequency: '',
        distance: '',
      }));
      setTripError('');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setTripError(err.errors[0].message);
      }
    }
  };

  const removeTrip = (index) => {
    setFormData((prev) => ({
      ...prev,
      trips: prev.trips.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      let finalData = { ...formData };
      if (finalData.trips.length === 0) {
        finalData.trips = [
          {
            label: 'Default Annual Trip',
            frequency: 'yearly',
            distance: '10000',
            total: 10000,
          },
        ];
      }
      if (typeof onSubmit === 'function') {
        onSubmit(finalData);
      }
   
      setFormData(initialFormData);
      setSelectedCar(null);
      setStep(1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Select Your Car</h2>

            {}


            <div className="mt-4">
              <label htmlFor="carType" className="block text-sm font-medium mb-1">
                Car Model
              </label>
              <input
                id="carType"
                type="text"
                name="carType"
                placeholder="Or type your car model"
                value={formData.carType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.carType && (
                <p className="text-red-500 text-sm mt-1">{errors.carType}</p>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Distance Unit</h2>
            <div className="mt-4">
              <label htmlFor="inputType" className="block text-sm font-medium mb-1">
                Select Your Unit
              </label>
              <select
                id="inputType"
                name="inputType"
                value={formData.inputType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="miles">Miles</option>
                <option value="km">Kilometers</option>
              </select>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Fuel Type</h2>
            <div className="mt-4">
              <label htmlFor="fuelType" className="block text-sm font-medium mb-1">
                Select Your Fuel
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
              </select>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Fuel Efficiency</h2>
            <div className="mt-4">
              <label
                htmlFor="efficiency"
                className="block text-sm font-medium mb-1"
              >
                Enter your car's fuel efficiency (
                {formData.inputType === 'miles' ? 'mpg' : 'km/l'})
              </label>
              <input
                id="efficiency"
                type="number"
                name="efficiency"
                placeholder={`e.g. ${defaultEfficiencyMap[formData.fuelType][formData.inputType]}`}
                value={formData.efficiency}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.efficiency && (
                <p className="text-red-500 text-sm mt-1">{errors.efficiency}</p>
              )}
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Fuel Price</h2>
            <div className="mt-4">
              <label htmlFor="fuelPrice" className="block text-sm font-medium mb-1">
                Fuel Price (per unit)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                  £
                </span>
                <input
                  id="fuelPrice"
                  type="text"
                  name="fuelPrice"
                  placeholder="e.g. 1.50"
                  value={formData.fuelPrice}
                  onChange={handleChange}
                  className="w-full p-2 pl-7 border border-gray-300 rounded"
                />
              </div>
              {errors.fuelPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.fuelPrice}</p>
              )}
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Optional Trips</h2>
            <TripPanel
              trips={formData.trips}
              formData={formData}
              handleChange={handleChange}
              addTrip={addTrip}
              removeTrip={removeTrip}
              tripError={tripError}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-[400px] w-full md:w-8/12 rounded-xl p-4">

        
          <form
            className="flex flex-col justify-around align-middle h-full "
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            {renderStep()}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Back
                </button>
              )}
              {step < 6 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Next
                </button>
              )}
              {step === 6 && (
                <button
                  type="submit"
                  className="ml-auto w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Compare with Electric Cars
                </button>
              )}
            </div>
          </form>
 
    </div>
  );
};

export default FuelComparisonMultiStepForm;
