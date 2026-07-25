export default function Compass({ size = 90 }) {
  return (
    <div style={{ width: size, height: size, margin: '0 auto 24px' }}>
      <style>{`
        .needle { transform-origin: 50% 50%; animation: spin 6s linear infinite; }
        @keyframes spin { 0%{transform:rotate(0deg);} 50%{transform:rotate(200deg);} 100%{transform:rotate(360deg);} }
      `}</style>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#E0A458" strokeWidth="2" />
        <g className="needle">
          <polygon points="50,10 56,50 50,90 44,50" fill="#E0A458" />
        </g>
      </svg>
    </div>
  );
}