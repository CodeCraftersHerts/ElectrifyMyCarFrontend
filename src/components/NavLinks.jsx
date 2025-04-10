import { navLinks } from "./Links";
import { useNavigate } from "react-router-dom";

const NavLinks = ({ activeLink }) => {
  const navigate = useNavigate();

  const linkClass = (isActive) =>
    `w-full flex items-center justify-center gap-4 text-center text-black text-xs sm:text-sm cursor-pointer rounded-lg py-1 px-2 transition-colors ${
      isActive
        ? 
          "ring-2 ring-slate-200 ring-offset-2 ring-offset-slate-700 bg-slate-300 focus:outline-none"
        : "bg-slate-300 hover:underline hover:bg-slate-100 focus:outline-none"
    }`;

  return (
    <nav>
      <ul className="grid grid-cols-3 2xl:grid-cols-6 gap-2 2xl:gap-8">
        {navLinks.map((link, index) => {
          const isActive = activeLink === link.url;
          return (
            <li key={index} onClick={() => navigate(link.url)}>
              <span className={linkClass(isActive)}>
                {link.icon && <link.icon className="inline-block" />}
                {link.text}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks;

