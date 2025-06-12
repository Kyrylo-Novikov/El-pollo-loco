class Collectibles extends DrawableObject {
  IMAGE_COIN = ["img/8_coin/coin_1.png"];
  IMAGE_BOTTLE = ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];
  img;
  y;
  x;
  width = 120;
  height = 120;
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  constructor(type, x, y, w, h) {
    super();
    this.type = type;
    this.width = w;
    this.height = h;
    this.y = y;
    this.x = x;
    if (type == "coin") {
      this.loadImage(this.IMAGE_COIN);
      this.offset = {
        top: 40,
        left: 45,
        bottom: 40,
        right: 45,
      };
    }
    if (type == "bottle") {
      this.loadImage(this.IMAGE_BOTTLE);
      this.offset = {
        top: 20,
        left: 42,
        bottom: 15,
        right: 40,
      };
    }
  }
}
