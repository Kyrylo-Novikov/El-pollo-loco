/**
 * Represents the Chicken with all informations from Movableobject
 */
class Chicken extends Movableobject {
  /** Vertical position in pixels*/
  y = 330;
  /** Height in pixel */
  height = 100;
  /** Width in pixel */
  width = 80;
  /** Base energy for every Chicken */
  energy = 5;
  /** @type {string[]} File paths for the walking animation */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  /** Image path for the death animation*/
  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  /** @type {{[key:string]: HTMLAudioElement}} Object containing audio elements for diffrent situatins */
  sounds = {
    standard: Object.assign(new Audio("audio/chicken.mp3"), { volume: 1.0 }),
    dead: new Audio("audio/chicken_dead.mp3"),
  };

  /** @type {number} Randomized movement speed for the chicken (minimum 3)*/
  speed = Math.max(10 * Math.random(), 3);
  offset = {
    top: 10,
    left: 10,
    bottom: 20,
    right: 15,
  };
  /** The interval ID used to control the chicken animate*/
  chickenInterval;

  /**
   * Creats a new Chicken
   * Loads all images
   * Randomize the horizontal position (x) with a minimum of 300
   * Initializes the animation and sets the "dead" flag on false
   * @constructor
   */
  constructor() {
    super();
    this.loadImage(this.IMAGE_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300 + Math.random() * 1500;
    this.speed;
    this.animate();
    this.dead = false;
  }

  /**
   * Starts the animation loop for the chicken,
   *  let it walk to the left and sets the audible range.
   */
  animate() {
    this.chickenInterval = setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
        this.hearingDistance();
      }
    }, 1000 / 15);
  }

  /**
   * Checks whether the distance between the chicken and the character is too far to play the sounds or not
   */
  hearingDistance() {
    if (
      this.x - this.world?.character?.x >= 400 ||
      this.x - this.world?.character?.x <= -400
    ) {
      this.stopSound("standard");
    } else {
      this.playSounds("standard");
    }
  }

  /**
   * Clears the chickenInterval to stop the animation
   */
  stopAnimation() {
    clearInterval(this.chickenInterval);
  }

  /**
   * Uses hit from Movableobject.
   * If the energy is 0 or less and the dead flag is on false,
   * sets dead to true, loads the DEAD image and plays the "dead" sound .
   * After 1 second ,stops the sound and removes the chicken from the level
   */
  hit() {
    super.hit();
    if (this.energy <= 0 && !this.dead) {
      this.dead = true;
      this.loadImage(this.IMAGE_DEAD);
      this.playSounds("dead");
      setTimeout(() => {
        this.stopSound("dead");
        this.world.level.enemies = this.world.level.enemies.filter(
          (e) => e !== this
        );
      }, 500);
    }
  }
}
