export function generateMazeRB(width, height) {
  // Each cell: {top, right, bottom, left}
  const maze = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      top: true, right: true, bottom: true, left: true, visited: false
    }))
  );
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function carve(y, x) {
    maze[y][x].visited = true;
    shuffle([
      [0, -1, 'left', 'right'],
      [0, 1, 'right', 'left'],
      [-1, 0, 'top', 'bottom'],
      [1, 0, 'bottom', 'top']
    ]).forEach(([dy, dx, dir, opp]) => {
      const ny = y + dy, nx = x + dx;
      if (ny >= 0 && ny < height && nx >= 0 && nx < width && !maze[ny][nx].visited) {
        maze[y][x][dir] = false;
        maze[ny][nx][opp] = false;
        carve(ny, nx);
      }
    });
  }
  carve(0, 0);
  maze.forEach(row => row.forEach(cell => delete cell.visited));
  return maze;
}

export function generateMazeRBSteps(width, height) {
  const maze = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      top: true, right: true, bottom: true, left: true, visited: false
    }))
  );
  const steps = [];
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function carve(y, x) {
    maze[y][x].visited = true;
    steps.push({ maze: JSON.parse(JSON.stringify(maze)), currentCell: [y, x] });
    shuffle([
      [0, -1, 'left', 'right'],
      [0, 1, 'right', 'left'],
      [-1, 0, 'top', 'bottom'],
      [1, 0, 'bottom', 'top']
    ]).forEach(([dy, dx, dir, opp]) => {
      const ny = y + dy, nx = x + dx;
      if (ny >= 0 && ny < height && nx >= 0 && nx < width && !maze[ny][nx].visited) {
        maze[y][x][dir] = false;
        maze[ny][nx][opp] = false;
        carve(ny, nx);
      }
    });
  }
  carve(0, 0);
  maze.forEach(row => row.forEach(cell => delete cell.visited));
  steps.push({ maze: JSON.parse(JSON.stringify(maze)), currentCell: null });
  return steps;
}