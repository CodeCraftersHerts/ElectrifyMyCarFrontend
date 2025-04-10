import TextLogo from './TextLogo';
import ImageLogo from './ImageLogo';
import NavLinks from './NavLinks';
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="hidden md:block bg-slate-700 w-full fixed z-30 pr-6 pl-6 py-4 md:p-2 xl:py-4 xl:px-8 text-white shadow-xl">
      <div className="flex items-center justify-between pt-2 pb-1">
        <div
          onClick={() => navigate('/')}
          className="flex flex-col xl:flex-row gap-2 items-center hover:text-slate-400 hover:cursor-pointer"
        >
          <ImageLogo />
          <TextLogo appName="ElectrifyMyCar" />
        </div>
        {}
        <NavLinks activeLink={location.pathname} />
      </div>
    </div>
  );
};

export default Navbar;
