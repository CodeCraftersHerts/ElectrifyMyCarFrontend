import React from 'react';
import TextLogo from './TextLogo';
import ImageLogo from './ImageLogo';
import MobileNavLinks from './MobileNavLinks';


const MobileNavBar = () => {

   

    return (
        <div className="text-white md:hidden bg-standardBlue1 w-full fixed z-30 pr-6 pl-6">
            <div className="flex align-middle items-center justify-between pt-2 pb-2">
                <ImageLogo />
                <TextLogo appName="ElectrifyMyCar" />
                <MobileNavLinks  />
            </div>
        </div>
    );
};

export default MobileNavBar;
