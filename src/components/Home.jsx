import heroImage from "../assets/images/hero1.jpg";
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import MobileNavBar from './MobileNavBar';
import HomeContent from './HomeContent';

const Home = () => {
  return (
    <>
      {/* Background image container */}
      <div className="fixed inset-0 w-full h-screen">
  <img
    src={heroImage}
    alt="Background"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black opacity-50 h-full"></div>
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
