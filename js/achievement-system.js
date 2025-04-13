// - System osiągnięć

export class AchievementSystem {
  constructor() {
    this.unlockedAchievements = [];
    this.loadProgress();
  }

  loadProgress() {
    const savedProgress = localStorage.getItem('cyberAchievements');
    if (savedProgress) {
      this.unlockedAchievements = JSON.parse(savedProgress);
    }
  }

  saveProgress() {
    localStorage.setItem(
      'cyberAchievements', 
      JSON.stringify(this.unlockedAchievements)
    );
  }

  checkAchievements(gameStats) {
    const newAchievements = [];
    
    gameData.achievements.forEach(achievement => {
      if (!this.unlockedAchievements.includes(achievement.id) && 
          achievement.condition(gameStats)) {
        this.unlockedAchievements.push(achievement.id);
        newAchievements.push(achievement);
      }
    });
    
    if (newAchievements.length > 0) {
      this.saveProgress();
    }
    
    return newAchievements;
  }

  getUnlockedAchievements() {
    return gameData.achievements.filter(a => 
      this.unlockedAchievements.includes(a.id)
    );
  }
}