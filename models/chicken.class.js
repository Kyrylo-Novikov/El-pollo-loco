class Chicken extends Movableobject {
  y = 350;
  height = 80;
  width = 60;
  energy = 5;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  speed = 0.25 + Math.random();
  offset = {
    top: 10,
    left: 0,
    bottom: 20,
    right: 15,
  };
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 1500;
    this.speed = 0.25 + Math.random();
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
