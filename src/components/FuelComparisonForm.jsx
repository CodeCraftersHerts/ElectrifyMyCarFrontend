import React, {useState, useEffect} from 'react';

const FuelComparisonForm = () => {
    //Need to have some kind of loading spinner
    const [loading, setLoading] = useState(true);
    const defaultFuelPrice = "1.50";
    const [fuelPriceError, setFuelPriceError] = useState("");

    const [fuelPrices, setFuelPrices] = useState(null);
    const [formData, setFormData] = useState({

        carType: "",
        inputType: "miles",
        efficiency: "",
        fuelType: "petrol",
        fuelPrice: "1.50",
        tripFrequency: "week",
        tripLabel: "",
        distance: "",
        trips: [],
    })
    
    //mocking the api call and response - later this will be hittin the db
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
    }, 1000)

    }, []);

    //need to update the fuel price if the user changes the fuel type - also watches to see if the prices change
    //this will be handled later if needed to make a fresh api call but unlikely.
    useEffect(() => {
        setFormData((prev) => {
            if(!fuelPrices) return prev;
            const updatedFuelPrice = fuelPrices[prev.fuelTpe]?.toFixed(2) || defaultFuelPrice;
            return { ...prev, fuelPrice: updatedFuelPrice }; 
        });
    }, [formData.fuelType, fuelPrices]);

    

    //function for dealing with changes in the form data

    const handleChange = (e) => {


        let { name, value } = e.target;

        if(name === "fuelPrice") {
            //simple validation to make sure the input number is correct
            //leave just the numbers and decimal
            value = value.replace(/[^0-9.]/g, "");

            //only need one decimal point
            const decimalCount = (value.match(/\./g) || []).length;
            if(decimalCount > 1) {
                return;
            }

            if(value.includes(".")) {
                const [integerPart, decimalPart] = value.split(".");
                if(decimalPart.length > 2) {
                    value = `${integerPart}.${decimalPart.slice(0,2)}`;
                }
            }
            //make sure number isnt too big or too small
            if(parseFloat(value) > 9.99 || parseFloat(value) < 0.01) {
                setFuelPriceError("Enter a price between £0.01 and £9.99.");
                return;
            }

        }
        

        setFormData((prev) => ({...prev, [name]: value}));


    }

 
    


return (<div className="p-6 max-w-xl mx-auto bg-white shadow-mg rounded-lg">
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
        <form className='space-y-4'>

         
            <div className="flex flex-col">
                <label htmlFor="carNameInput">What type of car do you currently drive?</label>
                <input id="carNameInput" type="text" name="carType" placeholder="Porsche Carrera" value={formData.carType} onChange={handleChange} className="w-full p-2 border rounded" />
            
            </div>

            <div className="flex flex-col">
            <label htmlFor="fuelTypeSelect">Choose your car's fuel type:</label>
            <select id="fuelTypeSelect" name="inputType" value={formData.inputType} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="miles">Miles</option>
                <option value="km">Kilometers</option>
            </select>   
            </div>
            

            <div className="flex flex-col">
            <label htmlFor="fuelEfficiencyInput">Enter your car's fuel efficiency:</label>
            <input id="fuelEfficiencyInput" type="number" name="efficiency" placeholder="0" value={formData.efficiency} onChange={handleChange} className="w-full p-2 border rounded" />
            
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

           

            <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Submit</button>
        </form>
    )}

</div>);

}


export default FuelComparisonForm;