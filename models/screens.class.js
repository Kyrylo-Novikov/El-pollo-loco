class Screen extends DrawableObject {
  SCREENS = {};

  width = 720;
  height = 480;
  x = 0;
  y = 0;
  img;

  constructor(type) {
    super();
    this.loadImage(this.SCREENS[type]);
  }
}
