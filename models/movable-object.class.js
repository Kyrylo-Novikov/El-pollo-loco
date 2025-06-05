class Movableobject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;
  speed = 0.25;
  speedY = 0;
  acceleration = 3;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 40);
  }

  isAboveGround() {
    return this.y <= 190;
  }
  //   loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 30);
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
