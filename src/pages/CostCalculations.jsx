import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MobileNavBar from '../components/MobileNavBar';
import Footer from '../components/Footer';
import FuelComparisonForm from '../components/FuelComparisonForm';
import ComparisonPage from '../pages/ComparisonPage';
import StepsNavigator from '../components/StepsNavigator';

const CostCalculations = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const handleReset = () => {
    setFormData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      <Navbar />
      <MobileNavBar />
      <StepsNavigator className="mt-28" currentStep={2} />
      <header className="text-center my-10 text-white">
        <h1 className="text-5xl font-bold mb-4">Fuel savings calculator</h1>
        <p className="text-xl mx-auto max-w-2xl">
          Compare your current fuel car with electric vehicles.
        </p>
      </header>

      <div className="mt-20 mb-10 flex flex-col items-center w-full">
        {!formData ? (
          <div className="w-full md:w-8/12">
            <FuelComparisonForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <ComparisonPage formData={formData} onReset={handleReset} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CostCalculations;
