class World {
  character = new Character();
  level = level1;
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
    this.checkCollisions();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();

          console.log("ist collediert", this.character.energy);
        }
      });
    }, 100);
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObject);
    this.addObjectToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);

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
      this.flipImage(movebalObject);
    }
    movebalObject.draw(this.ctx);
    movebalObject.drawFrame(this.ctx);
    this.ctx.stroke();
    if (movebalObject.otherDirection) {
      this.flipImageBack(movebalObject);
    }
  }

  flipImage(movebalObject) {
    this.ctx.save();
    this.ctx.translate(movebalObject.width, 0);
    this.ctx.scale(-1, 1);
    movebalObject.x = movebalObject.x * -1;
  }

  flipImageBack(movebalObject) {
    movebalObject.x = movebalObject.x * -1;
    this.ctx.restore();
  }
}
