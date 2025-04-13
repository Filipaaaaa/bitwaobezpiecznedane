//  Minigry

import { gameData } from './game-data.js';

export class FirewallMaze {
  constructor(canvasId, level) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.config = gameData.mazeConfig[level];
    this.cellSize = 30;
    this.player = { x: 1, y: 1 };
    this.exit = { 
      x: this.config.size - 2, 
      y: this.config.size - 2 
    };
    this.enemies = [];
    this.gameOver = false;
    this.won = false;
    
    this.initMaze();
    this.initPlayer();
    this.initEnemies();
    this.draw();
    
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  initMaze() {
    this.maze = Array(this.config.size).fill().map(() => 
      Array(this.config.size).fill(0)
    );
    
    // Prosta logika generowania labiryntu...
  }

  initEnemies() {
    for (let i = 0; i < this.config.enemies; i++) {
      this.enemies.push({
        x: Math.floor(Math.random() * (this.config.size - 4)) + 2,
        y: Math.floor(Math.random() * (this.config.size - 4)) + 2,
        type: Math.random() > 0.5 ? 'virus' : 'trojan'
      });
    }
  }

  draw() {
    // Rysowanie labiryntu...
  }

  handleKeyPress(e) {
    if (this.gameOver) return;
    
    let newX = this.player.x;
    let newY = this.player.y;
    
    switch(e.key) {
      case 'ArrowUp': newY--; break;
      case 'ArrowDown': newY++; break;
      case 'ArrowLeft': newX--; break;
      case 'ArrowRight': newX++; break;
    }
    
    this.movePlayer(newX, newY);
  }

  movePlayer(x, y) {
    // Logika ruchu gracza...
  }

  checkCollisions(x, y) {
    // Sprawdzanie kolizji z wrogami i wyjściem...
  }
}

export class PhishingDetector {
  constructor(level) {
    this.level = level;
    this.currentEmail = null;
    this.loadEmail();
  }

  loadEmail() {
    const emails = gameData.phishingEmails;
    this.currentEmail = emails[Math.floor(Math.random() * emails.length)];
    return this.currentEmail;
  }

  checkAnswer(isPhishing) {
    return {
      correct: isPhishing === this.currentEmail.isPhishing,
      feedback: this.currentEmail.feedback
    };
  }
}