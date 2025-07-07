class World {
  character = new Character();
  level;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  gameRunning = true;

  statusBar = [
    new StatusBar(10, 0, "health", 100),
    new StatusBar(10, 40, "coin", 0),
    new StatusBar(10, 80, "bottle", 100),
  ];
  throwableObject = [];
  gameloop;
  backgroundMusic = Object.assign(new Audio("audio/hintergrund-game.mp3"), {
    volume: 0.1,
    loop: true,
  });

  constructor(canvas, keyboard, level) {
    this.ctx = canvas.getContext("2d");
    this.gameRunning = true;
    this.paused = false;
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level;
    this.isMuted = loadMuteStatus();
    this.statusBar;
    this.backgroundMusicManager();
    // this.draw();
    this.setWorld();
    this.setWorldEnemy();
  }

  backgroundMusicManager() {
    if (this.isMuted) {
      this.backgroundMusic.pause();
      return;
    }

    this.backgroundMusic.play();
  }

  run() {
    this.gameloop = setInterval(() => {
      if (this.paused) {
        this.pause();
        return;
      }
      this.checkCollecting();
      let hasJumpAttackHit = this.jumpAttackCollision();

      if (!hasJumpAttackHit) {
        this.checkCollisions();
      }
      this.checkThrowObject();
      this.checkHitting();
      this.removeTheowableObjects();

      if (this.character.isDead()) {
        this.stopGame();
        this.gameRunning = false;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        let gemeOver = document.getElementById("overlay-game-over");
        gemeOver.classList.remove("d-none");
        this.character.playSounds("lose");
      }

      if (this.character.x >= 6500) {
        this.stopGame();
        this.gameRunning = false;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        let gemeWin = document.getElementById("overlay-win");
        gemeWin.classList.remove("d-none");
        this.character.playSounds("win");
      }
    }, 1000 / 20);
  }

  pauseOnOpenOverlay() {
    let overlays = Array.from(document.querySelectorAll(".overlay"));
    let visibleOverlay = overlays.some(
      (overlay) => !overlay.classList.contains("d-none")
    );
    if (visibleOverlay) {
      this.pause();
    } else {
      this.resume();
    }
  }

  pause() {
    this.paused = true;
    this.backgroundMusicManager();
    this.character.stopAnimation();
    this.level.enemies.forEach((enemy) => {
      enemy.stopAnimation();
    });
    this.stopAllSounds();
  }

  resume() {
    this.paused = false;
    this.backgroundMusicManager();
    this.character.animate();
    this.level.enemies.forEach((enemy) => {
      enemy.animate();
    });
  }

  stopGame() {
    this.backgroundMusic.pause();
    clearInterval(this.gameloop);
    this.character.stopAnimation();
    this.level.enemies.forEach((enemy) => {
      enemy.stopAnimation();
    });
    this.stopAllSounds();
  }

  stopAllSounds() {
    this.character.stopAllSounds();
    this.level.enemies.forEach((enemy) => {
      enemy.stopAllSounds();
    });
    this.throwableObject.forEach((throwableObject) => {
      throwableObject.stopAllSounds();
    });
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDeadStatus && this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar[0].setPercentage(this.character.energy);
      }
    });
  }

  checkHitting() {
    this.throwableObject.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          enemy.hit();
          throwableObject.splash();
          if (enemy instanceof Endboss) {
            this.statusBar[3].setPercentage(enemy.energy);
          }
        }
      });
    });
  }

  jumpAttackCollision() {
    let bounceHit = false;
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDeadStatus && this.character.isJumpColliding(enemy)) {
        enemy.hit();
        this.character.jumpTriggered = false;
        this.character.triggerBounceJump();
        bounceHit = true;
      }
    });
    return bounceHit;
  }

  removeTheowableObjects() {
    this.throwableObject = this.throwableObject.filter(
      (bottle) => !bottle.consumed
    );
  }

  checkCollecting() {
    this.level.collectibles = this.level.collectibles.filter((collectibles) => {
      if (this.character.isColliding(collectibles)) {
        if (collectibles.type === "coin") {
          this.character.collect(collectibles);
          this.character.playSounds("collect");
          this.statusBar[1].setPercentage(this.character.coin);
          return false;
        }
        if (collectibles.type === "bottle" && this.character.bottles < 100) {
          this.character.collect(collectibles);
          this.character.playSounds("collect");
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
      bottle.world = this;
      this.throwableObject.push(bottle);
      this.character.bottles -= 20;
      this.statusBar[2].setPercentage(this.character.bottles);
    }
  }

  setWorld() {
    this.character.world = this;
  }

  setWorldEnemy() {
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  draw() {
    if (!this.gameRunning) {
      return;
    }
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
    // this.world.level.enemies. new StatusBar(200, 0, "boss", 100);
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
    // movebalObject.drawFrame(this.ctx);
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
