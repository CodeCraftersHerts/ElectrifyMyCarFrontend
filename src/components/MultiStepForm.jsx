import React, { useState, useEffect } from 'react';
import CarSelector from './CarSelector';
import { useNavigate } from 'react-router-dom';
import TripForm from './TripForm';

const MultiStepFuelForm = ({ className }) => {
    const [step, setStep] = useState(1);
    const maxSteps = 3;
    const navigate = useNavigate();

    const defaultFuelPrice = "1.50";
    const [fuelPriceError, setFuelPriceError] = useState("");
    const [selectedCar, setSelectedCar] = useState("");
    const [loading, setLoading] = useState(true);

    const initialFormData = {
        carType: "",
        inputType: "miles",
        efficiency: "",
        fuelType: "petrol",
        fuelPrice: defaultFuelPrice,
        tripFrequency: "daily (5-days a week)",
        tripLabel: "",
        distance: "",
        trips: [],
    };

    const [fuelPrices, setFuelPrices] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    // Simulate API call for fuel prices
    useEffect(() => {
        setLoading(true);
        const mockFuelPrices = { petrol: 1.45, diesel: 1.55 };

        setTimeout(() => {
            setFuelPrices(mockFuelPrices);
            setFormData((prev) => ({
                ...prev,
                fuelPrice: mockFuelPrices[prev.fuelType]?.toFixed(2) || defaultFuelPrice,
            }));
            setLoading(false);
        }, 1000);
    }, []);

    // Update fuel price when fuel type changes
    useEffect(() => {
        setFormData((prev) => {
            if (!fuelPrices) return prev;
            const updatedFuelPrice = fuelPrices[prev.fuelType]?.toFixed(2) || defaultFuelPrice;
            return { ...prev, fuelPrice: updatedFuelPrice };
        });
    }, [formData.fuelType, fuelPrices]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "carType") setSelectedCar("");
        if (name === "fuelPrice") {
            value = value.replace(/[^0-9.]/g, "");
            if ((value.match(/\./g) || []).length > 1) return;
            if (value.includes(".")) {
                const [integerPart, decimalPart] = value.split(".");
                if (decimalPart.length > 2) value = `${integerPart}.${decimalPart.slice(0, 2)}`;
            }
            if (parseFloat(value) > 9.99 || parseFloat(value) < 0.01) {
                setFuelPriceError("Enter a price between £0.01 and £9.99.");
                return;
            }
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!", formData);
        navigate('/comparison', { state: formData });
        setFormData(initialFormData);
        setSelectedCar("");
    };

    const addTrip = () => {
        if (formData.trips.length >= 5) return;
        const factor = { 
          "daily (5-days a week)": 5, 
          "daily (7-days a week)": 7, 
          weekly: 52, 
          monthly: 12, 
          yearly: 1 
        };
        const totalDistance = (parseInt(formData.distance, 10) || 0) * (factor[formData.tripFrequency] || 0);
      
        const newTrip = {
          label: formData.tripLabel,
          frequency: formData.tripFrequency,
          distance: formData.distance,
          total: totalDistance,
        };
        setFormData((prev) => ({
          ...prev,
          trips: [...prev.trips, newTrip],
          tripLabel: "",
          tripFrequency: "",
          distance: ""
        }));
    };

    const removeTrip = (index) => {
        setFormData((prev) => ({
            ...prev,
            trips: prev.trips.filter((_, i) => i !== index)
        }));
    };

    const stepContent = {
        1: {
            title: "Car Information",
            component: (
                <>
                    <CarSelector selectedCar={selectedCar} setSelectedCar={setSelectedCar} setFormData={setFormData} />
                    <input 
                        required 
                        type="text" 
                        name="carType" 
                        placeholder="Enter car data manually" 
                        value={formData.carType} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                    />
                </>
            ),
        },
        2: {
            title: "Fuel and Efficiency",
            component: (
                <>
                    <select 
                        name="inputType" 
                        value={formData.inputType} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                    >
                        <option value="miles">Miles</option>
                        <option value="km">Kilometers</option>
                    </select>

                    <input 
                        required 
                        type="number" 
                        name="efficiency" 
                        placeholder="Fuel Efficiency" 
                        value={formData.efficiency} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                    />

                    <select 
                        name="fuelType" 
                        value={formData.fuelType} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                    >
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                    </select>

                    <input 
                        type="text" 
                        name="fuelPrice" 
                        placeholder="Fuel Price" 
                        value={formData.fuelPrice} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                    />
                </>
            ),
        },
        3: {
            title: "Trip Details",
            component: (
                <TripForm 
                    trips={formData.trips} 
                    formData={formData} 
                    addTrip={addTrip} 
                    setFormData={setFormData} 
                    removeTrip={removeTrip} 
                />
            ),
        }
    };

    return (
        <div className={`relative p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg ${className}`}>
            {loading ? (
                <div className="flex justify-center items-center">Loading...</div>
            ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="font-bold text-2xl">{stepContent[step]?.title}</div>

                    {}
                    <div>{stepContent[step]?.component}</div>

                    {}
                    <div className="flex justify-between">
                        <button 
                            type="button" 
                            className="border px-6 py-2 rounded" 
                            onClick={() => setStep(prev => Math.max(prev - 1, 1))}
                            disabled={step === 1}
                        >
                            Back
                        </button>
                        {step === maxSteps ? (
                            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded">
                                Submit
                            </button>
                        ) : (
                            <button type="button" className="bg-blue-500 text-white px-6 py-2 rounded" onClick={() => setStep(prev => prev + 1)}>
                                Next
                            </button>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
};

export default MultiStepFuelForm;
