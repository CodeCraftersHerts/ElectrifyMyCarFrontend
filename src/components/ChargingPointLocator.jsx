import Navbar from "./Navbar"
import MobileNavBar from "./MobileNavBar";
import Footer from "./Footer"

const ChargingPointLocator = () => {

    return(
        <>

        <div className="min-h-screen flex flex-col bg-standardBlue1"> 

        <Navbar/>
        <MobileNavBar/>
        <div className="flex flex-col align-middle items-center" >
            <div className="text-white text-2xl mt-36 font-bold">
                Charging point locator will go here.
            </div>

            <div className="flex text-center align-center justify-center items-center text-2xl w-96 h-96 bg-slate-400 rounded-lg mt-20">
                Map tool will go here
            </div>

        </div>
        
    
       



        <Footer></Footer>

        </div>
        </>
    )
}

export default ChargingPointLocator;