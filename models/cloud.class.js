class Cloud extends Movableobject {
  y = 0;
  height = 400;
  width = 720;
  speed = 0.5;

  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 20);
  }
}
