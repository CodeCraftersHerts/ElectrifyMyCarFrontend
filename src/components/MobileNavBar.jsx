import React from 'react';
import TextLogo from './TextLogo';
import ImageLogo from './ImageLogo';
import MobileNavLinks from './MobileNavLinks';
import { useNavigate } from "react-router-dom";

const MobileNavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="block md:hidden bg-slate-700 w-full fixed z-30 pr-6 pl-6 py-2 text-white">
      <div className="flex items-center justify-between pt-2 pb-2">
        <ImageLogo onClick={() => navigate('/')}  />
        <TextLogo appName="ElectrifyMyCar" onClick={() => navigate('/')}  />
        <MobileNavLinks />
      </div>
    </div>
  );
};

export default MobileNavBar;
