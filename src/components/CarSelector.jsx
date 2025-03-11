import { useState } from "react";

const CarSelector = ({ selectedCar, setSelectedCar, setFormData }) => {

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedCar(value);
        setFormData((prev) => ({...prev, carType: ""}));
    }
    return (
        <div className="flex flex-col outline outline-red-400 hover:cursor-point sm:outline-green-400 lg:outline-blue-400 outline-2 p-2 rounded-md">
            <label htmlFor="carSelectInput">Choose a make and model from the list to populate automatically</label>
            <div className="flex items-center gap-2">
                <select
                    id="carSelectInput"
                    name="carType"
                    className="w-full p-2 border rounded"
                    value={selectedCar}
                    onChange={handleSelectChange}
                >
                    {selectedCar === "" && (
                        <option value="" disabled hidden>
                            Click to choose a make and model from the list.
                        </option>
                    )}
                    <option value="toyota-corolla">Toyota Corolla</option>
                    <option value="honda-civic">Honda Civic</option>
                    <option value="ford-focus">Ford Focus</option>
                </select>

                {selectedCar && (
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedCar("");
                            setFormData((prev) => ({ ...prev, carType: "" })); 
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                        ✕
                    </button>
                )}
            </div>
            <div className="text-xs text-red-600 p-2"><span className="font-bold">Note: this dropdown input is not hooked up yet.</span> The idea is they will select a car and it will populate the form below with data we have collected. If their car is not in the list, then the user can add manually.</div>
        </div>
    );
};

export default CarSelector;
