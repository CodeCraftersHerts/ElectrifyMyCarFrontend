import React from 'react';

const StatCard = ({ content }) => {
  return (
    <div className="bg-transparent w-full h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-4">
      
        <div className="text-white">  
          {content.icon}
        </div>
        <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white w-6/12 px-4">
          {content.text}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
