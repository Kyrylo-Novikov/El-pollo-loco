/** Represents all movable objects with all information from DrawableObjects */
class Movableobject extends DrawableObject {
  /** @type {number} Bacis movement speed for every movable objects */
  speed = 0.25;
  /** @type {number} Vertical speed for jumping, falling , throwing */
  speedY = 0;
  /** @type {number} Acceleration for the vertical speed*/
  acceleration = 3;
  /** @type {number} Base energy for every movable objects  */
  energy = 100;
  /** @type {number} Timestamp of the last time the object was hit*/
  lastHit = 0;
  /** @type {boolean} Indicates whether the objects is in dead state*/
  isDeadStatus = false;
  /** @type {number} The ground height ,y-cordinate, where the object stands */
  ground = 191;

  /**
   * Adds gravity to the object by changing its vertical speed.
   * Only if the object is above the ground or moving up or standing still vertically.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY <= 0) {
        this.y += this.speedY;
        this.speedY += this.acceleration;
      }
    }, 40);
  }

  /**
   * Sets the vertical position to the the ground level and stops vertical movement.
   * If the object below or on the ground.
   */
  groundControl() {
    setInterval(() => {
      if (this.y >= this.ground) {
        this.y = this.ground;
        this.speedY = 0;
      }
    }, 40);
  }

  /**
   * Checks if the object is above ground or is a throwable object.
   * @returns {boolean} returns true if the object is above ground or a throwable object
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y <= 190;
    }
  }

  /**
   * Checks the hitbox of the object and other objects to check for collision
   * @param {DrawableObject} movableObject  the other objects to check for collision
   * @returns {boolean} True if the hitboxes colliding
   */
  isColliding(movableObject) {
    let a = this.hitbox();
    let b = movableObject.hitbox();
    return (
      a.x + a.width > b.x &&
      a.x < b.x + b.width &&
      a.y + a.height > b.y &&
      a.y < b.y + b.height
    );
  }

  /**
   * Checks the hitbox of this object and the other object for a collision from above.
   * @param {DrawableObject} movableObject  The other objects to check for collision
   * @returns {boolean} True if the hitboxes of the object colliding from above.
   */
  isJumpColliding(movableObject) {
    let a = this.hitbox();
    let b = movableObject.hitbox();
    let VERTICAL_TOLERANCE = 100;
    return (
      a.x + a.width > b.x &&
      a.x < b.x + b.width &&
      a.y + a.height > b.y &&
      a.y + a.height - b.y < VERTICAL_TOLERANCE &&
      this.speedY > 0
    );
  }

  /**
   * Subtracts 5 energy from the object.
   * If the energy reaches 0 or less, sets it to 0 and marks the object as dead.
   * Otherwise, saves the timestamp of the last hit
   */
  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDeadStatus = true;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the last hit is less than 500ms ago
   * @returns {boolean} True if less than 500ms have passed since the last hit.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed < 500;
  }

  /**
   * Checks energy
   * @returns {boolean} True if the energy reaches 0
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Moves the object to the right side by adding speed to the horizontal position
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left side by subtracting speed from the horizontal position
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Animates the object by calculating the index for the next image of the array.
   * Sets the displayed image to the current image and than increases the index by 1
   * @param {Array} images - A array with image paths that make up the animation
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /** Moves the object upward by setting a negative vertical speed  */
  jump() {
    this.speedY = -30;
  }

  /**
   * Adding 20 to the collected , coin or bottle, if it is below 100
   * @param {object} collectable - Object that can be collected by the character.
   */
  collect(collectable) {
    if (collectable.type == "coin" && this.coin < 100) {
      this.coin += 20;
    }
    if (collectable.type == "bottle" && this.bottles < 100) {
      this.bottles += 20;
    }
  }
}
