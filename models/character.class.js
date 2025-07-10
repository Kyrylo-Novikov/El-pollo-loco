/**
 * Represents the character with all informations from Movableobject
 */

class Character extends Movableobject {
  /**@type {number} Horizontal position in pixels*/
  x = 20;
  /** @type {number} Vertical position in pixels*/
  y = 187;
  /** @type {number} Character height in pixels*/
  height = 240;
  /** @type {number} Character width in pixels*/
  width = 100;
  /** @type {number} Movement speed for the character */
  speed = 14;
  /** @type {number} Count of bottles collected and for throwing */
  bottles = 100;
  /** @type {number} Count of coins collected */
  coin = 0;
  /** @type {number} Timestamp of the character's last move */
  lastMove = 0;
  /** @type {number}  Reference to the animation loop */
  animationsInterval;
  /** @type {number}  Reference to the control loop */
  controlleInterval;
  /** @type {boolean} True if the jump key is pressed*/
  isJumpt = false;
  /** @type {boolean} True if the jump already is triggered*/
  jumpTriggered = false;

  /** @type {string[]} File paths for the walking animation */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} File paths for the jumping animation */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} File paths for the death animation */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {string[]} File paths for the idle animation */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** @type {string[]} File paths for the sleep animation */
  IMAGES_IDLE_LONG = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  /** @type {string[]} File paths for the hurt animation */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {{[key:string]: HTMLAudioElement}} Object containing audio elements for diffrent situatins */
  sounds = {
    run: new Audio("audio/run-character.mp3"),
    jump: new Audio("audio/jump.mp3"),
    snor: new Audio("audio/snoring.mp3"),
    hurt: new Audio("audio/hurt.mp3"),
    death: new Audio("audio/death.mp3"),
    collect: new Audio("audio/take-collectibles.mp3"),
    win: new Audio("audio/win.mp3"),
    lose: new Audio("audio/lose.mp3"),
  };
  /** @type {World} Reference to the current world object */
  world;

  /**
   * Creates a new Character.
   * Loads all images for different animation , sets the start image.
   * Starts the animation, sets the offset for the hitbox and tracks the last move.
   * Also starts the gravity of the character
   * @constructor
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    super.loadImages(this.IMAGES_WALKING);
    super.loadImages(this.IMAGES_JUMPING);
    super.loadImages(this.IMAGES_DEAD);
    super.loadImages(this.IMAGES_IDLE_LONG);
    super.loadImages(this.IMAGES_IDLE);
    super.loadImages(this.IMAGES_HURT);
    this.animate();
    this.offset = {
      top: 120,
      left: 30,
      bottom: 10,
      right: 30,
    };
    this.lastMove = new Date().getTime();
    this.gravityForCharacter();
  }

  /**
   * Apply gravity behaviors to the character
   * Combind vertical movement (applyGravity()) and ground alingnment (groundControll())
   */
  gravityForCharacter() {
    this.applyGravity();
    this.groundControll();
  }

  animate() {
    this.controlleInterval = setInterval(() => {
      this.movedRightSide();
      this.moveLeftSide();
      this.jumping();
      this.throwTimeStore();
      this.camOnMoving();
    }, 1000 / 30);

    this.animationsInterval = setInterval(() => {
      if (this.isDead()) {
        this.playSounds("death");
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playSounds("hurt");
        this.playAnimation(this.IMAGES_HURT);
        this.lastMove = new Date().getTime();
      } else if (this.isJumpt) {
        this.playAnimation(this.IMAGES_JUMPING);
        let currentFrame = this.currentImage % this.IMAGES_JUMPING.length;
        if (!this.jumpTriggered) {
          this.jump();
          this.playSounds("jump");
          this.jumpTriggered = true;
        }
        if (currentFrame == this.IMAGES_JUMPING.length - 1) {
          this.jumpTriggered = false;
          this.isJumpt = false;
        }
        this.lastMove = new Date().getTime();
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playSounds("run");
        this.lastMove = new Date().getTime();
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.idelLong()) {
        this.playSounds("snor");
        this.playAnimation(this.IMAGES_IDLE_LONG);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
        this.stopSound("run");
        this.stopSound("snor");
      }
    }, 1000 / 12);
  }

  movedRightSide() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }
  }

  moveLeftSide() {
    if (this.world.keyboard.LEFT && this.x > -240) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }
  jumping() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.currentImage = 0;
      this.isJumpt = true;
    }
  }

  throwTimeStore() {
    if (this.world.keyboard.D) {
      this.lastMove = new Date().getTime();
    }
  }

  camOnMoving() {
    let camOffset = this.otherDirection ? 420 : 100;
    let viewTarget = -this.x + camOffset;
    this.world.camera_x += (viewTarget - this.world.camera_x) * 0.08;
  }

  idelLong() {
    let sinceLastMove = new Date().getTime() - this.lastMove;
    return sinceLastMove > 10000;
  }

  stopAnimation() {
    clearInterval(this.animationsInterval);
    clearInterval(this.controlleInterval);
  }

  triggerBounceJump() {
    if (!this.jumpTriggered) {
      this.isJumpt = true;
      this.jumpTriggered = true;
      this.speedY = -20;
    }
  }
}
