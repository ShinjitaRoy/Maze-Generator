import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import MazeGrid from './components/MazeGrid';
import Controls from './components/Controls';
import AlgorithmSelector from './components/AlgorithmSelector';
import { generateMazeRB, generateMazeRBSteps } from './algorithms/recursiveBacktracking';
import { generateMazePrims, generateMazePrimsSteps } from './algorithms/prims';
import './fonts.css'; 


function App() {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [algorithm, setAlgorithm] = useState('recursive-backtracking');
  const [maze, setMaze] = useState(() => generateMazeRB(15, 15));
  const [solution, setSolution] = useState(null);
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([14, 14]);
  const [running, setRunning] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [currentCell, setCurrentCell] = useState(null);
  const [selecting, setSelecting] = useState(null); // 'start' or 'end' or null
  const [theme, setTheme] = useState('light');
  const [cellSize, setCellSize] = useState(24);
  const [colorScheme, setColorScheme] = useState('skyblue'); // 'skyblue', 'green', 'purple', etc.
  const [solveSteps, setSolveSteps] = useState(0);
  const [solveTime, setSolveTime] = useState(0);

  // Animation state
  const stepsRef = useRef([]);
  const [stepIndex, setStepIndex] = useState(0);
  const timeoutRef = useRef();

  function handleGenerate() {
    let m;
    if (algorithm === 'recursive-backtracking') m = generateMazeRB(width, height);
    else m = generateMazePrims(width, height);
    setMaze(m);
    setSolution(null);
    setStart([0, 0]);
    setEnd([height - 1, width - 1]);
    setAnimating(false);
    setRunning(false);
    setStepIndex(0);
    stepsRef.current = [];
    clearTimeout(timeoutRef.current);
  }

  function handleSolve() {
    // Guard: check if start/end are in bounds
    if (
      start[0] < 0 || start[0] >= height ||
      start[1] < 0 || start[1] >= width ||
      end[0] < 0 || end[0] >= height ||
      end[1] < 0 || end[1] >= width
    ) {
      setSolution([]);
      setSolveSteps(0);
      setSolveTime(0);
      return;
    }

    const t0 = performance.now();
    const queue = [[...start, []]];
    const visited = Array.from({ length: height }, () => Array(width).fill(false));
    visited[start[0]][start[1]] = true;

    while (queue.length) {
      const [y, x, path] = queue.shift();
      if (y === end[0] && x === end[1]) {
        const solutionPath = [...path, [y, x]];
        setSolution(solutionPath);
        setSolveSteps(solutionPath.length);
        setSolveTime(((performance.now() - t0) / 1000).toFixed(3));
        return;
      }
      [
        [y - 1, x, 'top'],
        [y + 1, x, 'bottom'],
        [y, x - 1, 'left'],
        [y, x + 1, 'right']
      ].forEach(([ny, nx, dir]) => {
        if (
          ny >= 0 && ny < height && nx >= 0 && nx < width &&
          maze[y][x] && !maze[y][x][dir] && !visited[ny][nx]
        ) {
          visited[ny][nx] = true;
          queue.push([ny, nx, [...path, [y, x]]]);
        }
      });
    }
    setSolution([]);
    setSolveSteps(0);
    setSolveTime(0);
  }

  function handleReset() {
    let m;
    if (algorithm === 'recursive-backtracking') m = generateMazeRB(width, height);
    else m = generateMazePrims(width, height);
    setMaze(m);
    setSolution(null);
    setAnimating(false);
    setRunning(false);
    setStepIndex(0);
    stepsRef.current = [];
    setCurrentCell(null);
    setStart([0, 0]);
    setEnd([height - 1, width - 1]);
    setSolveSteps(0);
    setSolveTime(0);
    clearTimeout(timeoutRef.current);
  }

  function handlePauseResume() {
    setRunning(r => !r);
  }

  // --- Step-by-step animation for Recursive Backtracking ---
  function handleAnimate() {
    if (algorithm === 'recursive-backtracking') {
      stepsRef.current = generateMazeRBSteps(width, height);
    } else if (algorithm === 'prims') {
      stepsRef.current = generateMazePrimsSteps(width, height);
    } else {
      return;
    }
    setAnimating(true);
    setRunning(true);
    setStepIndex(0);
    setSolution(null);
  }

  // Animation effect
  useEffect(() => {
    if (animating && running) {
      if (stepIndex < stepsRef.current.length) {
        const step = stepsRef.current[stepIndex];
        if (!step || !step.maze) {
          setAnimating(false);
          setRunning(false);
          setCurrentCell(null);
          return;
        }
        setMaze(JSON.parse(JSON.stringify(step.maze)));
        setCurrentCell(step.currentCell);
        timeoutRef.current = setTimeout(() => {
          setStepIndex(idx => idx + 1);
        }, 40);
      } else {
        setAnimating(false);
        setRunning(false);
        setCurrentCell(null);
      }
    }
    if (!running) {
      clearTimeout(timeoutRef.current);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [animating, running, stepIndex]);

  return (
    <div className={`App ${theme}`}>
      <h1 className="maze-title">MazeQuest</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />
        <Controls
          width={width} setWidth={setWidth}
          height={height} setHeight={setHeight}
          cellSize={cellSize} setCellSize={setCellSize}
          onGenerate={handleGenerate}
          onSolve={handleSolve}
          onReset={handleReset}
          running={running}
          onPauseResume={handlePauseResume}
        />
        <button
          onClick={handleAnimate}
          disabled={animating || (algorithm !== 'recursive-backtracking' && algorithm !== 'prims')}
          style={{ marginBottom: '1rem' }}
        >
          Animate Generation
        </button>
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setSelecting('start')} disabled={animating || running}>
            Set Start Point
          </button>
          <button onClick={() => setSelecting('end')} disabled={animating || running}>
            Set End Point
          </button>
          <button
            onClick={() => {
              // Randomize start and end
              const randStart = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
              let randEnd;
              do {
                randEnd = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
              } while (randEnd[0] === randStart[0] && randEnd[1] === randStart[1]);
              setStart(randStart);
              setEnd(randEnd);
            }}
            disabled={animating || running}
          >
            Randomize Start/End
          </button>
          {selecting && (
            <span style={{ marginLeft: 10, color: '#b71c1c' }}>
              Click a cell to set {selecting} point
            </span>
          )}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label className="maze-label">
            Color Scheme:&nbsp;
            <select value={colorScheme} onChange={e => setColorScheme(e.target.value)}>
              <option value="skyblue">Sky Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
            </select>
          </label>
        </div>
        {solveSteps > 0 && (
  <div style={{ margin: '1rem 0', color: '#b71c1c', fontWeight: 600 }}>
    Steps: {solveSteps} &nbsp;|&nbsp; Time: {solveTime} s
  </div>
)}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <MazeGrid
            maze={maze}
            solution={solution}
            start={start}
            end={end}
            cellSize={cellSize}
            currentCell={currentCell}
            onCellClick={
              selecting
                ? (y, x) => {
                    if (selecting === 'start') setStart([y, x]);
                    else if (selecting === 'end') setEnd([y, x]);
                    setSelecting(null);
                  }
                : undefined
            }
            theme={theme}
            colorScheme={colorScheme}
          />
        </div>
      </div>
      <footer style={{ margin: '2rem 0', color: '#888', textAlign: 'center' }}>
        <small>React Maze Generator &copy; 2025</small>
      </footer>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </div>
  );
}

export default App;
