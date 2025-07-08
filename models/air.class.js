/**
 * Represents a specific backgroundelement , the air.
 * unlike the ground backgroundelements, the air is positiond at the top of the canvas (y=0)
 * Inherits propertys and image loading from  {@link BackgroundObject}
 */

class Air extends BackgroundObject {
  constructor() {
    super().loadImage("img/5_background/layers/air.png");
    this.y = 0;
  }
}
