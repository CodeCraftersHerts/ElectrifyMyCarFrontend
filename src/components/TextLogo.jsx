
import { useNavigate } from 'react-router-dom';

const TextLogo = ({appName}) => {

    const navigate = useNavigate(); 
    const handleLinkClick = (url) => {
        navigate(url);
    };
    
    return(<>
    <div className="text-2xl " onClick={() => handleLinkClick("/")}>{appName}
       
        </div></>);

}

export default TextLogo;