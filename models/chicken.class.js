class Chicken extends Movableobject {
  y = 350;
  height = 80;
  width = 60;
  energy = 5;
  img;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  speed = 0.25 + Math.random();
  offset = {
    top: 10,
    left: 0,
    bottom: 20,
    right: 15,
  };
  constructor() {
    super();
    this.loadImage(this.IMAGE_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 1500;
    this.speed = 0.25 + Math.random();
    this.animate();
    this.dead = false;
  }
  // animate() {
  //   if (this.energy === 0) {
  //     setInterval(() => {

  //     }, 100);
  //   } else if (this.energy > 0) {
  //     setInterval(() => {
  //       this.moveLeft();
  //     }, 60);
  //   }
  // }

  animate() {
    setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 20);
  }

  hit() {
    super.hit();
    if (this.energy <= 0 && !this.dead) {
      this.dead = true;
      this.loadImage(this.IMAGE_DEAD);
      setTimeout(() => {
        this.world.level.enemies = this.world.level.enemies.filter(
          (e) => e !== this
        );
      }, 2000);
    }
  }
}
