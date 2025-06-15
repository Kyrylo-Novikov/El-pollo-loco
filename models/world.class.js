class World {
  character = new Character();
  level;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = [];
  throwableObject = [];
  state = "start";

  constructor(canvas, keyboard, level) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.statusBar = [
      new StatusBar(10, 0, "health", 100),
      new StatusBar(10, 40, "coin", 0),
      new StatusBar(10, 80, "bottle", 100),
    ];
    this.screen = {
      start: new Screen("start"),
      win: new Screen("win"),
      lose: new Screen("lose"),
    };
    this.level = level;
    this.draw();
    this.setWorld();
  }

  run() {
    setInterval(() => {
      //
      this.checkCollecting();
      this.checkCollisions();
      this.checkThrowObject();
      this.checkHitting();
      this.removeTheowableObjects();
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

  checkHitting() {
    this.throwableObject.forEach((throwableObject) => {
      this.level.enemies = this.level.enemies.filter((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          enemy.hit();
          throwableObject.splash();

          if (enemy.energy <= 0) {
            return false;
          }
          return true;
        }
        return true;
      });
    });
  }

  removeTheowableObjects() {
    this.throwableObject = this.throwableObject.filter((o) => !o.consumed);
  }

  checkCollecting() {
    this.level.collectibles = this.level.collectibles.filter((collectibles) => {
      if (this.character.isColliding(collectibles)) {
        if (collectibles.type === "coin") {
          this.character.collect(collectibles);
          this.statusBar[1].setPercentage(this.character.coin);
          return false;
        }
        if (collectibles.type === "bottle" && this.character.bottles < 100) {
          this.character.collect(collectibles);
          this.statusBar[2].setPercentage(this.character.bottles);
          return false;
        }
      }
      return true;
    });
  }

  checkThrowObject() {
    if (this.keyboard.D && this.character.bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 30,
        this.character.y + 100,
        this.character.otherDirection
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
    if (this.state !== "playing") {
      this.screen[this.state].draw(this.ctx);
      requestAnimationFrame(() => this.draw());
      return;
    }
    if (this.character.energy <= 0 && this.state === "playing") {
      setTimeout(() => {
        this.state = "lose";
      }, 700);
    }

    if (this.character.x >= 2700) {
      setTimeout(() => {
        this.state = "win";
      }, 500);
    }

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
