import React, { useEffect } from 'react';

const mockCarData = [
  { label: "Toyota Corolla 2019 (Petrol)", fuelType: "petrol", mpg: 32 },
  { label: "Honda Civic 2020 (Petrol)", fuelType: "petrol", mpg: 30 },
  { label: "Ford Focus 2018 (Petrol)", fuelType: "petrol", mpg: 28 },
  { label: "Volkswagen Golf 2020 (Petrol)", fuelType: "petrol", mpg: 34 },
  { label: "Vauxhall Astra 2019 (Diesel)", fuelType: "diesel", mpg: 40 },
  { label: "BMW 3 Series 2018 (Diesel)", fuelType: "diesel", mpg: 38 },
  { label: "Audi A4 2021 (Petrol)", fuelType: "petrol", mpg: 29 },
  { label: "Mercedes C-Class 2020 (Diesel)", fuelType: "diesel", mpg: 36 },
];

const CarSelector = ({ selectedValue, setSelectedValue, onCarSelect }) => {
  useEffect(() => {
    if (selectedValue === "") {
      setSelectedValue("");
    }
  }, [selectedValue, setSelectedValue]);

  const handleSelectChange = (e) => {
    const index = e.target.value;
    setSelectedValue(index);
    if (index !== "") {
      const selectedCar = mockCarData[index];
      onCarSelect(selectedCar);
    } else {
      onCarSelect(null);
    }
  };

  const handleClear = () => {
    setSelectedValue("");
    onCarSelect(null);
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm mb-1">
        Choose a car to auto‑populate your details:
      </label>
      <div className="flex items-center gap-2">
        <select
          value={selectedValue}
          onChange={handleSelectChange}
          className="w-full p-2 border border-slate-500 rounded bg-slate-600 text-white"
        >
          <option value="">Select a car...</option>
          {mockCarData.map((car, idx) => (
            <option key={idx} value={idx}>
              {car.label}
            </option>
          ))}
        </select>
        {selectedValue !== "" && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            ✕
          </button>
        )}
      </div>
      <p className="text-xs text-red-200">
        <strong>Note:</strong> Selecting a car will auto‑fill the fields below. If not, you can type your car manually.
      </p>
    </div>
  );
};

export default CarSelector;
