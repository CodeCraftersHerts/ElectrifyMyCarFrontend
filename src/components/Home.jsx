
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import MobileNavBar from './MobileNavBar';
import HomeContent from './HomeContent';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    
    return(
        <>
        <div className="min-h-screen flex flex-col bg-standardBlue1"> 

        <Navbar/>
        <MobileNavBar/>
        <Hero/>
        <HomeContent/>

       

       <Footer></Footer>
        
        </div>
        
        </>
    );
}

export default Home;