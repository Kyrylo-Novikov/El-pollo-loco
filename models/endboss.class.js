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
  energy = 20;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  speed = 0.25 + Math.random();
  constructor(parameters) {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2200;
    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
