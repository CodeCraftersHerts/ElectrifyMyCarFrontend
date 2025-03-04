import { useState, useEffect } from "react";
import heroImage from "../assets/images/hero1.jpg";

const Hero = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {

      const scrollY = window.scrollY || document.documentElement.scrollTop;

      //increase to make fade out longer
      const maxScroll = 100; 
     
      let newOpacity = 1 - scrollY / maxScroll;
      newOpacity = Math.max(0, Math.min(1, newOpacity)); 

      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-12 md:top-16 left-0 w-screen h-[400px] z-10">
      
      <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
        <div
          className="text-white text-4xl sm:text-6xl font-bold transition-opacity duration-100 flex flex-col align-top self-start mt-12 md:mt-28 p-8 lg:mt-30 text-center shadow-lg"
          style={{ opacity }}
        >
          <p>Make the switch today...</p>
      
        
        </div>
      </div>
    </div>
  );
};

export default Hero;
