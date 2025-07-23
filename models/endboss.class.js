/**
 * Represent the Endboss with all informations from Movableobject
 */

class Endboss extends Movableobject {
  /** @type {number} Vertical position in pixels */
  y = 90;
  /** @type {number} Height of the Endboss  */
  height = 360;
  /** @type {number} Width of the Endboss  */
  width = 240;
  /** Sets the offset for the hitbox*/
  offset = {
    top: 100,
    left: 50,
    bottom: 60,
    right: 55,
  };
  /** @type {number}Energy for the Endboss */
  energy = 100;
  /** @type {number}Speed for the Endboss */
  speed = 5;
  // maxX = 2800;
  // minX = 2000;
  /** @type {Object} Status bar for the boss*/
  statusBar = new StatusBar(500, 40, "boss", 100);
  /**Interval ID used to control the end boss animation and behavior */
  bossAnimation;
  /** @type {boolean} Set to true to display the boss status bar */
  showStatusBar = false;

  /** @type {Object.<string,string[]>} Animation file paths for each boss state: walking, alert, attack, hurt and dead.*/
  ENDBOSS_STATUS = {
    walking: [
      "img/4_enemie_boss_chicken/1_walk/G1.png",
      "img/4_enemie_boss_chicken/1_walk/G2.png",
      "img/4_enemie_boss_chicken/1_walk/G3.png",
      "img/4_enemie_boss_chicken/1_walk/G4.png",
    ],
    alert: [
      "img/4_enemie_boss_chicken/2_alert/G5.png",
      "img/4_enemie_boss_chicken/2_alert/G6.png",
      "img/4_enemie_boss_chicken/2_alert/G7.png",
      "img/4_enemie_boss_chicken/2_alert/G8.png",
      "img/4_enemie_boss_chicken/2_alert/G9.png",
      "img/4_enemie_boss_chicken/2_alert/G10.png",
      "img/4_enemie_boss_chicken/2_alert/G11.png",
      "img/4_enemie_boss_chicken/2_alert/G12.png",
    ],
    attack: [
      "img/4_enemie_boss_chicken/3_attack/G13.png",
      "img/4_enemie_boss_chicken/3_attack/G14.png",
      "img/4_enemie_boss_chicken/3_attack/G15.png",
      "img/4_enemie_boss_chicken/3_attack/G16.png",
      "img/4_enemie_boss_chicken/3_attack/G17.png",
      "img/4_enemie_boss_chicken/3_attack/G18.png",
      "img/4_enemie_boss_chicken/3_attack/G19.png",
      "img/4_enemie_boss_chicken/3_attack/G20.png",
    ],
    hurt: [
      "img/4_enemie_boss_chicken/4_hurt/G21.png",
      "img/4_enemie_boss_chicken/4_hurt/G22.png",
      "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ],
    dead: [
      "img/4_enemie_boss_chicken/5_dead/G24.png",
      "img/4_enemie_boss_chicken/5_dead/G25.png",
      "img/4_enemie_boss_chicken/5_dead/G26.png",
    ],
  };
  /** @type {boolean} Flag for hurt sound of the boss */
  hurtSoundPlayed = false;

  /** @type {{[key:string]: HTMLAudioElement}} Object containing audio elements for diffrent situations */
  sounds = {
    walk: new Audio("audio/endboss-walk.mp3"),
    attack: new Audio("audio/endboss-atk.mp3"),
    dead: new Audio("audio/endboss_dead.mp3"),
    alert: new Audio("audio/endboss_idle.mp3"),
    hurt: new Audio("audio/endboss-hurt.mp3"),
  };

  /**
   * Creates a new Endboss.
   * Loads the starting image and all animations
   * Sets flags for different actions: alert, attack, dead, hurt and walking
   * Place the boss at x = 2500 and starts the animation
   * @constructor
   */
  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.ENDBOSS_STATUS.alert);
    this.loadImages(this.ENDBOSS_STATUS.attack);
    this.loadImages(this.ENDBOSS_STATUS.dead);
    this.loadImages(this.ENDBOSS_STATUS.hurt);
    this.loadImages(this.ENDBOSS_STATUS.walking);
    this.alertStart = true;
    this.walkingStart = false;
    this.attackStart = false;
    this.hurtStart = false;
    this.deadStart = false;
    this.x = 6400;
    this.animate();
  }

  /**
   * Controls the boss behavior, updates flags and animations,
   * and manages the visibility of the status bar
   */
  animate() {
    this.bossAnimation = setInterval(() => {
      this.allBehaviorAndFlagManagment();
      this.allAnimations();
      this.removeStatusBar();
    }, 1000 / 30);
  }

  /**
   * Controls all animations of the boss based on state
   */
  allAnimations() {
    if (this.deadStart) {
      this.deathAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.ENDBOSS_STATUS.hurt);
    } else if (this.attackStart) {
      this.playAnimation(this.ENDBOSS_STATUS.attack);
    } else if (this.walkingStart) {
      this.walkingAnimation();
    } else {
      this.alertAnimation();
    }
  }

  /**
   * Removes the status bar when the boss energy is 0 or less.
   */
  removeStatusBar() {
    if (this.showStatusBar && this.energy <= 0) {
      this.world.statusBar = this.world.statusBar.filter(
        (bar) => bar !== this.statusBar
      );
    }
  }

  /**
   * Plays the alert animation.
   * Plays the "alert" sound if the the distance between the boss and character less than 800 pixel.
   */
  alertAnimation() {
    this.playAnimation(this.ENDBOSS_STATUS.alert);
    if (Math.abs(this.x - this.world.character.x) < 840) {
      this.playSounds("alert");
    }
  }

  /**
   * Plays the walking animation and sound.
   * If "showStatusBar" is false , adds the status bar to the world and sets "showStatusBar" to true
   */
  walkingAnimation() {
    this.playAnimation(this.ENDBOSS_STATUS.walking);
    this.playSounds("walk");
    if (!this.showStatusBar) {
      this.world.statusBar.push(this.statusBar);
      this.showStatusBar = true;
    }
  }

  /**
   * Plays the death animation
   * When the animation reaches the last frame, clear the interval and sets the vertical position (y) to 120
   */
  deathAnimation() {
    this.playAnimation(this.ENDBOSS_STATUS.dead);
    if (this.currentImage >= this.ENDBOSS_STATUS.dead.length - 1) {
      clearInterval(this.bossAnimation);
      this.y = 200;
    }
  }

  /**
   * Manages the boss flags and behavior based on state and distance to the character.
   */
  allBehaviorAndFlagManagment() {
    if (this.isDead() && !this.deadStart) {
      this.deathBehaviorAndFlags();
    } else {
      this.hurtBehaviorAndFlags();
    }
    if (Math.abs(this.x - this.world.character.x) < 100) {
      this.attackBehaviorAndFlags();
    } else if (Math.abs(this.x - this.world.character.x) < 400) {
      this.huntBehaviorAndFlags();
    } else {
      this.alertFlags();
    }
  }

  /**
   * Sets the alert state flag and turns off walking state
   */
  alertFlags() {
    this.alertStart = true;
    this.walkingStart = false;
  }

  /**
   * Sets the walking state, turns off the attack state, and moves the boss left
   */
  huntBehaviorAndFlags() {
    this.walkingStart = true;
    this.attackStart = false;
    this.moveLeft();
  }

  /**
   * Sets the attack state, turns off the walking state.
   * Moves the boss left and plays the attack sound
   */
  attackBehaviorAndFlags() {
    this.walkingStart = false;
    this.attackStart = true;
    this.moveLeft();
    this.playSounds("attack");
  }

  /**
   * If the boss is hurt reduce speed to 1 , plays the hurt sound, and sets the sound flag.
   * Otherwise, reset the speed and reset the sound flag.
   */
  hurtBehaviorAndFlags() {
    if (this.isHurt()) {
      this.speed = 1;
      this.playSounds("hurt");
      this.hurtSoundPlayed = true;
    } else {
      this.hurtSoundPlayed = false;
      this.speed = 5;
    }
  }

  /**
   * Sets the dead flag and resets all other state flags.
   * Plays the death sound and resets the animation index
   */
  deathBehaviorAndFlags() {
    this.deadStart = true;
    this.walkingStart = false;
    this.attackStart = false;
    this.hurtStart = false;
    this.alertStart = false;
    this.playSounds("dead");
    this.currentImage = 0;
  }

  /**
   * Stops the boss animation by clearing the interval.
   */
  stopAnimation() {
    clearInterval(this.bossAnimation);
  }

  /**
   * Inherits `hit` from MovableObject
   * If the energy 0 or less and the dead flage is false,
   * sets the dead flag to true and removes the boss from the world after 1 second.
   */
  hit() {
    super.hit();
    if (this.energy <= 0 && !this.dead) {
      this.dead = true;
      setTimeout(() => {
        this.world.level.enemies = this.world.level.enemies.filter(
          (enemy) => enemy !== this
        );
      }, 1000);
    }
  }
}
