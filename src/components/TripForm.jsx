import Trip from './Trip';

const TripForm = ({ formData, setFormData, addTrip, trips, removeTrip }) => {
    // Define the frequency options
    const frequencies = [
        "daily (5-days a week)",
        "daily (7-days a week)",
        "weekly",
        "monthly",
        "yearly"
    ];

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'distance') {
            // Allow only integer values
            value = value.replace(/\D/g, '');
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='space-y-4 ring-2 p-2 rounded-md'>
            <div className="font-bold">Optional - How often do you drive your car?</div>
            <div className="text-gray-700 text-xs">
                To get a <span className="font-semibold">personalised breakdown of possible savings</span> use the trip builder tool to add up to 5 types of trips you regularly make
                <br /><br />
                If no trips are added our comparison tool will use a default value for comparison.
            </div>
            <div className="flex flex-col">
                <label htmlFor="tripLabel">Create a name/label for your trip</label>
                <input
                    id="tripLabel"
                    type="text"
                    name="tripLabel"
                    placeholder="e.g. School Run"
                    value={formData.tripLabel}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
     
            <div className="flex flex-col">
                <label htmlFor="tripFrequency">How often do you make your trip?</label>
                <select
                    id="tripFrequency"
                    name="tripFrequency"
                    value={formData.tripFrequency}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    {frequencies.map((freq, index) => (
                        <option key={index} value={freq}>
                            {freq}
                        </option>
                    ))}
                </select>
            </div>

            {}
            <div className="flex flex-col">
                <label htmlFor="distance">What is the total distance of your trip?</label>
                <input
                    id="distance"
                    type="number"
                    name="distance"
                    placeholder="0"
                    value={formData.distance}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            {}
            <button
                type="button"
                onClick={addTrip}
                className="w-full p-2 bg-blue-500 text-white rounded"
            >
                Add Trip
            </button>

            {}
            <div className="space-y-2">
                {trips.map((trip, index) => (
                    <Trip key={index} trip={trip} index={index} removeTrip={removeTrip} />
                ))}
            </div>
        </div>
    );
};

export default TripForm;
