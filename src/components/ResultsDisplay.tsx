import type { WheelSpecs, SpokeLengthResult } from "../types/spoke";

interface ResultsDisplayProps {
  specs: WheelSpecs;
  results: SpokeLengthResult;
  onReset: () => void;
}

const ResultsDisplay = ({ specs, results, onReset }: ResultsDisplayProps) => {
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
          {specs.spokeCount} spokes • {specs.crossPattern} pattern • ERD:{" "}
          {specs.erd}mm
          {specs.offset !== 0 && ` • Offset: ${specs.offset}mm`}
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
            ✓ Both sides use the same spoke length: {results.leftSpokeRounded}mm
          </p>
          <p className="text-green-700 text-sm text-center mt-1">
            Order {specs.spokeCount} spokes of this length
          </p>
        </div>
      )}

      {/* Different Sides Notice */}
      {!areSidesEqual && (
        <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
          <p className="text-amber-800 font-semibold text-center mb-2">
            ⚠️ Different spoke lengths required
          </p>
          <div className="text-amber-700 text-sm text-center space-y-1">
            <p>
              Left: {specs.spokeCount / 2} spokes × {results.leftSpokeRounded}mm
            </p>
            <p>
              Right: {specs.spokeCount / 2} spokes × {results.rightSpokeRounded}
              mm
            </p>
          </div>
        </div>
      )}

      {/* Pro Tips */}
      <div className="shop-manual p-6 rounded-xl relative z-10">
        <h3 className="text-xl font-bold text-amber-900 mb-4">
          🔧 Pro Tips from the Shop
        </h3>
        <ul className="space-y-3 text-amber-900">
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>Measure twice, order once:</strong> Double-check your hub
              and rim measurements before ordering spokes. Use calipers for
              accuracy.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>ERD is critical:</strong> Don't trust manufacturer specs.
              Measure your actual rim's ERD with a spoke and nipple for best
              accuracy.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>These calculations assume:</strong> Standard J-bend spokes
              with brass nipples. Straight-pull or aluminum nipples may require
              adjustment. Internally threaded nipples are not supported.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>Spoke length tolerance:</strong> Most manufacturers round
              to the nearest 1mm. Being 0.5mm off is fine.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>Order extras:</strong> Get 2-3 extra spokes of each length
              in case of build mistakes or future repairs.
            </span>
          </li>
          {specs.crossPattern === "radial" && (
            <li className="flex gap-3">
              <span className="text-amber-500 font-bold">⚠</span>
              <span>
                <strong>Radial lacing warning:</strong> Only use radial on
                non-drive side or front wheels. Drive-side radial can fail
                catastrophically under torque.
              </span>
            </li>
          )}
          {specs.offset > 0 && (
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                <strong>Offset rim detected:</strong> Modern disc brake wheels
                use offset rims. Make sure you order the correct lengths for
                each side.
              </span>
            </li>
          )}
          {specs.spokeCount < 28 && (
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold">•</span>
              <span>
                <strong>Low spoke count:</strong> Wheels with {specs.spokeCount}{" "}
                spokes require precise spoke tension and true builds. Consider
                professional help if this is your first build.
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 print:hidden">
        <button
          onClick={onReset}
          className="tool-button flex-1 py-3 rounded-lg font-semibold"
        >
          ↻ Calculate Again
        </button>
        <button
          onClick={handlePrint}
          className="calculate-button flex-1 py-3 rounded-lg font-semibold"
        >
          🖨 Print Results
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
