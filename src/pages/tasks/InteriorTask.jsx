import { useState } from 'react';

// 3x3 grid. Cell 0 = door (must stay clear). Cell 2 = window (decorative).
const DOOR_CELL = 0;
const ITEMS = ['sofa', 'table', 'lamp'];

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
  const [placements, setPlacements] = useState({}); // cellIndex -> item
  const [selectedItem, setSelectedItem] = useState('sofa');
  const [checked, setChecked] = useState(false);

  function placedCellFor(item) {
    return Object.entries(placements).find(([, v]) => v === item)?.[0];
  }

  function handleCellClick(index) {
    if (index === DOOR_CELL) return; // can't block the door
    setPlacements((prev) => {
      const next = { ...prev };
      // remove this item from any previous cell
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
      <h3>Mini Task: Interior Designer</h3>
      <p style={{ marginTop: 8, marginBottom: 16 }}>
        Arrange the sofa, table, and lamp in this room. Keep the door (top-left) clear,
        and place the sofa near the table so conversation flows naturally.
      </p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {ITEMS.map((item) => (
          <button
            key={item}
            className="option"
            style={{ width: 'auto', margin: 0, borderColor: selectedItem === item ? 'var(--amber)' : undefined }}
            onClick={() => setSelectedItem(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            onClick={() => handleCellClick(i)}
            style={{
              ...styles.cell,
              background: i === DOOR_CELL ? '#f7ece9' : 'white',
            }}
          >
            {i === DOOR_CELL ? 'door' : placements[i] || ''}
          </div>
        ))}
      </div>

      <button className="btn" style={{ marginTop: 16 }} onClick={finish}>
        Check Layout
      </button>

      {result && (
        <p style={{ marginTop: 12 }}>
          {result.passed
            ? 'Nice — a clear entry and a layout that invites conversation.'
            : `Needs adjustment: ${!result.doorClear ? 'the door is blocked. ' : ''}${!result.sofaNearTable ? 'sofa and table aren\'t close enough. ' : ''}${!result.lampPlaced ? 'lamp hasn\'t been placed yet.' : ''}`}
        </p>
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gridTemplateRows: 'repeat(3, 80px)',
    gap: 6,
  },
  cell: {
    border: '1px solid #ccc', borderRadius: 6, display: 'flex',
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    fontSize: '0.85rem', textTransform: 'capitalize',
  },
};