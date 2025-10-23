import type { WheelSpecs, CrossPattern } from '../types/spoke';

interface CalculatorFormProps {
  specs: WheelSpecs;
  setSpecs: (specs: WheelSpecs) => void;
  onCalculate: () => void;
}

const CROSS_PATTERNS: CrossPattern[] = ['radial', '1x', '2x', '3x', '4x'];
const COMMON_SPOKE_COUNTS = [16, 20, 24, 28, 32, 36, 40, 48];

const CalculatorForm = ({ specs, setSpecs, onCalculate }: CalculatorFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Rim Section */}
      <div className="border-b-2 border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Rim Specifications</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              ERD - Effective Rim Diameter (mm)
            </label>
            <input
              type="number"
              value={specs.erd}
              onChange={(e) => setSpecs({ ...specs, erd: Number(e.target.value) })}
              className="measurement-input w-full px-4 py-3 rounded-lg focus:outline-none text-lg"
              step="0.1"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Measure from spoke hole center to opposite spoke hole center
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Offset (mm)
            </label>
            <input
              type="number"
              value={specs.offset}
              onChange={(e) => setSpecs({ ...specs, offset: Number(e.target.value) })}
              className="measurement-input w-full px-4 py-3 rounded-lg focus:outline-none text-lg"
              step="0.1"
            />
            <p className="text-xs text-slate-500 mt-1">
              Distance the spoke holes are offset from rim centerline (typically 0-3mm). Use 0 for symmetric rims.
            </p>
          </div>
        </div>
      </div>

      {/* Hub Section */}
      <div className="border-b-2 border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Hub Specifications</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 border-l-4 border-blue-500 pl-3">
              Left Side (Non-Drive)
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Flange Diameter (mm)
              </label>
              <input
                type="number"
                value={specs.leftFlangeD}
                onChange={(e) => setSpecs({ ...specs, leftFlangeD: Number(e.target.value) })}
                className="measurement-input w-full px-4 py-3 rounded-lg focus:outline-none"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Center to Flange (mm)
              </label>
              <input
                type="number"
                value={specs.leftCenterToFlange}
                onChange={(e) => setSpecs({ ...specs, leftCenterToFlange: Number(e.target.value) })}
                className="measurement-input w-full px-4 py-3 rounded-lg focus:outline-none"
                step="0.1"
                required
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 border-l-4 border-amber-500 pl-3">
              Right Side (Drive Side)
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Flange Diameter (mm)
              </label>
              <input
                type="number"
                value={specs.rightFlangeD}
                onChange={(e) => setSpecs({ ...specs, rightFlangeD: Number(e.target.value) })}
                className="measurement-input w-full px-4 py-3 rounded-lg focus:outline-none"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Center to Flange (mm)
              </label>
              <input
                type="number"
                value={specs.rightCenterToFlange}
                onChange={(e) => setSpecs({ ...specs, rightCenterToFlange: Number(e.target.value) })}
                className="measurement-input w-full px-4 py-3 rounded-lg focus:outline-none"
                step="0.1"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Spoke Pattern Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Spoke Pattern</h2>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Spoke Count
          </label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {COMMON_SPOKE_COUNTS.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setSpecs({ ...specs, spokeCount: count })}
                className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                  specs.spokeCount === count
                    ? 'calculate-button text-white shadow-lg'
                    : 'metal-finish text-slate-700 hover:bg-slate-300 border-2 border-aluminum'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Cross Pattern
          </label>
          <div className="grid grid-cols-5 gap-3">
            {CROSS_PATTERNS.map((pattern) => (
              <button
                key={pattern}
                type="button"
                onClick={() => setSpecs({ ...specs, crossPattern: pattern })}
                className={`py-3 px-4 rounded-lg font-bold text-lg transition-all ${
                  specs.crossPattern === pattern
                    ? 'calculate-button text-white shadow-lg scale-105'
                    : 'metal-finish text-slate-700 hover:bg-slate-300 border-2 border-aluminum'
                }`}
              >
                {pattern === 'radial' ? 'Radial' : pattern.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {specs.crossPattern === 'radial' && 'Radial: Spokes go straight from hub to rim (front wheels only)'}
            {specs.crossPattern === '1x' && '1-cross: Lightweight, good for low spoke count wheels'}
            {specs.crossPattern === '2x' && '2-cross: Lighter weight, good for most applications'}
            {specs.crossPattern === '3x' && '3-cross: Traditional pattern, good strength and durability'}
            {specs.crossPattern === '4x' && '4-cross: Maximum strength for tandems and cargo bikes'}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="calculate-button w-full text-white py-4 rounded-lg font-bold text-lg transition-all"
      >
        🔧 Calculate Spoke Lengths
      </button>
    </form>
  );
};

export default CalculatorForm;