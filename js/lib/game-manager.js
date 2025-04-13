/**
 * game-manager.js - Centralny menadżer stanu gry
 * @module GameManager
 */

import { DIFFICULTY_LEVELS, MINIGAME_CONFIGS } from './game-data.js';
import { QuizEngine } from './quiz-engine.js';
import { AchievementSystem } from './achievement-system.js';

export class GameManager {
  constructor() {
    this.resetGame();
    this.achievementSystem = new AchievementSystem();
  }

  /**
   * Resetuje stan gry
   */
  resetGame() {
    this.state = {
      difficulty: null,
      health: 100,
      score: 0,
      currentScreen: 'start',
      currentMinigame: null,
      quizEngine: null,
      stats: {
        startTime: null,
        errors: 0,
        minigamesCompleted: 0,
        questionsAnswered: 0
      }
    };
  }

  /**
   * Rozpoczyna nową grę
   * @param {string} difficulty - Poziom trudności
   */
  startGame(difficulty) {
    this.resetGame();
    this.state.difficulty = difficulty;
    this.state.health = DIFFICULTY_LEVELS[difficulty].health;
    this.state.stats.startTime = Date.now();
    this.state.quizEngine = new QuizEngine(
      this._getQuestionIdsForDifficulty(difficulty)
    );
    this.state.currentScreen = 'quiz';
  }

  /**
   * Pobiera ID pytań dla danego poziomu
   * @private
   */
  _getQuestionIdsForDifficulty(difficulty) {
    // Implementacja filtrowania pytań
    return QUIZ_QUESTIONS
      .filter(q => q.difficulty.includes(difficulty))
      .map(q => q.id);
  }

  /**
   * Przetwarza odpowiedź quizu
   * @param {string} answerId - ID odpowiedzi
   */
  processQuizAnswer(answerId) {
    const result = this.state.quizEngine.submitAnswer(answerId);
    
    if (!result.isCorrect) {
      this.state.health -= 10;
      this.state.stats.errors++;
    }
    
    this.state.stats.questionsAnswered++;
    
    if (result.isComplete || this.state.health <= 0) {
      return this._endGame();
    }
    
    return result;
  }

  /**
   * Kończy grę
   * @private
   */
  _endGame() {
    const gameDuration = Math.floor((Date.now() - this.state.stats.startTime) / 1000);
    const unlockedAchievements = this.achievementSystem.checkAchievements({
      ...this.state.stats,
      difficulty: this.state.difficulty,
      duration: gameDuration,
      score: this.state.score
    });
    
    this.state.currentScreen = 'game-over';
    
    return {
      score: this.state.score,
      level: DIFFICULTY_LEVELS[this.state.difficulty].name,
      time: gameDuration,
      achievements: unlockedAchievements
    };
  }

  /**
   * Rozpoczyna minigrę
   * @param {string} minigameType - Typ minigry
   */
  startMinigame(minigameType) {
    const config = MINIGAME_CONFIGS[minigameType][this.state.difficulty];
    this.state.currentMinigame = {
      type: minigameType,
      config,
      startTime: Date.now()
    };
    this.state.currentScreen = `minigame-${minigameType}`;
    
    return config;
  }

  /**
   * Kończy minigrę
   * @param {boolean} success - Czy minigra ukończona sukcesem
   */
  endMinigame(success) {
    if (success) {
      this.state.score += 50;
      this.state.stats.minigamesCompleted++;
    } else {
      this.state.health -= 15;
    }
    
    this.state.currentScreen = 'quiz';
    this.state.currentMinigame = null;
  }
}