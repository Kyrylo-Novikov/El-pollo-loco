class Endboss extends Movableobject {
  y = 0;
  height = 450;
  width = 280;
  offset = {
    top: 100,
    left: 50,
    bottom: 60,
    right: 55,
  };
  energy = 100;
  speed = 5;
  maxX = 2800;
  minX = 2000;
  statusBar = new StatusBar(500, 10, "boss", 100);
  bossAnimation;
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
  hurtSoundPlayed = false;

  sounds = {
    walk: new Audio("audio/endboss-walk.mp3"),
    attack: new Audio("audio/endboss-atk.mp3"),
    dead: new Audio("audio/endboss_dead.mp3"),
    idel: new Audio("audio/endboss_idle.mp3"),
    hurt: new Audio("audio/endboss-hurt.mp3"),
  };
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
    this.x = 2500;
    this.animate();
  }

  animate() {
    this.bossAnimation = setInterval(() => {
      if (this.isDead() && !this.deadStart) {
        this.deadStart = true;
        this.walkingStart = false;
        this.attackStart = false;
        this.hurtStart = false;
        this.alertStart = false;
        this.playSounds("dead");
        this.currentImage = 0;
      } else if (this.isHurt()) {
        if (!this.hurtSoundPlayed) {
          this.playSounds("hurt");
          this.hurtSoundPlayed = true;
        }
      } else {
        this.hurtSoundPlayed = false;
      }
      if (Math.abs(this.x - this.world.character.x) < 100) {
        this.walkingStart = false;
        this.attackStart = true;
        this.playSounds("attack");
        this.moveLeft();
      } else if (Math.abs(this.x - this.world.character.x) < 500) {
        this.walkingStart = true;
        this.attackStart = false;
        this.moveLeft();
      } else {
        this.alertStart = true;
        this.walkingStart = false;
      }

      if (this.deadStart) {
        this.playAnimation(this.ENDBOSS_STATUS.dead);
        if (this.currentImage >= this.ENDBOSS_STATUS.dead.length - 1) {
          clearInterval(this.bossAnimation);
          this.y = 120;
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.ENDBOSS_STATUS.hurt);
      } else if (this.attackStart) {
        this.playAnimation(this.ENDBOSS_STATUS.attack);
      } else if (this.walkingStart) {
        this.playAnimation(this.ENDBOSS_STATUS.walking);
        this.playSounds("walk");
        this.world.statusBar.push(this.statusBar);
      } else {
        this.playAnimation(this.ENDBOSS_STATUS.alert);
        if (Math.abs(this.x - this.world.character.x) < 800) {
          this.playSounds("idel");
        }
      }
    }, 1000 / 30);
  }

  stopAnimation() {
    clearInterval(this.bossAnimation);
  }

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
