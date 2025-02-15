import React, {useState, useEffect} from 'react';
import CarSelector from './CarSelector';
import { useNavigate } from 'react-router-dom';
import TripForm from './TripForm'

const FuelComparisonForm = ({ className }) => {
    //Need to have some kind of loading spinner
    const [loading, setLoading] = useState(true);
    const defaultFuelPrice = "1.50";
    const [fuelPriceError, setFuelPriceError] = useState("");
    const [selectedCar, setSelectedCar] = useState("");
    const navigate = useNavigate();

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
    
    // Mocking API call to get fuel prices
    useEffect(() => {
        setLoading(true);
        const mockFuelPrices = { petrol: 1.45, diesel: 1.55};

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
            if(!fuelPrices) return prev;
            const updatedFuelPrice = fuelPrices[prev.fuelType]?.toFixed(2) || defaultFuelPrice;
            return { ...prev, fuelPrice: updatedFuelPrice }; 
        });
    }, [formData.fuelType, fuelPrices]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        if(name === "carType") {
            setSelectedCar("");
        }

        if(name === "fuelPrice") {
            value = value.replace(/[^0-9.]/g, "");
            const decimalCount = (value.match(/\./g) || []).length;
            if(decimalCount > 1) return;
            if(value.includes(".")) {
                const [integerPart, decimalPart] = value.split(".");
                if(decimalPart.length > 2) {
                    value = `${integerPart}.${decimalPart.slice(0,2)}`;
                }
            }
            if(parseFloat(value) > 9.99 || parseFloat(value) < 0.01) {
                setFuelPriceError("Enter a price between £0.01 and £9.99.");
                return;
            }
        }
        
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!", formData);

        // Navigate to comparison page with submitted data
        navigate('/comparison', { state: formData });

        // Reset form to initial state
        setFormData(initialFormData);
        setSelectedCar("");
    }

    const addTrip = () => {
        if(formData.trips.length >= 5) return;
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

    return (
        <div className={`relative p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg ${className}`}>
            {loading ? (
                <div className="flex flex-col items-center justify-center">
                    <button type="button" className="inline-flex cursor-not-allowed items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400" disabled>
                        <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing…
                    </button>
                </div>
            ) : (
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className="font-bold text-2xl">What kind of car do you drive?</div>
                    <CarSelector selectedCar={selectedCar} setSelectedCar={setSelectedCar} setFormData={setFormData}/>
                    <div className="flex flex-col">
                        <label htmlFor="carNameInput">What type of car do you currently drive?</label>
                        <input 
                          required 
                          id="carNameInput" 
                          type="text" 
                          name="carType" 
                          placeholder="Enter car data manually" 
                          value={formData.carType} 
                          onChange={handleChange} 
                          className="w-full p-2 border rounded" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="distanceTypeSelect">Choose your distance type:</label>
                        <select 
                          id="distanceTypeSelect" 
                          name="inputType" 
                          value={formData.inputType} 
                          onChange={handleChange} 
                          className="w-full p-2 border rounded"
                        >
                            <option value="miles">Miles</option>
                            <option value="km">Kilometers</option>
                        </select>   
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="fuelEfficiencyInput">
                            Enter your car's fuel efficiency ({formData.inputType === "miles" ? "mpg" : "km/l"}):
                        </label>
                        <input 
                          required 
                          id="fuelEfficiencyInput" 
                          type="number" 
                          name="efficiency" 
                          placeholder="0" 
                          value={formData.efficiency} 
                          onChange={handleChange} 
                          className="w-full p-2 border rounded" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="fuelTypeSelect">Choose your car's fuel type:</label>
                        <select 
                          id="fuelTypeSelect" 
                          name="fuelType" 
                          value={formData.fuelType} 
                          onChange={handleChange} 
                          className="w-full p-2 border rounded"
                        >
                            <option value="petrol">Petrol</option>
                            <option value="diesel">Diesel</option>
                        </select>   
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="fuelPriceInput">How much do you pay for fuel?</label>
                        <div className="relative w-full flex items-center">
                            <span className="absolute left-3 text-gray-600">£</span>
                            <input 
                              id="fuelPriceInput"
                              type="text" 
                              name="fuelPrice" 
                              placeholder="Fuel Price" 
                              value={formData.fuelPrice} 
                              onChange={handleChange} 
                              className="w-full p-2 pl-7 border rounded"
                            />
                        </div>
                        {fuelPriceError && <p className="text-red-500 text-sm mt-1">{fuelPriceError}</p>}
                    </div>
                    <TripForm 
                      trips={formData.trips} 
                      formData={formData} 
                      addTrip={addTrip} 
                      setFormData={setFormData} 
                      removeTrip={removeTrip}
                    />
                    <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

export default FuelComparisonForm;
