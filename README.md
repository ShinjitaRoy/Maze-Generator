# MazeQuest

MazeQuest is a visually rich, accessible, and responsive React application for generating and solving mazes with animation, color themes, and interactive controls.

# Explanation Video
https://www.loom.com/share/8c027ff75db74bb9829ba331afe65642?sid=0ef016a3-e46a-46b5-8c5d-f8ca5fb0b805

---

## Features

- **Maze Generation Algorithms:**  
  - Recursive Backtracking  
  - Prim’s Algorithm

- **Animated Maze Generation:**  
  Watch the maze being built step-by-step.

- **Maze Solving:**  
  Visualize the shortest path from start to end using BFS.

- **Customizable Controls:**  
  - Adjust maze width, height, and cell size  
  - Choose start and end points (click or randomize)  
  - Select color scheme (Sky Blue, Green, Purple, Orange)  
  - Light/Dark theme toggle

- **Performance Stats:**  
  - See the number of steps and time taken to solve the maze

- **Accessibility:**  
  - Keyboard navigation for all controls and maze cells  
  - ARIA labels for screen readers

- **Responsive Design:**  
  - Works seamlessly on desktop and mobile devices

- **Attractive UI:**  
  - Gradient backgrounds, 3D maze walls, and a custom logo

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShinjitaRoy/Maze-Generator.git
   cd Maze-Generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open in your browser:**  
   Visit [http://localhost:3000](http://localhost:3000)

---

## Usage

- **Generate Maze:**  
  Select algorithm, set dimensions, and click "Generate".

- **Animate Generation:**  
  Click "Animate Generation" to watch the maze being built.

- **Solve Maze:**  
  Click "Solve" to visualize the shortest path.

- **Set Start/End:**  
  Click "Set Start Point" or "Set End Point", then click a cell.

- **Randomize Start/End:**  
  Click "Randomize Start/End" for random positions.

- **Adjust Cell Size:**  
  Use the slider to change cell size.

- **Change Color Scheme:**  
  Use the dropdown to pick a color theme.

- **Switch Theme:**  
  Use the top-right button to toggle light/dark mode.

- **Reset:**  
  Click "Reset" to clear the maze and stats.

---

## Accessibility

- All controls and maze cells are keyboard accessible.
- ARIA labels are provided for screen readers.
- The app is usable with only a keyboard.

---

## Project Structure

```
maze-quest/
├── public/
│   ├── logo777.png         # App logo
│   └── index.html
├── src/
│   ├── algorithms/
│   │   ├── prims.js
│   │   └── recursiveBacktracking.js
│   ├── components/
│   │   ├── MazeGrid.jsx
│   │   ├── MazeGrid.css
│   │   ├── Controls.jsx
│   │   └── AlgorithmSelector.jsx
│   ├── fonts.css
│   ├── App.js
│   ├── App.css
│   └── index.js
└── README.md
```

---

## Customization

- **Logo:**  
  Replace `public/logo777.png` with your own logo if desired.

- **Fonts:**  
  Uses "Tw Cen MT Condensed" for the title and "Poppins" for controls/buttons.

- **Color Schemes:**  
  Easily add more color schemes in `MazeGrid.jsx`.

---

## License

This project is for educational and personal use.  
If you use or modify it, please credit the original author.

---

## Author

- [Shinjita Roy](https://github.com/ShinjitaRoy)

---

Enjoy exploring and solving mazes with **MazeQuest**!
