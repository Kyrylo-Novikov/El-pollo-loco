/**
 * Represents all drawable objects with position , size image and sounds
 */
class DrawableObject {
  /** @type {HTMLImageElement} The image to render for this object */
  img;
  /**@type {number} Horizontal position in pixels*/
  x = 120;
  /** @type {number} Vertical position in pixels*/
  y = 280;
  /** @type {number} Object height in pixels*/
  height = 150;
  /** @type {number} Object width in pixels*/
  width = 100;
  /** @type {Object.<string:HTMLImageElement>} Saves the preloadet images of the object */
  imageCache = {};
  /** @type {number} Index of the current displayed image*/
  currentImage = 0;
  /** @type {side:number} Offset of the Object for collision*/
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
  /** @type { boolean} Checks whether the object have to be mirrored horizontally*/
  otherDirection = false;
  /** @type {object} Contains the sound objects  for the object*/
  sounds = {};

  /**
   *  Creates a Image and sets it to the source to the given path
   * @param {string} path - The URL of the image
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Creates images for every src of the array
   * @param {string[]} arr - Array of image source paths for the object animations
   */
  loadImages(arr) {
    arr.forEach((path) => {
      this.loadImage(path);
      this.imageCache[path] = this.img;
    });
  }

  /**
   * Draws the image on the canvas at position (x,y),with given height and width
   * @param {CanvasRenderingContext2D} ctx - The context for the rendering canvas
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the hitbox of the object to see the collisions between the difdrent objects.
   * Used for debugging
   * @param {CanvasRenderingContext2D} ctx - The context for the rendering canvas
   */
  drawFrame(ctx) {
    if (this.hasCollisionFrame()) {
      let hitbox = this.hitbox();
      let x = hitbox.x;
      let y = hitbox.y;
      let width = hitbox.width;
      let height = hitbox.height;
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(x, y, width, height);
      ctx.stroke();
    }
  }

  /**
   * Checks whether the object need a collision frame.
   * @returns {boolean}
   */
  hasCollisionFrame() {
    return (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Collectibles ||
      this instanceof ThrowableObject
    );
  }

  /**
   * Calculates the hitbox for the object based on current position and offset
   * @returns {{x:number,y:number,height:number,width:number}} The hitbox dimensions and position.
   */
  hitbox() {
    return {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.top - this.offset.bottom,
    };
  }

  /**
   * Start playing the sound assigned to give key, if not muted or alrady playing.
   * Resets the sound's time to the beginning and catch the error on playing sounds
   * @param {string} key - The key of the sound to play from the object's sound map
   * @returns {void}
   */
  playSounds(key) {
    if (this.world.isMuted) return;
    let sound = this.sounds[key];
    if (!sound) return;
    sound.volume = 0.1;
    if (!sound.paused) return;
    sound.currentTime = 0;
    sound.play().catch((err) => {
      if (err.name !== "AbortError") {
        console.warn(`error on playing '${key}'`);
      }
    });
  }

  /**
   * Paused the sound and reset the sound's time to the beginning if it is currently playing.
   * @param {*} {string} key - The key of the sound to stop from the object's sound map
   * @returns {void}
   */
  stopSound(key) {
    let sound = this.sounds[key];
    if (!sound) {
      return;
    }
    if (sound.paused) {
      return;
    }
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  /**
   * Paused all currently playing sounds and resets their time to the beginning
   * @returns {void}
   */
  stopAllSounds() {
    for (const sound of Object.values(this.sounds)) {
      if (!sound.paused) {
        sound.pause();
        sound.currentTime = 0;
      }
    }
  }

  constructor(parameters) {}
}
