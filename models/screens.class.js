class Screen extends DrawableObject {
  SCREENS = {
    start: "img/9_intro_outro_screens/start/startscreen_1.png",
    win: "img/You won, you lost/You Win A.png",
    lose: "img/You won, you lost/Game Over.png",
  };

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
