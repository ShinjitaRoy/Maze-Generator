export function generateMazePrimsSteps(width, height) {
  const maze = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      top: true, right: true, bottom: true, left: true, visited: false
    }))
  );
  const steps = [];
  const walls = [];
  const startY = Math.floor(Math.random() * height);
  const startX = Math.floor(Math.random() * width);
  maze[startY][startX].visited = true;
  [
    [startY, startX, 'top'],
    [startY, startX, 'right'],
    [startY, startX, 'bottom'],
    [startY, startX, 'left']
  ].forEach(w => walls.push(w));

  // Push the initial state
  steps.push({ maze: JSON.parse(JSON.stringify(maze)), currentCell: [startY, startX] });

  function getNeighbor(y, x, dir) {
    if (dir === 'top' && y > 0) return [y - 1, x, 'bottom'];
    if (dir === 'right' && x < width - 1) return [y, x + 1, 'left'];
    if (dir === 'bottom' && y < height - 1) return [y + 1, x, 'top'];
    if (dir === 'left' && x > 0) return [y, x - 1, 'right'];
    return null;
  }
  while (walls.length) {
    const idx = Math.floor(Math.random() * walls.length);
    const [y, x, dir] = walls.splice(idx, 1)[0];
    const neighbor = getNeighbor(y, x, dir);
    if (!neighbor) continue;
    const [ny, nx, opp] = neighbor;
    if (!maze[ny][nx].visited) {
      maze[y][x][dir] = false;
      maze[ny][nx][opp] = false;
      maze[ny][nx].visited = true;
      ['top', 'right', 'bottom', 'left'].forEach(d => {
        const n = getNeighbor(ny, nx, d);
        if (n && !maze[n[0]][n[1]].visited) walls.push([ny, nx, d]);
      });
      // Push a deep copy of the maze and the current cell
      steps.push({ maze: JSON.parse(JSON.stringify(maze)), currentCell: [ny, nx] });
    }
  }
  maze.forEach(row => row.forEach(cell => delete cell.visited));
  steps.push({ maze: JSON.parse(JSON.stringify(maze)), currentCell: null });
  return steps;
}

export function generateMazePrims(width, height) {
  const maze = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      top: true, right: true, bottom: true, left: true, visited: false
    }))
  );
  const walls = [];
  const startY = Math.floor(Math.random() * height);
  const startX = Math.floor(Math.random() * width);
  maze[startY][startX].visited = true;
  [
    [startY, startX, 'top'],
    [startY, startX, 'right'],
    [startY, startX, 'bottom'],
    [startY, startX, 'left']
  ].forEach(w => walls.push(w));
  function getNeighbor(y, x, dir) {
    if (dir === 'top' && y > 0) return [y - 1, x, 'bottom'];
    if (dir === 'right' && x < width - 1) return [y, x + 1, 'left'];
    if (dir === 'bottom' && y < height - 1) return [y + 1, x, 'top'];
    if (dir === 'left' && x > 0) return [y, x - 1, 'right'];
    return null;
  }
  while (walls.length) {
    const idx = Math.floor(Math.random() * walls.length);
    const [y, x, dir] = walls.splice(idx, 1)[0];
    const neighbor = getNeighbor(y, x, dir);
    if (!neighbor) continue;
    const [ny, nx, opp] = neighbor;
    if (!maze[ny][nx].visited) {
      maze[y][x][dir] = false;
      maze[ny][nx][opp] = false;
      maze[ny][nx].visited = true;
      ['top', 'right', 'bottom', 'left'].forEach(d => {
        const n = getNeighbor(ny, nx, d);
        if (n && !maze[n[0]][n[1]].visited) walls.push([ny, nx, d]);
      });
    }
  }
  maze.forEach(row => row.forEach(cell => delete cell.visited));
  return maze;
}
