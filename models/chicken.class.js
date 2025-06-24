class Chicken extends Movableobject {
  y = 330;
  height = 100;
  width = 80;
  energy = 5;
  img;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  sounds = {
    standard: new Audio("audio/chicken.mp3"),
    dead: new Audio("audio/chicken_dead.mp3"),
  };

  speed = 0.2 + 5 * Math.random();
  offset = {
    top: 10,
    left: 0,
    bottom: 20,
    right: 15,
  };

  chickenInterval;
  constructor() {
    super();
    this.loadImage(this.IMAGE_DEAD);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 1500;
    this.speed;
    this.animate();
    this.dead = false;
  }

  animate() {
    this.chickenInterval = setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);

        if (
          this.x - this.world?.character?.x >= 400 ||
          this.x - this.world?.character?.x <= -400
        ) {
          this.stopSound("standard");
        } else {
          this.playSounds("standard");
        }
      }
    }, 1000 / 20);
  }
  stopAnimation() {
    clearInterval(this.chickenInterval);
  }

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
      }, 1000);
    }
  }
}
