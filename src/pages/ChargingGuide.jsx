import Navbar from "../components/Navbar";
import MobileNavBar from "../components/MobileNavBar";
import Footer from "../components/Footer";
import { FaHome, FaCalculator, FaPlug, FaTools } from "react-icons/fa";
import { IconContext } from "react-icons";
import ChargingGuideImage from "../assets/images/ChargingGuide.png";
import StepsNavigator from "../components/StepsNavigator";

const infoCards = [
  {
    icon: <FaHome />,
    title: "EV Home Basics",
    description:
      "Understand the fundamentals of home charging for efficiency and convenience.",
  },
  {
    icon: <FaCalculator />,
    title: "Charging Calculator",
    description:
      "Estimate charging time, cost, and range with our interactive tool.",
  },
  {
    icon: <FaPlug />,
    title: "Equipment",
    description:
      "Explore various charging equipment options for your home setup.",
  },
  {
    icon: <FaTools />,
    title: "Installation",
    description:
      "Get expert advice on safely installing your home EV charging station.",
  },
];

const ChargingGuide = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      <Navbar />
      <MobileNavBar />
      <StepsNavigator className="mt-28" currentStep={5} />
      <header className="text-center my-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Charging Guide</h1>
          <p className="text-xl mx-auto max-w-2xl">
          Home charging is the most convenient way to keep your electric vehicle powered up.
              Our guide explains the basics of charging levels, benefits, and smart energy management.
              Learn how to optimize your setup for cost savings and battery health, ensuring a smooth
              and efficient charging experience.
          </p>
        </header>
      <main className="flex-grow px-4 ">

        
        <section className="flex flex-col items-center justify-center ">
     
          

          <div className="lg:w-1/2 flex align-middle justify-center">
            <img
              src={ChargingGuideImage}
              alt="Charging Guide"
              className="w-full sm:w-4/12 rounded-lg shadow-lg"
            />
          </div>

          <a
              href="https://preview--ev-charge-pathfinder.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-slate-700 text-white font-semibold px-8 py-3 rounded-xl shadow-xl hover:bg-slate-600 transition duration-300 mt-6"
            >
              Click here to see the guide
            </a>
        
          
        </section>

       
        <section className="mt-12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {infoCards.map((card, index) => (
              <div
                key={index}
                className="bg-slate-700 p-6 rounded-lg shadow-lg text-center"
              >
                <IconContext.Provider
                  value={{ size: "2em", className: "text-green-400 mx-auto mb-4" }}
                >
                  <div>{card.icon}</div>
                </IconContext.Provider>
                <h3 className="text-xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-white">{card.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChargingGuide;
