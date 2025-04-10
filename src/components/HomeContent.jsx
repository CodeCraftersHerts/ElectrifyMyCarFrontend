import React from 'react';
import StepsNavigator from '../components/StepsNavigator';
import { electricCarInfo } from '../copyContent/mainPageCopy';
import ContentCard from './ContentCard';
import StatCard from './StatCard';
import { statCardContent } from './statCardContent';

const HomeContent = () => {
  return (
    <div className="flex items-center flex-grow flex-col justify-center mt-[250px] sm:mt-[200px] md:mt-[200px] lg:mt-[250px] xl:mt-[300px] text-white z-20">
      
      <div className="bg-slate-800 w-full min-h-64 flex flex-col   md:items-center md:justify-center text-center md:text-left bg-opacity-80 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">How to use this website?</h2>
        <h2 className="text-lg max-w-xl text-center py-4 mb-6">Navigate through the steps to follow a journey that will help you switch from your convential fuel vehicle to using an electric vehicle</h2>
        <StepsNavigator currentStep={1} />
      </div>
      

      <div className="flex flex-col w-full justify-around items-center bg-transparent">
        {electricCarInfo.benefits.map((benefit, idx) => (
          <React.Fragment key={idx}>
            <ContentCard benefit={benefit} index={idx} />
            {idx < electricCarInfo.benefits.length - 1 && statCardContent[idx] && (
              <StatCard content={statCardContent[idx]} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
