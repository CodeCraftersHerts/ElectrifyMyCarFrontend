import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StepsNavigator = ({ currentStep, className = "" }) => {
  const navigate = useNavigate();

  const steps = [
    { step: 1, label: "Electric Car Overview", route: "/" },
    { step: 2, label: "Savings Calculator", route: "/cost-calculations" },
    { step: 3, label: "Vehicle Comparison", route: "/vehicle-comparison" },
    { step: 4, label: "Vehicle Catalogue", route: "/vehicle-catalogue" },
    { step: 5, label: "Charging Guide", route: "/charging-guide" },
    { step: 6, label: "Charging Locator", route: "/charging-locator" },
  ];

  return (
    // Center within a max width, and add small top/bottom margin so it's less intrusive.
    <section className={`max-w-screen-md mx-auto my-2 text-white ${className}`}>
      
      {}
      <div className="hidden md:flex items-center justify-center text-xs">
        {steps.map((stepObj, index) => {
          const isActive = stepObj.step === currentStep;
          return (
            <React.Fragment key={stepObj.step}>
              <div 
                className="flex flex-col items-center cursor-pointer"
                onClick={() => navigate(stepObj.route)}
              >
                <div
                  // Use ring for active step, border for inactive
                  className={
                    "relative w-8 h-8 flex items-center justify-center rounded-full transition-colors font-semibold " +
                    (isActive
                      ? "bg-white text-slate-800 ring-2 ring-slate-200 ring-offset-2 ring-offset-slate-700 bg-slate-300 focus:outline-none"
                      : "bg-white text-slate-800 border border-slate-800")
                  }
                >
                  {stepObj.step}
                </div>
                <span className="mt-1 text-[0.7rem] whitespace-nowrap">
                  {stepObj.label}
                </span>
              </div>
              
              {}
              {index < steps.length - 1 && (
                <ArrowRight className="text-white w-4 h-4 mx-2" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {}
      <div className="md:hidden flex flex-wrap items-center justify-center gap-3 text-xs">
        {steps.map((stepObj) => {
          const isActive = stepObj.step === currentStep;
          return (
            <div 
              key={stepObj.step}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(stepObj.route)}
            >
              <div
                className={
                  "w-6 h-6 flex items-center justify-center rounded-full transition-colors font-semibold " +
                  (isActive
                    ? "bg-white text-slate-800 ring-2 ring-blue-500"
                    : "bg-white text-slate-800 border border-slate-800")
                }
              >
                {stepObj.step}
              </div>
              <span className="mt-1 text-[0.65rem] text-center">
                {stepObj.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StepsNavigator;
