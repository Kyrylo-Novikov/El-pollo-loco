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
    if (this instanceof ThrowableObject) {
      // Throwable object
      return true;
    } else {
      return this.y <= 190;
    }
  }

  isColliding(movebalObject) {
    let a = this.hitbox();
    let b = movebalObject.hitbox();
    return (
      a.x + a.width > b.x &&
      a.y + a.height > b.y &&
      a.x < b.x + b.width &&
      a.y < b.y + b.height
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

  collect() {
    console.log("etwas eingesammelt.");
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
