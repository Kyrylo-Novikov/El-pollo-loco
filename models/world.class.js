class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = [];
  throwableObject = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.statusBar = [
      new StatusBar(10, 0, "health"),
      new StatusBar(10, 40, "coin"),
      new StatusBar(10, 80, "bottle"),
    ];
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setInterval(() => {
      //
      this.checkCollecting();
      this.checkCollisions();
      this.checkThrowObject();
    }, 100);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar[0].setPercentage(this.character.energy);
      }
    });
  }

  checkCollecting() {
    this.level.collectibles.forEach((collectibles) => {
      if (this.character.isColliding(collectibles)) {
        this.character.collect();
        this.statusBar[1].setPercentage(this.character.coin);
        // collect
      }
    });
  }

  checkThrowObject() {
    if (this.keyboard.D && this.character.bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 30,
        this.character.y + 100
      );
      this.throwableObject.push(bottle);
      this.character.bottles -= 20;
      this.statusBar[2].setPercentage(this.character.bottles);
    }
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObject);
    this.addObjectToMap(this.level.collectibles);
    this.addObjectToMap(this.level.clouds);

    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);

    this.addObjectToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0);
    // Space for fixed  objects --------
    this.statusBar.forEach((bar) => {
      this.addToMap(bar);
    });
    this.ctx.translate(this.camera_x, 0);

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
