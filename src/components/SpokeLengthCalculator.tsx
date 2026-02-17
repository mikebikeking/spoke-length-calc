import { useState, useEffect, useRef } from 'react';
import type { WheelSpecs } from '../types/spoke';
import { calculateSpokeLength, validateSpecs } from '../utils/spokeCalculations';
import CalculatorForm from './CalculatorForm';
import ResultsDisplay from './ResultsDisplay';
import { AlertTriangle } from 'lucide-react';

const SpokeLengthCalculator = () => {
  const topRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: 'start' });
    });
  }, [showResults]);

  const handleCalculate = () => {
    const validationErrors = validateSpecs(specs);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setShowResults(false);
    } else {
      setErrors([]);
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setErrors([]);
  };

  const results = showResults ? calculateSpokeLength(specs) : null;

  return (
    <div ref={topRef} className="min-h-screen py-12 px-4 relative z-10" style={{ overflowAnchor: 'none' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Spoke Length Calculator
          </h1>
        </div>

        {/* Main Content */}
        <div className="workshop-card rounded-2xl p-8">
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <h3 className="text-red-800 font-bold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Validation Errors
              </h3>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {!showResults ? (
            <CalculatorForm
              specs={specs}
              setSpecs={setSpecs}
              onCalculate={handleCalculate}
            />
          ) : results && (
            <ResultsDisplay
              specs={specs}
              results={results}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-xs">
            Always verify measurements before ordering. This tool is provided as-is for educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpokeLengthCalculator;
