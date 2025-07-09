/** Represents all background objects with with all information from Movableobject */
class BackgroundObject extends Movableobject {
  /**@type {number} Object width in pixel */
  width = 720;
  /**@type {number} Object height in pixel */
  height = 480;

  /**
   * Sets the background  and its horizontal position
   * @constructor
   * @param {string} imagePath - The file path to the background image
   * @param {number} x - Sets the horizontal position
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
