import { useState } from "react";
import type { WheelSpecs, SpokeLengthResult } from "../types/spoke";
import { RotateCcw, Printer, AlertTriangle, ChevronDown, ChevronUp, Info } from "lucide-react";

interface ResultsDisplayProps {
  specs: WheelSpecs;
  results: SpokeLengthResult;
  onReset: () => void;
}

const ResultsDisplay = ({ specs, results, onReset }: ResultsDisplayProps) => {
  const [tipsOpen, setTipsOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const areSidesEqual = results.leftSpokeRounded === results.rightSpokeRounded;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b-2 border-slate-200 pb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Spoke Length Results
        </h2>
        <p className="text-slate-600">
          {specs.spokeCount} spokes &bull; {specs.crossPattern} pattern &bull; ERD:{" "}
          {specs.erd}mm
          {specs.offset !== 0 && ` \u2022 Offset: ${specs.offset}mm`}
        </p>
      </div>

      {/* Main Results */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="result-card-left p-6 rounded-xl">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Left Side (Non-Drive)
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-blue-700 mb-1">Exact Length:</p>
              <p className="text-3xl font-bold text-blue-600">
                {results.leftSpoke.toFixed(2)} mm
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700 mb-1">Order This Length:</p>
              <p className="text-4xl font-bold text-blue-700">
                {results.leftSpokeRounded} mm
              </p>
            </div>
            <div className="text-xs text-blue-600 space-y-1">
              <p>Flange Ø: {specs.leftFlangeD}mm</p>
              <p>Center to Flange: {specs.leftCenterToFlange}mm</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="result-card-right p-6 rounded-xl">
          <h3 className="text-xl font-bold text-amber-900 mb-4">
            Right Side (Drive Side)
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-amber-700 mb-1">Exact Length:</p>
              <p className="text-3xl font-bold text-amber-600">
                {results.rightSpoke.toFixed(2)} mm
              </p>
            </div>
            <div>
              <p className="text-sm text-amber-700 mb-1">Order This Length:</p>
              <p className="text-4xl font-bold text-amber-700">
                {results.rightSpokeRounded} mm
              </p>
            </div>
            <div className="text-xs text-amber-600 space-y-1">
              <p>Flange Ø: {specs.rightFlangeD}mm</p>
              <p>Center to Flange: {specs.rightCenterToFlange}mm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equal Sides Notice */}
      {areSidesEqual && (
        <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
          <p className="text-green-800 font-semibold text-center">
            Both sides use the same spoke length: {results.leftSpokeRounded}mm
          </p>
          <p className="text-green-700 text-sm text-center mt-1">
            Order {specs.spokeCount} spokes of this length
          </p>
        </div>
      )}

      {/* Different Sides Notice */}
      {!areSidesEqual && (
        <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
          <p className="text-amber-800 font-semibold text-center mb-2 flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Different spoke lengths required
          </p>
          <div className="text-amber-700 text-sm text-center space-y-1">
            <p>
              Left: {specs.spokeCount / 2} spokes × {results.leftSpokeRounded}mm
            </p>
            <p>
              Right: {specs.spokeCount / 2} spokes × {results.rightSpokeRounded}mm
            </p>
          </div>
        </div>
      )}

      {/* Conditional Warnings */}
      {specs.crossPattern === "radial" && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-800 text-sm flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Radial lacing:</strong> Only use radial on non-drive side or front wheels.
              Drive-side radial can fail under torque.
            </span>
          </p>
        </div>
      )}

      {/* Tips (collapsible) */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setTipsOpen(!tipsOpen)}
          className="w-full flex items-center justify-between p-4 text-left text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2 font-semibold">
            <Info className="w-4 h-4" />
            Notes &amp; Tips
          </span>
          {tipsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {tipsOpen && (
          <div className="px-4 pb-4 text-sm text-slate-600 space-y-2">
            <p>
              <strong>Assumptions:</strong> Standard J-bend spokes with brass nipples.
              Straight-pull or aluminum nipples may require adjustment.
            </p>
            <p>
              <strong>Tolerances:</strong> Most manufacturers round to the nearest 1mm.
              Being 0.5mm off is fine.
            </p>
            <p>
              <strong>Verify your ERD:</strong> Don't trust manufacturer specs.
              Measure your actual rim's ERD with a spoke and nipple.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 print:hidden">
        <button
          onClick={onReset}
          className="tool-button flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Calculate Again
        </button>
        <button
          onClick={handlePrint}
          className="calculate-button flex-1 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print Results
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
