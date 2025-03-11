import Navbar from "./Navbar";
import MobileNavBar from "./MobileNavBar";
import Footer from "./Footer";

const ChargingPointLocator = () => {
  return (
    <div className="min-h-screen bg-standardBlue1">
      <Navbar />
      <MobileNavBar />

      <div className="pt-20 p-0 md:px-4">
        <h1 className="text-white text-2xl font-bold text-center mb-8 mt-12 underline underline-offset-8">
          Charging Point Locator
        </h1>

      
        <div className="w-full md:max-w-4xl mx-auto mt-10">
         
          <div className="relative w-full h-[450px] md:h-[500px] ">
            <iframe
                className="md:rounded-xl overflow-hidden"

         
              src="https://map.openchargemap.io/?mode=embedded&latitude=51.7615661406024&longitude=-0.24777946105030357"
              allow="geolocation"
              frameBorder="0"
              width="100%"
              height="100%"
              title="Open Charge Map"
              
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChargingPointLocator;
