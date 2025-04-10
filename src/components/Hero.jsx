import { useState, useEffect } from "react";
import { LuCar, LuDollarSign, LuGlobe, LuZap } from "react-icons/lu";

const Hero = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = 100;
      let newOpacity = 1 - scrollY / maxScroll;
      newOpacity = Math.max(0, Math.min(1, newOpacity));
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-cover bg-center z-10">
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white mt-40 text-center gap-12">
        <p className="text-4xl md:text-6xl font-bold">
          Join the Electric Revolution
        </p>
        <p className="text-4xl md:text-6xl font-bold">
          Make the Switch Today
        </p>
        {}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <LuCar size={40} />
            <span className="mt-2">Drive Smarter</span>
          </div>
          <div className="flex flex-col items-center">
            <LuDollarSign size={40} />
            <span className="mt-2">Reduce Costs</span>
          </div>
          <div className="flex flex-col items-center">
            <LuGlobe size={40} />
            <span className="mt-2">Protect the Planet</span>
          </div>
          <div className="flex flex-col items-center">
            <LuZap size={40} />
            <span className="mt-2">Innovate Further</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
