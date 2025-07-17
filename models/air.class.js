/**
 * Represents a specific backgroundelement , the air.
 * unlike the ground backgroundelements, the air is positiond at the top of the canvas (y=0)
 * Inherits propertys and image loading from  {@link BackgroundObject}
 */

class Air extends BackgroundObject {
  /**
   * Loads the image and sets the vertical position on 0
   * @constructor
   */
  constructor() {
    super().loadImage("img/5_background/layers/air.png");
    this.y = 0;
  }
}
