import { useState, useEffect } from 'react';
import type { WheelSpecs } from '../types/spoke';
import { calculateSpokeLength, validateSpecs } from '../utils/spokeCalculations';
import CalculatorForm from './CalculatorForm';
import ResultsDisplay from './ResultsDisplay';
import SpinningWheel from './SpinningWheel';

const SpokeLengthCalculator = () => {
  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const [specs, setSpecs] = useState<WheelSpecs>({
    erd: 602,
    spokeCount: 28,
    leftFlangeD: 58,
    rightFlangeD: 58,
    leftCenterToFlange: 35,
    rightCenterToFlange: 35,
    crossPattern: '2x',
    offset: 0,
  });
  
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const handleCalculate = () => {
    const validationErrors = validateSpecs(specs);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setShowResults(false);
    } else {
      setErrors([]);
      setIsCalculating(true);
      
      // Simulate calculation delay for polish - longer delay for better UX
      setTimeout(() => {
        setIsCalculating(false);
        setShowResults(true);
      }, 2000);
    }
  };
  
  const handleReset = () => {
    setShowResults(false);
    setErrors([]);
  };
  
  const results = showResults ? calculateSpokeLength(specs) : null;

  return (
    <div className="min-h-screen py-12 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="wheel-icon relative w-20 h-20 aspect-square">
              {/* Outer rim */}
              <div className="absolute inset-0 rounded-full border-4 border-blue-400 shadow-lg shadow-blue-500/50"></div>
              {/* Hub */}
              <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-inner"></div>
              {/* Spokes */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 h-[2px] w-1/2 origin-left bg-gradient-to-r from-slate-300 to-transparent"
                    style={{ transform: `rotate(${i * 18}deg)` }}
                  />
                ))}
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white text-shadow-tool">
              Spoke Length Calculator
            </h1>
          </div>
          <p className="text-xl text-spoke-silver text-shadow-subtle">
            Precision wheel building from 20 years of wrenching experience
          </p>
          <p className="text-sm text-aluminum mt-2 italic">
            "Measure twice, build once" - Shop wisdom since 2006
          </p>
        </div>

        {/* Main Content */}
        <div className="workshop-card rounded-2xl p-8">
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <h3 className="text-red-800 font-bold mb-2">⚠️ Validation Errors:</h3>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {!showResults ? (
            isCalculating ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center justify-center">
                  <SpinningWheel size={120} spokeCount={specs.spokeCount} />
                  <p className="mt-6 text-slate-600 font-semibold text-lg">Calculating spoke lengths...</p>
                  <p className="mt-2 text-slate-500 text-sm">Precision takes time</p>
                </div>
              </div>
            ) : (
              <CalculatorForm 
                specs={specs}
                setSpecs={setSpecs}
                onCalculate={handleCalculate}
              />
            )
          ) : results && (
            <ResultsDisplay 
              specs={specs}
              results={results}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-3">
          <p className="text-spoke-silver text-lg font-semibold text-shadow-subtle">
            🔧 Built by a mechanic who's built thousands of wheels
          </p>
          
          <p className="text-slate-400 text-xs">
            Always verify measurements before ordering. This tool is provided as-is for educational purposes.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default SpokeLengthCalculator;