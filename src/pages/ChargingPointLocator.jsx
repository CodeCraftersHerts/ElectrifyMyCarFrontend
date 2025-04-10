import Navbar from "../components/Navbar";
import MobileNavBar from "../components/MobileNavBar";
import Footer from "../components/Footer";
import { 
  FaMapMarkerAlt, 
  FaParking, 
  FaBolt, 
  FaPlug, 
  FaPlay, 
  FaEye, 
  FaCreditCard, 
  FaExclamationTriangle, 
  FaCarSide 
} from "react-icons/fa";
import { IconContext } from "react-icons";
import StepsNavigator from "../components/StepsNavigator";

const steps = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Find a Charging Station",
    description:
      "Use an app like Zapmap to locate nearby stations. Check availability and connector compatibility with your vehicle.",
  },
  {
    icon: <FaParking />,
    title: "Park Appropriately",
    description:
      "Position your car to ensure easy access to the charging port.",
  },
  {
    icon: <FaBolt />,
    title: "Check Connector Compatibility",
    description:
      "Ensure the connector matches your EV port (usually Type 2 in the UK).",
  },
  {
    icon: <FaPlug />,
    title: "Access the Charging Cable",
    description:
      "Use the station's cable or your own, depending on the setup.",
  },
  {
    icon: <FaPlug />,
    title: "Plug In",
    description:
      "Connect the cable securely to your vehicle’s port.",
  },
  {
    icon: <FaPlay />,
    title: "Initiate Charging",
    description:
      "Charging may start automatically or require an app, RFID card, or button press.",
  },
  {
    icon: <FaEye />,
    title: "Monitor Charging",
    description:
      "Use the station display or app to track progress and time remaining.",
  },
  {
    icon: <FaCreditCard />,
    title: "Payment",
    description:
      "Most stations accept contactless cards; others may require a network-specific app or RFID card.",
  },
];

const ChargingPointLocator = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800 text-white">
      <Navbar />
      <MobileNavBar />
      <StepsNavigator className="mt-28" currentStep={6} />
      <header className="text-center my-10">
          <h1 className="text-5xl font-bold mb-4">Charging Point Locator</h1>
          <p className="text-xl mx-auto max-w-2xl">
            Find a charging station close to you. Enter your postcode or location to search nearby locations.
          </p>
        </header>
      <main className=" p-4 md:px-8">
 
        
        {}
        <section className="w-full md:max-w-5xl mx-auto mt-8">
          <div className="relative w-full h-[450px] md:h-[500px]">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://map.openchargemap.io/?mode=embedded&latitude=51.7615661406024&longitude=-0.24777946105030357"
              allow="geolocation"
              frameBorder="0"
              title="Open Charge Map"
            />
          </div>
        </section>
       
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-center mb-8">
            How to Use EV Charging Stations (UK)
          </h2>
          <div className="flex text-center sm:w-8/12 mx-auto my-16 px-4 text-sm sm:text-lg">
            <p>
                      To use a charging location in the UK for your electric vehicle, you need to: locate a
            charging station using an app like Zapmap, ensure your car's charging port is
            compatible with the station's connector, plug in the charging cable, start the charging
            session using the station's app or contactless payment method, and monitor the
            charging progress until complete; always check for availability and payment options
            before arriving at a charging station
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-slate-700 p-6 rounded-lg shadow-lg flex items-start"
              >
                <IconContext.Provider
                  value={{ size: "2em", className: "mr-4 text-green-400" }}
                >
                  <div>{step.icon}</div>
                </IconContext.Provider>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
       
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <IconContext.Provider
                value={{ size: "1.5em", className: "mr-2 text-yellow-400" }}
              >
                <FaExclamationTriangle />
              </IconContext.Provider>
              <h3 className="text-2xl font-semibold">Important Notes</h3>
            </div>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>
                <strong>Different Charging Networks:</strong> Various apps or accounts might be needed based on the provider.
              </li>
              <li>
                <strong>Zap-Pay:</strong> Use Zapmap to pay across multiple networks with your debit/credit card.
              </li>
              <li>
                <strong>Charging Etiquette:</strong> Avoid blocking connectors or overstaying once fully charged.
              </li>
              <li>
                <strong>Check Charging Speeds:</strong> Consider the charging speed (kW) for longer trips.
              </li>
            </ul>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <IconContext.Provider
                value={{ size: "1.5em", className: "mr-2 text-blue-400" }}
              >
                <FaCarSide />
              </IconContext.Provider>
              <h3 className="text-2xl font-semibold">
                Types of Charging Locations in the UK
              </h3>
            </div>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Home Charging</li>
              <li>Public Charging Stations</li>
              <li>Destination Charging</li>
              <li>Workplace Charging</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChargingPointLocator;
