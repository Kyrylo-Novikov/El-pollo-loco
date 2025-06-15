class Level {
  enemies;
  clouds;
  backgroundObject;
  collectibles;
  level_end_x = 2700;
  constructor(enemies, clouds, backgroundObject, collectibles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.collectibles = collectibles;
  }
}
