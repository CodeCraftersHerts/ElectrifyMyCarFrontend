import FuelComparisonForm from './FuelComparisonForm'
import Navbar from './Navbar';
import MobileNavBar from './MobileNavBar';
import Footer from './Footer';
import MultiStepForm from './MultiStepForm';
import FuelComparisonMultiStepForm from './FuelComparisonMultiStepForm';

const Comparator = () => {


    return(<>

<div className="min-h-screen flex flex-col bg-standardBlue1"> 

        <Navbar/>
        <MobileNavBar/>
        <div className="min-h-96 mt-40 mb-10">
        {/* <FuelComparisonForm className="top-16" /> */}

        {/* <MultiStepForm></MultiStepForm> */}

        <FuelComparisonMultiStepForm></FuelComparisonMultiStepForm>

        </div>
        



        <Footer></Footer>

    </div>
    </>);
}

export default Comparator;