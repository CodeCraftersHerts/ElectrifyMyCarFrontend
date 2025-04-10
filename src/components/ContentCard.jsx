import React from 'react';
import evTypes from '../assets/images/Types_of_Electric_Vehicles_outline.png';
import consumption from '../assets/images/TE-worst-case-1536x1085.png';
import energyNeeds from '../assets/images/To-EV-or-not-to-EV_01_energy_needs-1160x463.png';
import prosCons from '../assets/images/Advantahes-And-Disadvantages-of-Electric-Cars.png';
import dbVehicles from '../assets/images/de3b8aeba02faacbab9ee2683ae2e0894.png';

const ContentCard = ({ benefit, index }) => {
  const images = [evTypes, consumption, energyNeeds, prosCons, dbVehicles];

  const sources = [
    'https://sklep.foteks.pl/fototapety-431936580-types-of-electric-vehicles-with-labeled-battery-and-motor-outline-diagram-educational-scheme-with-hybrid-plug-in-and-electricity-car-power-supply-vector-illustration-compared-model-differences.html',
    'https://thedriven.io/wp-content/uploads/2020/04/TE-worst-case-1536x1085.png',
    'https://au.travelctm.com/blog/sustainable-car-hire-hertz/',
    'https://thedriven.io/wp-content/uploads/2020/04/TE-worst-case-1536x1085.png',
    'https://www.vehiclecontracts.co.uk/blog/could-evs-solve-the-uks-noise-pollution-problem/'
  ];

  return (
    <div className="bg-slate-800 w-full min-h-64 lg:min-h-96 flex flex-col md:flex-row md:items-center md:justify-center text-center md:text-left bg-opacity-80 py-8">
      <div className="md:w-1/2 p-4 text-center">
        <h2 className="font-semibold py-2 text-2xl sm:text-4xl">
          {benefit.title}
        </h2>
        <p className="mt-4 px-4">
          {benefit.content}
        </p>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center items-center p-4">
        {images[index] && (
          <>
            <img
              src={images[index]}
              alt={benefit.title}
              className="w-full md:w-full h-auto rounded-xl"
            />
            <p className="text-sm italic mt-2">
              Image source:{' '}
              <a href={sources[index]} className="underline text-blue-300">
                {sources[index]}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
