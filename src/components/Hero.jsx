import heroImage from "../assets/images/hero1.jpg"; 

const Hero = () => {
  return (
    <div className="fixed top-12 md:top-16 left-0 w-screen h-[400px] z-10">
      <img 
        src={heroImage} 
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
        <h1 className="text-white text-4xl sm:text-6xl font-bold"></h1>
      </div>
    </div>
  );
};

export default Hero;
