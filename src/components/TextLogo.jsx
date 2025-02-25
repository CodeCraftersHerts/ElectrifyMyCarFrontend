
import { useNavigate } from 'react-router-dom';

const TextLogo = ({appName}) => {

    const navigate = useNavigate(); 
    const handleLinkClick = (url) => {
        navigate(url);
    };
    
    return(<>
    <div className="text-2xl hover:cursor-pointer hover:text-[#ffea9e]" onClick={() => handleLinkClick("/")}>{appName}
       
        </div></>);

}

export default TextLogo;