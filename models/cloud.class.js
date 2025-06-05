class Cloud extends Movableobject {
  y = 0;
  height = 400;
  width = 720;

  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.moveLeft(this.speed);
  }
}
