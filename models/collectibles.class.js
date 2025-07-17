/**
 * Represents a Collectible item
 * Inherits all informations from DrawableObject{@link DrawableObject}
 */

class Collectibles extends DrawableObject {
  /** @type {string[]} Array of file paths for the coin images */
  IMAGE_COIN = ["img/8_coin/coin_1.png"];
  /** @type {string[]} Array of file paths for the bottle images */
  IMAGE_BOTTLE = ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];
  /** @type {number} Width in pixels */
  width = 120;
  /** @type {number} Height in pixels */
  height = 120;
  /** @type {{[key:string]:HTMLAudioElement}} Audio element for the collectible interactions*/
  sound = {
    take: new Audio("audio/take-collectibles.mp3"),
  };

  /**
   * Creates a collectible
   * @param {'coin'|'bottle'} type - Defines the type of the collactible and sets the correct image and offset.
   * @param {number} x - Horizontal position in pixels.
   * @param {number} y - Vertical position in pixels.
   * @param {number} w - Width in pixels.
   * @param {number} h - Height in pixels.
   */
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
