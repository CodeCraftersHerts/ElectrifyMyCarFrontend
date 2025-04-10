import { FaCar, FaChargingStation, FaCalculator, FaMapMarkerAlt, FaExchangeAlt, FaHome } from 'react-icons/fa';

export const navLinks = [
  { text: "Overview", url: "/", icon: FaHome },
  { text: "Savings calculator", url: "/cost-calculations", icon: FaCalculator },
  { text: "Vehicle Comparison", url: "/vehicle-comparison", icon: FaExchangeAlt },
  { text: "EV Vehicle Catalogue", url: "/vehicle-catalogue", icon: FaCar },
  { text: "Charging Point Guide", url: "/charging-guide", icon: FaChargingStation },
  
  { text: "Charging Point Locator", url: "/charging-locator", icon: FaMapMarkerAlt },
  
];
