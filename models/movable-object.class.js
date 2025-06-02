class Movableobject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;

  //   loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  animate(speed) {
    setInterval(() => {
      this.x -= speed;
    }, 1000 / 60);
  }

  moveRight() {
    console.log("Moving right");
  }
  moveLeft() {}
}
