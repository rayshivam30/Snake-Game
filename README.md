# 🐍 Professional Snake Game - Web Version

A modern, professional Snake game built with HTML5 Canvas, CSS3, and JavaScript featuring beautiful graphics, smooth animations, and multiple difficulty levels.

## Features

- **Professional Graphics**: Beautiful gradients, animations, and visual effects
- **Multiple Difficulty Levels**: Easy, Medium, Hard, and Extreme modes
- **Score System**: Track your current score, high score, and level progression
- **Responsive Design**: Works on desktop and mobile devices
- **Sound Effects**: Optional sound feedback (can be toggled)
- **Smooth Controls**: Arrow keys or WASD for movement
- **Pause/Resume**: Space bar to pause/resume the game
- **Level Progression**: Game speed increases as you advance levels

## How to Play

1. **Starting the Game**: Open `snake_game.html` in a web browser or run a local server
2. **Controls**:
   - **Arrow Keys** or **WASD**: Move the snake
   - **Space**: Pause/Resume
   - **R**: Restart (when game is over)
3. **Objective**: Eat the red food to grow your snake and increase your score
4. **Avoid**: Running into walls or your own body

## Running the Game

### Method 1: Direct Browser Opening
Simply double-click on `snake_game.html` to open it in your default browser.

### Method 2: Local Server (Recommended)
For best performance and to avoid CORS issues:

1. Open a terminal in this folder
2. Run: `python -m http.server 8000`
3. Open your browser and go to: `http://localhost:8000/snake_game.html`

## Game Settings

- **Difficulty**: Choose from Easy, Medium, Hard, or Extreme
- **Sound**: Toggle sound effects on/off
- **High Score**: Automatically saved in browser storage

## Technical Details

- **HTML5 Canvas**: For smooth graphics rendering
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: No external dependencies
- **Responsive Design**: Adapts to different screen sizes

## File Structure

```
Snake_Game_Web/
├── snake_game.html    # Main HTML file
├── styles.css         # CSS styling
├── game.js           # Game logic and functionality
└── README.md         # This file
```

## Browser Compatibility

Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Scoring System

- **+10 points** per food eaten
- **Level up** every 50 points
- **Speed increases** with each level
- **High score** persists between sessions

Enjoy playing! 🎮
