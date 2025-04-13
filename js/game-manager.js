// game-manager.js - Zarządzanie stanem gry

import { QuizEngine } from './quiz-engine.js';
import { FirewallMaze, PhishingDetector } from './minigames.js';
import { gameData } from './game-data.js';

export class GameManager {
  constructor() {
    this.currentLevel = null;
    this.health = 100;
    this.score = 0;
    this.gameState = 'start'; // start, quiz, minigame, gameover
    this.currentMinigame = null;
    this.quizEngine = null;
  }

  startGame(level) {
    this.currentLevel = level;
    this.health = gameData.levels[level].health;
    this.score = 0;
    this.gameState = 'quiz';
    this.quizEngine = new QuizEngine(level);
    return this.getQuizQuestion();
  }

  getQuizQuestion() {
    return {
      question: this.quizEngine.getCurrentQuestion().text,
      options: this.quizEngine.getCurrentQuestion().options.map(opt => opt.text),
      progress: this.quizEngine.getProgress()
    };
  }

  submitQuizAnswer(answerIndex) {
    const result = this.quizEngine.checkAnswer(answerIndex);
    
    if (result.isCorrect) {
      this.score += 10;
    } else {
      this.health -= 10;
    }
    
    const hasMoreQuestions = this.quizEngine.nextQuestion();
    
    if (!hasMoreQuestions || this.health <= 0) {
      this.gameState = 'gameover';
      return { gameOver: true, score: this.score };
    }
    
    return {
      gameOver: false,
      correct: result.isCorrect,
      feedback: result.feedback,
      nextQuestion: this.getQuizQuestion()
    };
  }

  startMinigame(type) {
    switch(type) {
      case 'firewall':
        this.currentMinigame = new FirewallMaze('maze-canvas', this.currentLevel);
        break;
      case 'phishing':
        this.currentMinigame = new PhishingDetector(this.currentLevel);
        break;
    }
    
    return this.currentMinigame;
  }

  endGame() {
    this.gameState = 'gameover';
    return {
      score: this.score,
      level: gameData.levels[this.currentLevel].name
    };
  }
}

// game-manager.js - Rozszerzona wersja

import { AchievementSystem } from './achievement-system.js';
// ... (pozostałe importy)

export class GameManager {
  constructor() {
    // ... (istniejące właściwości)
    this.achievementSystem = new AchievementSystem();
    this.gameStats = {
      startTime: 0,
      errors: 0,
      minigamesCompleted: 0
    };
    this.sounds = {};
    this.loadSounds();
  }

  loadSounds() {
    for (const [key, path] of Object.entries(gameData.sounds)) {
      this.sounds[key] = new Audio(path);
      this.sounds[key].volume = 0.3;
    }
  }

  playSound(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play();
    }
  }

  startGame(level) {
    this.gameStats = {
      startTime: Date.now(),
      errors: 0,
      minigamesCompleted: 0,
      level: level
    };
    // ... (reszta istniejącej logiki)
  }

  submitQuizAnswer(answerIndex) {
    const result = this.quizEngine.checkAnswer(answerIndex);
    
    if (result.isCorrect) {
      this.playSound('correct');
      this.score += 10;
    } else {
      this.playSound('wrong');
      this.health -= 10;
      this.gameStats.errors++;
    }
    
    // ... (reszta istniejącej logiki)
  }

  endGame() {
    this.gameStats.time = Math.floor((Date.now() - this.gameStats.startTime) / 1000);
    const newAchievements = this.achievementSystem.checkAchievements(this.gameStats);
    
    return {
      score: this.score,
      level: gameData.levels[this.currentLevel].name,
      achievements: newAchievements
    };
  }
}

