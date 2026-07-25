import { useMemo, useState } from 'react';

/** Cubic Bézier evaluation helper */
function getCubicBezierPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

// 4 segments forming the S-curve road
const ROAD_SEGMENTS = [
  { p0: { x: 200, y: 20 }, p1: { x: 200, y: 80 }, p2: { x: 120, y: 120 }, p3: { x: 120, y: 180 } },
  { p0: { x: 120, y: 180 }, p1: { x: 120, y: 240 }, p2: { x: 280, y: 280 }, p3: { x: 280, y: 340 } },
  { p0: { x: 280, y: 340 }, p1: { x: 280, y: 400 }, p2: { x: 120, y: 440 }, p3: { x: 120, y: 500 } },
  { p0: { x: 120, y: 500 }, p1: { x: 120, y: 560 }, p2: { x: 200, y: 580 }, p3: { x: 200, y: 620 } },
];

function getPointOnRoad(globalProgress) {
  // globalProgress is between 0 and 1
  const scaled = globalProgress * 4;
  const segIdx = Math.min(Math.floor(scaled), 3);
  const localT = scaled - segIdx;
  const seg = ROAD_SEGMENTS[segIdx];
  return getCubicBezierPoint(seg.p0, seg.p1, seg.p2, seg.p3, localT);
}

/** Interactive road map — click a circle to reveal that stop's context on the map. */
export default function RoadMapVisual({ stops = [], careerName }) {
  const [active, setActive] = useState(0);

  const markers = useMemo(() => {
    const count = stops.length;
    if (!count) return [];
    return stops.map((stop, i) => {
      // Evenly distribute markers along the curve (from global progress 0.12 to 0.88)
      const progress = 0.12 + (i / Math.max(count - 1, 1)) * 0.76;
      const pt = getPointOnRoad(progress);
      const side = pt.x > 200 ? 'left' : 'right'; // position popup on opposite side of point
      return { ...stop, i, x: pt.x, y: pt.y, side };
    });
  }, [stops]);

  const current = stops[active] || stops[0];
  const activeMarker = markers[active] || markers[0];

  return (
    <div className="road-map-interactive surface-3d" aria-label={`Road map for ${careerName}`}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <span className="badge badge-amber">Interactive Path Journey</span>
        <h3 style={{ fontSize: '1.3rem', marginTop: 6 }}>Roadmap for {careerName}</h3>
        <p className="road-hint">Click any numbered circle directly on the road to inspect that phase</p>
      </div>

      <div className="road-stage">
        <svg viewBox="0 0 400 640" className="road-svg" aria-hidden="true">
          <defs>
            <pattern id="terrain" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="5" r="1.2" fill="rgba(47, 93, 58, 0.14)" />
              <circle cx="16" cy="14" r="1" fill="rgba(28, 28, 26, 0.07)" />
            </pattern>
            <linearGradient id="asphalt" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2c302e" />
              <stop offset="50%" stopColor="#1e2220" />
              <stop offset="100%" stopColor="#2c302e" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
            </filter>
            <filter id="glowActive" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#a35a2a" floodOpacity="0.8" />
            </filter>
          </defs>

          <rect width="400" height="640" fill="url(#terrain)" />
          <ellipse cx="70" cy="200" rx="55" ry="28" fill="rgba(47, 93, 58, 0.16)" />
          <ellipse cx="330" cy="380" rx="60" ry="30" fill="rgba(47, 93, 58, 0.12)" />
          <ellipse cx="90" cy="520" rx="50" ry="22" fill="rgba(92, 107, 58, 0.14)" />

          {/* Main asphalt road path */}
          <path
            d="M 200 20 C 200 80, 120 120, 120 180 C 120 240, 280 280, 280 340 C 280 400, 120 440, 120 500 C 120 560, 200 580, 200 620"
            fill="none"
            stroke="url(#asphalt)"
            strokeWidth="42"
            strokeLinecap="round"
            filter="url(#softShadow)"
          />

          {/* Dashed center line of the road */}
          <path
            d="M 200 20 C 200 80, 120 120, 120 180 C 120 240, 280 280, 280 340 C 280 400, 120 440, 120 500 C 120 560, 200 580, 200 620"
            fill="none"
            stroke="#f0ede6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10 14"
            className="road-dash"
          />

          {/* Start and Arrive banners */}
          <circle cx="200" cy="22" r="11" fill="#2f5d3a" filter="url(#softShadow)" />
          <text x="200" y="10" textAnchor="middle" className="road-label-svg" fill="#2f5d3a" fontWeight="bold">
            START
          </text>
          <circle cx="200" cy="618" r="11" fill="#a35a2a" filter="url(#softShadow)" />
          <text x="200" y="636" textAnchor="middle" className="road-label-svg" fill="#a35a2a" fontWeight="bold">
            GOAL
          </text>

          {/* Render interactive circles EXACTLY on top of the road curve */}
          {markers.map((m) => {
            const isActive = active === m.i;
            return (
              <g
                key={m.i}
                onClick={() => setActive(m.i)}
                style={{ cursor: 'pointer' }}
                tabIndex={0}
                role="button"
                aria-label={`Stop ${m.i + 1}: ${m.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActive(m.i);
                }}
              >
                {/* Outer halo shadow circle */}
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={isActive ? 22 : 18}
                  fill={isActive ? '#a35a2a' : '#2f5d3a'}
                  stroke="#faf8f3"
                  strokeWidth="3.5"
                  filter={isActive ? 'url(#glowActive)' : 'url(#softShadow)'}
                  style={{ transition: 'all 0.25s ease' }}
                />
                {/* Circle step number */}
                <text
                  x={m.x}
                  y={m.y + 5}
                  textAnchor="middle"
                  fill="#faf8f3"
                  fontSize={isActive ? "15" : "13"}
                  fontWeight="bold"
                  fontFamily="var(--font-mono)"
                  pointerEvents="none"
                >
                  {m.i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating popup card corresponding to current active stop */}
        {current && activeMarker && (
          <div
            className={`road-popup ${activeMarker.side === 'right' ? 'popup-right' : 'popup-left'}`}
            style={{
              top: `${Math.min(Math.max((activeMarker.y / 640) * 100 - 6, 6), 68)}%`,
            }}
            key={active}
          >
            <p className="road-popup-index">Step {String(active + 1).padStart(2, '0')}</p>
            <h3>{current.title}</h3>
            <p>{current.detail}</p>
          </div>
        )}
      </div>

      {/* Footer tab buttons for step switching */}
      <div className="road-dots" role="tablist" aria-label="Road stops">
        {stops.map((s, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`road-dot${active === i ? ' active' : ''}`}
            onClick={() => setActive(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
