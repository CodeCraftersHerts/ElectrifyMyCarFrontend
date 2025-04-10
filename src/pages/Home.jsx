import { useEffect } from 'react';
import heroImage from "../assets/images/TeslaFront.png";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import MobileNavBar from '../components/MobileNavBar';
import HomeContent from '../components/HomeContent';
import { warmUpVehicleAPI } from '../utils/fetchVehicles';

const Home = () => {
  useEffect(() => {
    warmUpVehicleAPI();
  }, []);

  return (
    <>
      <div className="fixed inset-0 w-full h-screen bg-black">
        <img
          src={heroImage}
          alt="Background"
          className="w-full h-full object-cover xl:w-8/12 xl:mx-auto"
        />
        <div className="absolute inset-0 bg-black opacity-60 h-full"></div>
      </div>

      <div className="min-h-screen relative flex flex-col ">
        <Navbar />
        <MobileNavBar />
        <Hero />
        <HomeContent />
        <Footer />
      </div>
    </>
  );
};

export default Home;
