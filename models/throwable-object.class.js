class ThrowableObject extends Movableobject {
  speedY;
  speedX;
  img;
  IMAGE_BOTTLE = ["img/6_salsa_bottle/salsa_bottle.png"];
  offset = {
    top: 10,
    left: 15,
    bottom: 10,
    right: 15,
  };

  IMAGE_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  sounds = { throw: new Audio("audio/throw.mp3") };

  constructor(x, y, direction) {
    super().loadImage(this.IMAGE_BOTTLE);
    this.loadImages(this.IMAGE_BOTTLE_ROTATION);
    this.loadImages(this.IMAGE_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 68;
    this.otherDirection = direction;
    this.currentImage = 0;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      this.playAnimation(this.IMAGE_BOTTLE_ROTATION);

      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
      if (this.y >= 500) {
        this.stopSound("throw");
      } else {
        this.playSounds("throw");
      }
    }, 1000 / 30);
  }

  splash() {
    clearInterval(this.throwInterval);
    this.currentImage = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.acceleration = 0;
    let bottleHit = setInterval(() => {
      this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
      this.stopSound("throw");
      if (this.currentImage >= this.IMAGE_BOTTLE_SPLASH.length - 1) {
        clearInterval(bottleHit);

        setTimeout(() => {
          this.consumed = true;
        }, 50);
      }
    }, 1000 / 20);
  }
}
