export default function Compass({ size = 80 }) {
  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      <style>{`
        .needle-group {
          transform-origin: 50px 50px;
          animation: compassSweep 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .outer-ring {
          transform-origin: 50px 50px;
          animation: spinSlow 36s linear infinite;
        }
        @keyframes compassSweep {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(110deg); }
          55% { transform: rotate(70deg); }
          80% { transform: rotate(220deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <linearGradient id="forestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2f5d3a" />
            <stop offset="100%" stopColor="#1c1c1a" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(28, 28, 26, 0.18)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#forestGrad)" strokeWidth="1.75" strokeDasharray="2 4" className="outer-ring" />

        <text x="50" y="16" fill="#2f5d3a" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>
        <text x="86" y="52" fill="#7a756c" fontSize="6" textAnchor="middle">E</text>
        <text x="50" y="88" fill="#7a756c" fontSize="6" textAnchor="middle">S</text>
        <text x="14" y="52" fill="#7a756c" fontSize="6" textAnchor="middle">W</text>

        <g className="needle-group">
          <polygon points="50,18 54,50 50,47 46,50" fill="url(#forestGrad)" />
          <polygon points="50,82 54,50 50,53 46,50" fill="#a35a2a" opacity="0.85" />
          <circle cx="50" cy="50" r="3.5" fill="#faf8f3" stroke="#1c1c1a" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
