/**
 * Represents the StatusBar that iherents all propertys and methods from DrawableObject
 */

class StatusBar extends DrawableObject {
  /**
   * @type {{[key:string]: string[]}} Arrays with file paths for differente status bars based on state/type
   */
  STATUS_BARS = {
    health: [
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    ],
    coin: [
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ],
    bottle: [
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    ],
    boss: [
      "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ],
  };

  /**
   * Creates a StatusBar object based on its type (health, coin, bottle, boss)
   * @param {number} x - Horizontal positon in pixels (x)
   * @param {number} y - Vertical positon in pixels (y)
   * @param {'health'|'coin'|'bottle'|'boss'} typ - Type of the status bar , used to select the correct file pahts
   * @param {number} startValue - Initial value of the status bar (0 - 100)
   * @constructor
   */
  constructor(x, y, typ, startValue) {
    super();
    this.imgArray = this.STATUS_BARS[typ];
    this.loadImages(this.imgArray);
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 60;
    this.setPercentage(startValue);
  }

  /**
   * Selects the correct image for the current percentage
   * @param {number} percentage - A value (0 - 100 ) for calculating the correct index to select the right path
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imgArray[this.imageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the correct image (0 - 5) based on the current percentage.
   * @returns Index for the correct frame
   */
  imageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
