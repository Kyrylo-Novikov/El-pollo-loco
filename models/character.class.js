class Character extends Movableobject {
  x = 20;
  y = 190;
  height = 240;
  width = 100;
  speed = 5;
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
  world;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    super.loadImages(this.IMAGES_WALKING);
    super.loadImages(this.IMAGES_JUMPING);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > -240) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      // console.log(this.speedY);

      if (this.world.keyboard.UP && this.y > 190) {
        this.speedY = 20;
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 120);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 1000 / 20);
  }

  jump() {}
}
