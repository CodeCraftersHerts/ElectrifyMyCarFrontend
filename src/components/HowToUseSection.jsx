import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowToUseSection = () => {
  const navigate = useNavigate();
  // Define your steps in order.
  const steps = [
    { step: 1, label: "Cost Calculation", route: "/cost-calculations" },
    { step: 2, label: "Vehicle Comparison", route: "/vehicle-comparison" },
    { step: 3, label: "Vehicle Catalogue", route: "/vehicle-catalogue" },
    { step: 4, label: "Charging Guide", route: "/charging-guide" },
    { step: 5, label: "Charging Locator", route: "/charging-locator" },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">How to use this website?</h2>
      
      {}
      <div className="hidden md:flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(step.route)}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {step.step}
              </div>
              <span className="mt-2 text-sm">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="mx-4 text-white" />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {}
      <div className="md:hidden grid grid-cols-3 gap-4 justify-items-center">
        {}
        {steps.slice(0, 3).map((step) => (
          <div
            key={step.step}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate(step.route)}
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {step.step}
            </div>
            <span className="mt-2 text-sm text-center">{step.label}</span>
          </div>
        ))}
        {}
        <div className="invisible" />
        {}
        {steps.slice(3).map((step) => (
          <div
            key={step.step}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate(step.route)}
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {step.step}
            </div>
            <span className="mt-2 text-sm text-center">{step.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToUseSection;
