import React from 'react';
import './App.css';

import Home from  './components/Home'
import Comparator from './components/Comparator'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComparisonPage from './components/ComparisonPage';
import ChargingPointLocator from './components/ChargingPointLocator';
import VehicleCatalogue from './components/VehicleCatalogue';
import ChargingGuide from './components/ChargingGuide';
import CostCalculations from './components/CostCalculations';
function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/charging-locator" element={<ChargingPointLocator/>}/>
        <Route path="/vehicle-comparison" element={<Comparator />} />
        <Route path="/vehicle-catalogue" element={<VehicleCatalogue/>} />
        <Route path="/charging-guide" element={<ChargingGuide/>} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/cost-calculations" element={<CostCalculations />} />
      </Routes>
    </Router>
    
  );
}

export default App;
