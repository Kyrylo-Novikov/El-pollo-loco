/**
 * Represents a SmallChicken that inherents all properties and methods from Chicken
 */

class SmallChicken extends Chicken {
  /**
   * @type {String[]} Array of file paths for the walking animation
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * @type {String[]} Array of file paths for the dead image
   */
  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * @type {{[key:string]:HTMLAudioElement}} Object containing audio elements for diffrent situatins
   */
  sounds = {
    standard: new Audio("audio/small-chicken.mp3"),
    dead: new Audio("audio/chicken_dead.mp3"),
  };

  /** @type {number} Height of the SmallChicken */
  height = 80;

  /** @type {number} Width of the SmallChicken */
  width = 60;
  /** @type {number} Vertical Position in pixels */
  y = 350;

  constructor(x) {
    super(), this.loadImage(this.IMAGE_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
  }
}
