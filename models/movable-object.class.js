class Movableobject extends DrawableObject {
  // otherDirection = false;
  speed = 0.25;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;
  isDeadStatus = false;
  ground = 191;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY < 0) {
        this.y += this.speedY;
        this.speedY += this.acceleration;
      }
    }, 40);
  }

  groundControll() {
    setInterval(() => {
      if (this.y >= this.ground) {
        this.y = this.ground;
        this.speedY = 0;
      }
    }, 40);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
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
      a.x < b.x + b.width &&
      a.y + a.height > b.y &&
      a.y < b.y + b.height
    );
  }

  isJumpColliding(movebalObject) {
    let a = this.hitbox();
    let b = movebalObject.hitbox();
    const VERTICAL_TOLERANCE = 150;

    return (
      a.x + a.width > b.x &&
      a.x < b.x + b.width &&
      a.y + a.height > b.y &&
      a.y + a.height - b.y < VERTICAL_TOLERANCE &&
      this.speedY > 0
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDeadStatus = true;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed < 500;
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
    this.speedY = -30;
  }

  collect(collecteble) {
    if (collecteble.type == "coin" && this.coin < 100) {
      this.coin += 20;
    }
    if (collecteble.type == "bottle" && this.bottles < 100) {
      this.bottles += 20;
    }
  }
}
