class World {
  character = new Character();
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObject = level1.backgroundObject;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.backgroundObject);
    this.addObjectToMap(this.clouds);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);

    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(movebalObject) {
    if (movebalObject.otherDirection) {
      this.ctx.save();
      this.ctx.translate(movebalObject.width, 0);
      this.ctx.scale(-1, 1);
      movebalObject.x = movebalObject.x * -1;
    }
    this.ctx.drawImage(
      movebalObject.img,
      movebalObject.x,
      movebalObject.y,
      movebalObject.width,
      movebalObject.height
    );
    if (movebalObject.otherDirection) {
      movebalObject.x = movebalObject.x * -1;
      this.ctx.restore();
    }
  }
}
