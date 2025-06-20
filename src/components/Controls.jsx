import React from 'react';

export default function Controls({
  width, setWidth, height, setHeight,
  cellSize, setCellSize,
  onGenerate, onSolve, onReset, running, onPauseResume
}) {
  return (
    <div style={{ margin: '1rem 0' }}>
      <label className="maze-label" aria-label="Maze width">
        Width:
        <input type="number" min="5" max="40" value={width} onChange={e => setWidth(Number(e.target.value))} />
      </label>
      &nbsp;
      <label className="maze-label" aria-label="Maze height">
        Height:
        <input type="number" min="5" max="40" value={height} onChange={e => setHeight(Number(e.target.value))} />
      </label>
      &nbsp;
      <label className="maze-label" aria-label="Maze cell size">
        Cell Size:
        <input
          type="range"
          min="12"
          max="48"
          value={cellSize}
          onChange={e => setCellSize(Number(e.target.value))}
          style={{ verticalAlign: 'middle', marginLeft: 8, marginRight: 4 }}
        />
        <span style={{ color: '#b71c1c', fontWeight: 700 }}>{cellSize}px</span>
      </label>
      &nbsp;
      <button onClick={onGenerate}>Generate</button>
      <button onClick={onSolve}>Solve</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onPauseResume}>{running ? 'Pause' : 'Resume'}</button>
    </div>
  );
}