/**
 * game-data.js - Zasoby danych gry
 * @module GameData
 */

// Konfiguracja poziomów trudności
export const DIFFICULTY_LEVELS = {
  easy: {
    id: 'easy',
    name: 'Podstawowy',
    health: 100,
    timeModifier: 1.5,
    minigames: ['firewall', 'phishing'],
    description: 'Dla początkujących w cyberbezpieczeństwie'
  },
  medium: {
    id: 'medium',
    name: 'Średniozaawansowany',
    health: 80,
    timeModifier: 1.0,
    minigames: ['firewall', 'phishing', 'password'],
    description: 'Wymaga podstawowej wiedzy'
  },
  hard: {
    id: 'hard',
    name: 'Zaawansowany',
    health: 60,
    timeModifier: 0.7,
    minigames: ['firewall', 'phishing', 'password', 'encryption'],
    description: 'Dla ekspertów cyberbezpieczeństwa'
  }
};

// Baza pytań quizowych
export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    text: 'Które z tych haseł jest najbezpieczniejsze?',
    category: 'password-security',
    difficulty: ['easy', 'medium', 'hard'],
    options: [
      { id: 'q1a', text: 'password123', correct: false, feedback: 'Hasło zawiera popularne słowo i sekwencję cyfr' },
      { id: 'q1b', text: 'P@ssw0rd!', correct: false, feedback: 'Choć zawiera znaki specjalne, jest zbyt przewidywalne' },
      { id: 'q1c', text: 'TrudneH@sło2023!', correct: true, feedback: 'Długie, zawiera różne typy znaków i jest unikalne' },
      { id: 'q1d', text: '12345678', correct: false, feedback: 'Bardzo słabe hasło - czysto numeryczne i sekwencyjne' }
    ]
  },
  // Dodatkowe pytania...
];

// Baza wiadomości phishingowych
export const PHISHING_EMAILS = [
  {
    id: 'ph1',
    subject: 'Weryfikacja konta bankowego',
    sender: 'security@bank.pl',
    actualSender: 'security@b4nk-phishing.com',
    content: `Szanowny Kliencie,
    
Wymagana jest natychmiastowa weryfikacja Twojego konta. 
Kliknij poniższy link aby potwierdzić dane:

[FAKE LINK: http://bank-pl-verify.com]

Z poważaniem,
Dział Bezpieczeństwa Banku`,
    isPhishing: true,
    clues: [
      'Link prowadzi do nieoficjalnej domeny',
      'Brak personalizacji wiadomości',
      'Twierdzi o "natychmiastowej" potrzebie działania'
    ]
  },
  // Dodatkowe wiadomości...
];

// Konfiguracja osiągnięć
export const ACHIEVEMENTS = [
  {
    id: 'no-mistakes',
    title: 'Perfekcjonista',
    description: 'Ukończ poziom bez błędów',
    icon: 'fa-medal',
    condition: (gameStats) => gameStats.errors === 0,
    difficulty: ['medium', 'hard']
  },
  // Dodatkowe osiągnięcia...
];

// Konfiguracja minigier
export const MINIGAME_CONFIGS = {
  firewall: {
    sizes: {
      easy: { width: 10, height: 10, enemies: 3 },
      medium: { width: 15, height: 15, enemies: 5 },
      hard: { width: 20, height: 20, enemies: 8 }
    },
    timeLimits: {
      easy: 120,
      medium: 90,
      hard: 60 
    }
  },
  // Konfiguracje innych minigier...
};

// Teksty i komunikaty
export const GAME_TEXTS = {
  ui: {
    welcome: 'Witaj w Bitwie o Bezpieczne Dane!',
    selectDifficulty: 'Wybierz poziom trudności:'
  },
  feedback: {
    correct: ['Dobrze!', 'Świetna odpowiedź!', 'Tak trzymaj!'],
    incorrect: ['Niestety nie!', 'Uważaj następnym razem!', 'To była pułapka!']
  }
};