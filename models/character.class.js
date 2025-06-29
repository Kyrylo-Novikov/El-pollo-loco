class Character extends Movableobject {
  x = 20;
  y = 187;
  height = 240;
  width = 100;
  speed = 20;
  offset = {};
  bottles = 100;
  coin = 0;
  lastMove = 0;
  animationsInterval;
  animationsInterval;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
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
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  sounds = {
    run: new Audio("audio/run-character.mp3"),
    jump: new Audio("audio/jump.mp3"),
    snor: new Audio("audio/snoring.mp3"),
    hurt: new Audio("audio/hurt.mp3"),
    death: new Audio("audio/death.mp3"),
  };

  world;

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

  gravityForCharacter() {
    this.applyGravity();
    this.groundControll();
  }

  animate() {
    this.controlleInterval = setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > -240) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.playSounds("jump");
      }
      if (this.world.keyboard.D) {
        this.lastMove = new Date().getTime();
      }
      if (this.x >= 2100) {
        this.world.camera_x = -2100 + 100;
      } else {
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 30);

    this.animationsInterval = setInterval(() => {
      if (this.isDead()) {
        this.playSounds("death");
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playSounds("hurt");
        this.playAnimation(this.IMAGES_HURT);
        this.lastMove = new Date().getTime();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
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
    }, 1000 / 30);
  }

  idelLong() {
    let sinceLastMove = new Date().getTime() - this.lastMove;
    return sinceLastMove > 10000;
  }

  // jump() {
  //   this.speedY = 30;
  // }

  stopAnimation() {
    clearInterval(this.animationsInterval);
    clearInterval(this.controlleInterval);
  }
}
