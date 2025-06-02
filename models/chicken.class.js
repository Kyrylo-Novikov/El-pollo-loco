class Chicken extends Movableobject {
  y = 350;
  height = 80;
  width = 60;
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    super.animate(0.15);
    this.x = 200 + Math.random() * 500;
  }
}
