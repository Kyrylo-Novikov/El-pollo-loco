/**
 * Represents a Level instanc with all placed objects ,enemies,clouds, background object and collectibles
 */
class Level {
  /**
   * @type {Enemy[]} List of all enemy objects
   */
  enemies;
  /**
   * @type {Cloud[]} List of all cloud objects
   */
  clouds;
  /**
   * @type {BackgroundObject[]} List of all background objects
   */
  backgroundObjects;
  /**
   * @type {Collectibles[]} List of all collectibles objects (coins, bottles)
   */
  collectibles;
  /**
   * @type {number} Horizontal pixels position where the level ends
   */
  level_end_x = 6500;

  /**
   * Creates a level with all its components
   * @param {Enemy[]} enemies - All enemies in the level
   * @param {Cloud[]} clouds - Cloud objects
   * @param {BackgroundObject[]} backgroundObjects - Background layers
   * @param {Collectibles[]} collectibles - All collectible items
   * @constructor
   */
  constructor(enemies, clouds, backgroundObjects, collectibles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectibles = collectibles;
  }
}
