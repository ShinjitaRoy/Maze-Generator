import React from 'react';

export default function AlgorithmSelector({ algorithm, setAlgorithm }) {
  return (
    <div>
      <label className="maze-label" aria-label="Maze generation algorithm">
        Algorithm:&nbsp;
        <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
          <option value="recursive-backtracking">Recursive Backtracking</option>
          <option value="prims">Prim's Algorithm</option>
        </select>
      </label>
    </div>
  );
}