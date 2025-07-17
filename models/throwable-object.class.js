/**
 * Represents all ThrowableObjects with all informations of the Movableobject
 */

class ThrowableObject extends Movableobject {
  /** @type {number} Vertical speed for throwing */
  speedY;
  /** @type {number} Horizontal speed for throwing */
  speedX;
  /** @type {string[]} Image path for the bottle */
  IMAGE_BOTTLE = ["img/6_salsa_bottle/salsa_bottle.png"];
  /** sets the offset for the hitbox*/
  offset = {
    top: 10,
    left: 15,
    bottom: 10,
    right: 15,
  };
  /** @type {string[]} File paths for the bottle rotation animation */
  IMAGE_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  /** @type {string[]} File paths for the bottle splash (on hit) animation */
  IMAGE_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /** @type {{[key:string]: HTMLAudioElement}} Object containing audio elements for diffrent situatins */
  sounds = {
    throw: new Audio("audio/throw.mp3"),
    splash: new Audio("audio/glass-bottle-breaking.mp3"),
  };

  /**
   * Creats a new ThrowableObject
   * Loads the images.
   * Sets vertical (y),horizontal(x) position , the height and the width for it.
   * Sets the image index and triggers throw.
   * @param {*} x Horizontal(x) position
   * @param {*} y Vertical (y) position
   * @param {*} direction  boolean from the Character (true = left, false = right)
   */
  constructor(x, y, direction) {
    super().loadImage(this.IMAGE_BOTTLE);
    this.loadImages(this.IMAGE_BOTTLE_ROTATION);
    this.loadImages(this.IMAGE_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 68;
    this.otherDirection = direction;
    this.currentImage = 0;
    this.consumed = false;
    this.throw();
  }

  /**
   * Gives the bottle upward speed , vertical movement logic ("applyGravity()").
   * Animates the throw.
   */
  throw() {
    this.speedY = -30;
    this.applyGravity();
    this.throwAnimation();
  }

  /**
   * Sets a interval for the throw animation , with sound and direction.
   */
  throwAnimation() {
    this.throwInterval = setInterval(() => {
      this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
      if (this.otherDirection) {
        this.x -= 14;
      } else {
        this.x += 14;
      }
      if (this.y >= 500) {
        this.stopSound("throw");
      } else {
        this.playSounds("throw");
      }
    }, 1000 / 15);
  }

  /**
   * Clears the interval from "throwAnimation()"".
   * Resets currentImage , vertical and horizontal speed to 0
   * Starts the animation for when the bottle hit a enemy
   */
  splash() {
    clearInterval(this.throwInterval);
    this.currentImage = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.acceleration = 0;
    this.throwHitAnimation();
  }

  /**
   * Sets an interval for the hit animation of a thrown object, including sound.
   * Clears the interval on the last frame of the animation
   * Marks the bottle as consumed and stop the sound after a short timeout(10ms)
   */
  throwHitAnimation() {
    let bottleHit = setInterval(() => {
      this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
      this.stopSound("throw");
      this.playSounds("splash");
      if (this.currentImage >= this.IMAGE_BOTTLE_SPLASH.length - 1) {
        clearInterval(bottleHit);

        this.consumed = true;
        this.stopSound("splash");
      }
    }, 1000 / 30);
  }
}
