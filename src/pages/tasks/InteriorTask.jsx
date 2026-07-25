import { useState } from 'react';

const DOOR_CELL = 0;
const ITEMS = [
  { key: 'sofa', name: '🛋️ Sofa' },
  { key: 'table', name: '🪵 Table' },
  { key: 'lamp', name: '💡 Lamp' },
];

function neighbors(index) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const result = [];
  if (row > 0) result.push(index - 3);
  if (row < 2) result.push(index + 3);
  if (col > 0) result.push(index - 1);
  if (col < 2) result.push(index + 1);
  return result;
}

export default function InteriorTask({ onComplete }) {
  const [placements, setPlacements] = useState({}); // cellIndex -> itemKey
  const [selectedItem, setSelectedItem] = useState('sofa');
  const [checked, setChecked] = useState(false);

  function placedCellFor(itemKey) {
    return Object.entries(placements).find(([, v]) => v === itemKey)?.[0];
  }

  function handleCellClick(index) {
    if (index === DOOR_CELL) return; // door must remain open
    setPlacements((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        if (next[key] === selectedItem) delete next[key];
      }
      next[index] = selectedItem;
      return next;
    });
  }

  function score() {
    const doorClear = placements[DOOR_CELL] === undefined;
    const sofaCell = placedCellFor('sofa');
    const tableCell = placedCellFor('table');
    const lampPlaced = placedCellFor('lamp') !== undefined;
    const sofaNearTable =
      sofaCell !== undefined &&
      tableCell !== undefined &&
      neighbors(Number(sofaCell)).includes(Number(tableCell));
    const checks = [doorClear, sofaNearTable, lampPlaced];
    return { passed: checks.filter(Boolean).length >= 2, doorClear, sofaNearTable, lampPlaced };
  }

  function finish() {
    setChecked(true);
    onComplete(score().passed);
  }

  const result = checked ? score() : null;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: '1.15rem', color: 'var(--accent-amber)' }}>Task: Room Spatial Layout Design</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 4 }}>
          Select an item below, then click a grid cell to position it. Keep the main entry door (top-left) unblocked, and place the sofa adjacent to the coffee table.
        </p>
      </div>

      {/* Palette Selector */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {ITEMS.map((item) => (
          <button
            key={item.key}
            className="btn btn-secondary"
            style={{
              padding: '8px 16px',
              fontSize: '0.9rem',
              borderColor: selectedItem === item.key ? 'var(--accent-amber)' : 'rgba(255, 255, 255, 0.1)',
              background: selectedItem === item.key ? 'rgba(255, 158, 59, 0.15)' : 'transparent',
            }}
            onClick={() => setSelectedItem(item.key)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Floor Plan Grid */}
      <div style={styles.grid}>
        {Array.from({ length: 9 }).map((_, i) => {
          const itemKey = placements[i];
          const itemObj = ITEMS.find((it) => it.key === itemKey);
          return (
            <div
              key={i}
              onClick={() => handleCellClick(i)}
              style={{
                ...styles.cell,
                background: i === DOOR_CELL ? 'rgba(239, 68, 68, 0.15)' : 'rgba(18, 24, 39, 0.8)',
                borderColor: i === DOOR_CELL ? 'var(--danger)' : 'rgba(255, 255, 255, 0.12)',
              }}
            >
              {i === DOOR_CELL ? (
                <span style={{ fontSize: '0.75rem', color: '#FCA5A5', fontWeight: 600 }}>🚪 Entry Door</span>
              ) : (
                <span>{itemObj ? itemObj.name : 'Click to Place'}</span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        <button className="btn" onClick={finish}>
          Validate Floorplan →
        </button>

        {result && (
          <span className={`badge ${result.passed ? 'badge-emerald' : 'badge-amber'}`}>
            {result.passed ? '✓ Functional & Inviting Layout!' : '⚠️ Needs Adjustments'}
          </span>
        )}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
    maxWidth: 360,
  },
  cell: {
    height: 90,
    borderRadius: 10,
    border: '1.5px solid transparent',
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    textAlign: 'center',
    padding: 6,
    transition: 'all 0.2s ease',
  },
};