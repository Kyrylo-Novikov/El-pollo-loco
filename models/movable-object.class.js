class Movableobject extends DrawableObject {
  otherDirection = false;
  speed = 0.25;
  speedY = 0;
  acceleration = 3;
  energy = 100;

  lastHit = 0;

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

  isColliding(movebalObject) {
    return (
      this.x + this.width - this.offset.right >
        movebalObject.x - movebalObject.offset.left &&
      this.y + this.height - movebalObject.offset.bottom >
        movebalObject.y + movebalObject.offset.top &&
      this.x + this.offset.left <
        movebalObject.x + movebalObject.width - movebalObject.offset.right &&
      this.y + this.offset.top <
        movebalObject.y + movebalObject.height - movebalObject.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed < 1000;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }
  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 30;
  }
}
