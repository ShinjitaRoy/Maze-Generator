import React from 'react';
import './MazeGrid.css';

export default function MazeGrid({ maze, solution, start, end, cellSize, currentCell, onCellClick, theme, colorScheme }) {
  const schemes = {
    skyblue: { wall: '#00bcd4', bg: '#e0f7fa' },
    green:   { wall: '#43a047', bg: '#e8f5e9' },
    purple:  { wall: '#8e24aa', bg: '#f3e5f5' },
    orange:  { wall: '#fb8c00', bg: '#fff3e0' }
  };
  const { wall, bg } = schemes[colorScheme] || schemes.skyblue;
  const wallWidth = 6;
  const wallColor = wall;
  const gridBg = bg;

  return (
    <div
      className="maze-grid"
      style={{
        gridTemplateRows: `repeat(${maze.length}, ${cellSize}px)`,
        gridTemplateColumns: `repeat(${maze[0].length}, ${cellSize}px)`,
        background: gridBg
      }}
      role="grid"
      aria-label="Maze grid"
      tabIndex={0}
    >
      {maze.map((row, y) =>
        row.map((cell, x) => {
          let className = 'cell';
          if (solution && solution.some(([sy, sx]) => sy === y && sx === x)) className += ' solution';
          if (start[0] === y && start[1] === x) className += ' start';
          if (end[0] === y && end[1] === x) className += ' end';
          if (currentCell && currentCell[0] === y && currentCell[1] === x) className += ' carving';
          const isInteractive = !!onCellClick;
          return (
            <div
              key={`${y}-${x}`}
              className={className}
              style={{
                borderTop: cell.top ? `${wallWidth}px solid ${wallColor}` : `${wallWidth}px solid transparent`,
                borderRight: cell.right ? `${wallWidth}px solid ${wallColor}` : `${wallWidth}px solid transparent`,
                borderBottom: cell.bottom ? `${wallWidth}px solid ${wallColor}` : `${wallWidth}px solid transparent`,
                borderLeft: cell.left ? `${wallWidth}px solid ${wallColor}` : `${wallWidth}px solid transparent`,
                width: cellSize,
                height: cellSize,
                cursor: isInteractive ? 'pointer' : 'default'
              }}
              role="gridcell"
              aria-label={
                `Cell ${y + 1},${x + 1}` +
                (start[0] === y && start[1] === x ? ' (start)' : '') +
                (end[0] === y && end[1] === x ? ' (end)' : '') +
                (solution && solution.some(([sy, sx]) => sy === y && sx === x) ? ' (solution path)' : '')
              }
              tabIndex={isInteractive ? 0 : -1}
              onClick={isInteractive ? () => onCellClick(y, x) : undefined}
              onKeyDown={
                isInteractive
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onCellClick(y, x);
                      }
                    }
                  : undefined
              }
            />
          );
        })
      )}
    </div>
  );
}