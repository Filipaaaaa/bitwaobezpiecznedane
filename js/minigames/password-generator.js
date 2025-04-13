// password-generator.js - Minigra generatora haseł

export class PasswordGenerator {
  constructor(level) {
    this.level = level;
    this.config = newMiniGames.passwordStrength.difficulty[level];
    this.requirements = this.generateRequirements();
    this.generatedPassword = '';
  }

  generateRequirements() {
    const allRequirements = [
      { name: 'Wielkie litery', regex: /[A-Z]/, count: 1 },
      { name: 'Małe litery', regex: /[a-z]/, count: 1 },
      { name: 'Cyfry', regex: /[0-9]/, count: 1 },
      { name: 'Znaki specjalne', regex: /[^A-Za-z0-9]/, count: 1 },
      { name: 'Minimalna długość', check: (pwd) => pwd.length >= this.config.length }
    ];
    
    return allRequirements.slice(0, this.config.requirements);
  }

  generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    
    for (let i = 0; i < this.config.length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    this.generatedPassword = password;
    return password;
  }

  checkPassword(password) {
    return this.requirements.map(req => {
      if (req.regex) {
        const matches = password.match(req.regex) || [];
        return {
          name: req.name,
          fulfilled: matches.length >= req.count,
          required: req.count
        };
      } else {
        return {
          name: req.name,
          fulfilled: req.check(password),
          required: ''
        };
      }
    });
  }

  validateAll(password) {
    const results = this.checkPassword(password);
    return results.every(r => r.fulfilled);
  }
}