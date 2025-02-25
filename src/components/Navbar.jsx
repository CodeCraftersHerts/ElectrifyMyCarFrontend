import TextLogo from './TextLogo';
import ImageLogo from './ImageLogo';
import NavLinks from './NavLinks';


const Navbar = () => {

    return(<>


        <div className="text-white md:block hidden bg-standardBlue1 w-full fixed z-30  pr-6 pl-6 ">
            

            <div className="flex align-middle items-center justify-between pt-2 pb-2">
                <TextLogo appName={"ElectrifyMyCarTest"}></TextLogo>
                <ImageLogo></ImageLogo>
            </div>
            <div className="pt-2 pb-2 hidden md:block">
                <NavLinks></NavLinks>
            </div>
            
        </div>
    </>);



}

export default Navbar;