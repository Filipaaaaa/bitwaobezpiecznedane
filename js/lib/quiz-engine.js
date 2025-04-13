/**
 * quiz-engine.js - Silnik zarządzający logiką quizu
 * @module QuizEngine
 */

import { QUIZ_QUESTIONS, GAME_TEXTS } from './game-data.js';

export class QuizEngine {
  /**
   * @param {string[]} questionIds - ID pytań do wykorzystania
   */
  constructor(questionIds = []) {
    this.questions = this._prepareQuestions(questionIds);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
  }

  /**
   * Przygotowuje pytania na podstawie ID
   * @private
   */
  _prepareQuestions(questionIds) {
    return QUIZ_QUESTIONS
      .filter(q => questionIds.includes(q.id))
      .map(q => ({
        ...q,
        options: this._shuffleArray([...q.options])
      }));
  }

  /**
   * Miesza elementy tablicy
   * @private
   */
  _shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  /**
   * Pobiera aktualne pytanie
   */
  getCurrentQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      return null;
    }
    return this.questions[this.currentQuestionIndex];
  }

  /**
   * Sprawdza odpowiedź
   * @param {string} answerId - ID wybranej odpowiedzi
   */
  submitAnswer(answerId) {
    const question = this.getCurrentQuestion();
    if (!question) return null;

    const selectedOption = question.options.find(opt => opt.id === answerId);
    const isCorrect = selectedOption?.correct || false;

    // Aktualizacja statystyk
    if (isCorrect) {
      this.score += 10 * (1 + this.streak * 0.2);
      this.streak++;
      this.maxStreak = Math.max(this.maxStreak, this.streak);
    } else {
      this.streak = 0;
    }

    this.currentQuestionIndex++;

    return {
      isCorrect,
      feedback: selectedOption?.feedback || '',
      correctAnswerId: question.options.find(opt => opt.correct)?.id,
      progress: this.getProgress(),
      isComplete: this.isComplete()
    };
  }

  /**
   * Pobiera postęp (0-100)
   */
  getProgress() {
    return Math.floor((this.currentQuestionIndex / this.questions.length) * 100);
  }

  /**
   * Czy quiz jest zakończony
   */
  isComplete() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  /**
   * Generuje losowy feedback
   */
  getRandomFeedback(isCorrect) {
    const pool = isCorrect ? GAME_TEXTS.feedback.correct : GAME_TEXTS.feedback.incorrect;
    return pool[Math.floor(Math.random() * pool.length)];
  }
}