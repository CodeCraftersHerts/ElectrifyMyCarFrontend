import React from 'react';
import './App.css';

import Home from  './pages/Home'
import VehicleComparison from './pages/VehicleComparison';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComparisonPage from './pages/ComparisonPage';
import ChargingPointLocator from './pages/ChargingPointLocator';
import VehicleCatalogue from './pages/VehicleCatalogue';
import ChargingGuide from './pages/ChargingGuide';
import CostCalculations from './pages/CostCalculations';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charging-locator" element={<ChargingPointLocator/>}/>
          <Route path="/vehicle-comparison" element={<VehicleComparison />} />
          <Route path="/vehicle-catalogue" element={<VehicleCatalogue/>} />
          <Route path="/charging-guide" element={<ChargingGuide/>} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/cost-calculations" element={<CostCalculations />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;