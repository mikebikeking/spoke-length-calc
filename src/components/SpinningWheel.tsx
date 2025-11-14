interface SpinningWheelProps {
  size?: number;
  spokeCount?: number;
}

const SpinningWheel = ({ size = 120, spokeCount = 28 }: SpinningWheelProps) => {
  const spokeAngle = 360 / spokeCount;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          animation: 'spin 2s linear infinite',
        }}
      >
        {/* Outer rim */}
        <div
          className="absolute inset-0 rounded-full border-4 border-blue-400 shadow-lg shadow-blue-500/50"
          style={{
            boxShadow: '0 0 20px rgba(96, 165, 250, 0.5), inset 0 0 10px rgba(96, 165, 250, 0.3)',
          }}
        />
        
        {/* Hub */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-inner"
          style={{
            width: `${size * 0.3}px`,
            height: `${size * 0.3}px`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        />
        
        {/* Spokes */}
        <div className="absolute inset-0">
          {[...Array(spokeCount)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-left bg-gradient-to-r from-slate-300 via-slate-200 to-transparent"
              style={{
                width: `${size * 0.5}px`,
                height: '2px',
                transform: `rotate(${i * spokeAngle}deg)`,
                transformOrigin: 'left center',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpinningWheel;

