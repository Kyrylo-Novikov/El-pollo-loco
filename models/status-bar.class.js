class StatusBar extends DrawableObject {
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
  };
  x;
  y;
  imgArray;
  percentage = 100;

  constructor(x, y, typ) {
    super();
    this.imgArray = this.STATUS_BARS[typ];
    this.loadImages(this.imgArray);
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * anhaltspunk gestern(07.06.2025)
   * @param {*} percentage
   */

  // setPercentage(50)
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 .....5
    let path = this.imgArray[this.imageIndex()];
    this.img = this.imageCache[path];
  }
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
