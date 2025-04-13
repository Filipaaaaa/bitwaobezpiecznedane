// main.js - Główny plik aplikacji

import { GameManager } from './game-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  const gameManager = new GameManager();

  // Elementy DOM
  const screens = {
    start: document.getElementById('start-screen'),
    instructions: document.getElementById('instructions-screen'),
    quiz: document.getElementById('quiz-screen'),
    firewallMaze: document.getElementById('firewall-maze-screen'),
    phishing: document.getElementById('phishing-screen'),
    gameOver: document.getElementById('game-over-screen'),
    achievements: document.getElementById('achievements-screen') // <--- DODANE
  };

  // Inicjalizacja
  initEventListeners();

  function initEventListeners() {
    // Przyciski poziomu trudności
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        gameManager.startGame(level);
        showScreen('quiz');
        updateQuizUI();
      });
    });

    // Przyciski odpowiedzi quizu
    document.getElementById('quiz-options').addEventListener('click', e => {
      if (e.target.classList.contains('quiz-option')) {
        const index = Array.from(e.target.parentElement.children).indexOf(e.target);
        handleQuizAnswer(index);
      }
    });

    // Przyciski phishingu
    document.querySelector('.phishing-buttons').addEventListener('click', e => {
      if (e.target.classList.contains('phishing-btn')) {
        const choice = e.target.dataset.choice === 'safe' ? false : true;
        handlePhishingAnswer(choice);
      }
    });

    // Przycisk instrukcji
    document.getElementById('instructions-btn').addEventListener('click', () => {
      showScreen('instructions');
    });

    // Przycisk osiągnięć
    document.getElementById('achievements-btn').addEventListener('click', () => {
      showScreen('achievements');
    });

    // Powrót z instrukcji
    document.getElementById('back-to-start').addEventListener('click', () => {
      showScreen('start');
    });

    // Powrót z osiągnięć
    document.getElementById('back-to-menu-btn').addEventListener('click', () => {
      showScreen('start');
    });

    // Zagraj ponownie
    document.getElementById('play-again-btn').addEventListener('click', () => {
      showScreen('start');
    });
  }

  function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
      screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
  }

  function updateQuizUI() {
    const quizData = gameManager.getQuizQuestion();
    document.getElementById('quiz-question').textContent = quizData.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    quizData.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('quiz-option');
      optionElement.textContent = option;
      optionsContainer.appendChild(optionElement);
    });

    document.getElementById('quiz-progress').style.width = `${quizData.progress}%`;
  }

  function handleQuizAnswer(index) {
    const result = gameManager.submitQuizAnswer(index);

    if (result.gameOver) {
      showGameOverScreen();
      return;
    }

    const feedbackElement = document.getElementById('quiz-feedback');
    feedbackElement.textContent = result.feedback;
    feedbackElement.className = 'quiz-feedback show ' + (result.correct ? 'correct' : 'incorrect');

    setTimeout(() => {
      feedbackElement.classList.remove('show');
      updateQuizUI();
      updateStats();
    }, 1500);
  }

  function showGameOverScreen() {
    const result = gameManager.endGame();
    document.getElementById('final-score').textContent = result.score;
    document.getElementById('final-level').textContent = result.level;
    document.getElementById('final-time').textContent = result.time || 0;
    showScreen('gameOver');
  }

  function updateStats() {
    document.querySelector('#health span').textContent = `${gameManager.health}%`;
    document.querySelector('#score span').textContent = gameManager.score;
  }
});
