/**
 * The game world include character , level ,HUD and logic
 */
class World {
  /** @type {Character} The character of the game*/
  character = new Character();
  /** @type {Object} The current level */
  level;
  /** @type {HTMLCanvasElement} The canvas where the game is randered*/
  canvas;
  /** @type {CanvasRenderingContext2D} The canvas 2D rendering context */
  ctx;
  /** @type {Object} Keyboard input controller*/
  keyboard;
  /** @type {number} Camara offset */
  camera_x = 0;
  /** @type {boolean} Controls whether the game is running */
  gameRunning = true;
  /** @type {StatusBar} HUD status bars for health, coins, bottles */
  statusBar = [
    new StatusBar(10, 0, "health", 100),
    new StatusBar(10, 40, "coin", 0),
    new StatusBar(10, 80, "bottle", 100),
  ];

  /**@type {Object[]} An Array of throwable object (bottles)*/
  throwableObject = [];
  /** @type {number} the interval ID used inside the run() function*/
  gameloop;
  /** @type {HTMLAudioElement} Background music with volume and loop settings */
  backgroundMusic = Object.assign(new Audio("audio/hintergrund-game.mp3"), {
    volume: 0.1,
    loop: true,
  });

  /**
   * Creates a new game world with canvas ,keyboard and level
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas where the game is randered
   * @param {Object} keyboard - The input controller
   * @param {Object} level - The current level
   */
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

  /**
   * Plays the background music if not muted otherwise paused the background music
   * @returns {void}
   */
  backgroundMusicManager() {
    if (this.isMuted) {
      this.backgroundMusic.pause();
      return;
    }
    this.backgroundMusic.play();
  }

  /**
   * Start the game logic.
   * Checks collisions , hits and the end conditions if the game is not paused.
   */
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
      this.endConditions();
    }, 1000 / 20);
  }

  /**
   * Checks whether win or lose conditions are met and triggers the game behavior.
   */
  endConditions() {
    if (this.character.isDead()) {
      this.gameBehaviorOnDead();
    }
    if (this.character.x >= 6500) {
      this.gameBehaviorOnWin();
    }
  }

  /**
   * Stops the game, draws the canvas black.
   */
  canvasAfterGame() {
    this.stopGame();
    this.gameRunning = false;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Stops the game, draws the canvas black , shows the game-over overlay and plays the lose sound
   */
  gameBehaviorOnDead() {
    this.canvasAfterGame();
    let gameOver = document.getElementById("overlay-game-over");
    gameOver.classList.remove("d-none");
    this.character.playSounds("lose");
  }

  /**
   * Stops the game, draws the canvas black , shows the win overlay and plays the win sound
   */
  gameBehaviorOnWin() {
    this.canvasAfterGame();
    let gameWin = document.getElementById("overlay-win");
    gameWin.classList.remove("d-none");
    this.character.playSounds("win");
  }

  /**
   * Paused the game if any overlay are visible otherweise resume the game
   */
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

  /**
   * Paused all sounds including background music and stops the animations of the character and enemies.
   */
  pause() {
    this.paused = true;
    this.backgroundMusicManager();
    this.character.stopAnimation();
    this.level.enemies.forEach((enemy) => {
      enemy.stopAnimation();
    });
    this.stopAllSounds();
  }

  /**
   * Resumes all sounds including background music and start the animations of the character and enemies.
   */
  resume() {
    this.paused = false;
    this.backgroundMusicManager();
    this.character.animate();
    this.level.enemies.forEach((enemy) => {
      enemy.animate();
    });
  }

  /**
   * Pauses all sounds including background music, stops the animations of the character, enemies and clears the game loop.
   */
  stopGame() {
    this.pause();
    this.backgroundMusic.pause();
    clearInterval(this.gameloop);
  }

  /**
   * Stops all sound for character, enemies and throwable objects.
   */
  stopAllSounds() {
    this.character.stopAllSounds();
    this.level.enemies.forEach((enemy) => {
      enemy.stopAllSounds();
    });
    this.throwableObject.forEach((throwableObject) => {
      throwableObject.stopAllSounds();
    });
  }

  /**
   * Checks whethear a living enemy colliding with the character, if yes,  the character take a hit and the energy status bar updates
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDeadStatus && this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar[0].setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks whether a throwable object colliding with a enemy.
   * If yes, the enemy take a hit and the throwable objext triggers a splash animation.
   * If the enemy is the Endboss, the energy status bar updates after the hit.
   */
  checkHitting() {
    this.throwableObject.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          enemy.hit();
          throwableObject.splash();
          setTimeout(() => {
            throwableObject.consumed = true;
          }, 100);
          if (enemy instanceof Endboss) {
            this.statusBar[3].setPercentage(enemy.energy);
          }
        }
      });
    });
  }

  /**
   * Checks whether the character colliding with a living enemy from above.
   * If yes,the enemy takes a hit and the character trigger a bounce jump.
   * @returns {boolean} True if the bounce hit occurred, otherwise false
   */

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

  /**
   * Removes thrown throwable object that habe been consumed/used
   */
  removeTheowableObjects() {
    this.throwableObject = this.throwableObject.filter(
      (bottle) => !bottle.consumed
    );
  }

  /**
   * Removes collected coins or bottles from the collectibles array if colliding with collectibles
   */
  checkCollecting() {
    this.level.collectibles = this.level.collectibles.filter((collectibles) => {
      if (this.character.isColliding(collectibles)) {
        if (!this.collectCoin(collectibles)) return false;
        if (!this.collectBottle(collectibles)) return false;
      }
      return true;
    });
  }

  /**If the collectible type is "coin" , collect it.
   * Plays a collect sound and updates the status bar for coin
   * @param {Object} collectibles - The collectible to check
   * @returns {boolean} False if collected , otherwise true
   */
  collectCoin(collectibles) {
    if (collectibles.type === "coin") {
      this.character.collect(collectibles);
      this.character.playSounds("collect");
      this.statusBar[1].setPercentage(this.character.coin);
      return false;
    }
    return true;
  }

  /**If the collectible type is "bottle" and the character have under 100-bottle , collect it.
   * Plays a collect sound and updates the status bar for bottles
   * @param {Object} collectibles - The collectible to check
   * @returns {boolean} False if collected , otherwise true
   */
  collectBottle(collectibles) {
    if (collectibles.type === "bottle" && this.character.bottles < 100) {
      this.character.collect(collectibles);
      this.character.playSounds("collect");
      this.statusBar[2].setPercentage(this.character.bottles);
      return false;
    }
    return true;
  }

  /**
   * Creates a new ThrowableObject if "D" is pressed and the charackter have more than 0 bottles.
   * Reduce the bottle count by 20 and updates the bottle status bar.
   */
  checkThrowObject() {
    if (
      this.keyboard.D &&
      this.character.bottles > 0 &&
      !this.character.throwTriggered
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 30,
        this.character.y + 100,
        this.character.otherDirection
      );
      bottle.world = this;
      this.throwableObject.push(bottle);
      this.character.throwTriggered = true;
      this.character.bottles -= 20;
      this.statusBar[2].setPercentage(this.character.bottles);
    }
  }

  /**
   * Gives the character a reference to the current world
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Gives every enemy a reference to the current world
   */
  setWorldEnemy() {
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Draws the game world with all objects, background, clouds, collectibles, enemies, the character, throwable objects and all status bars on the canvas.
   * Round about 60 times per second.
   * @returns {void}
   */
  draw() {
    if (!this.gameRunning) {
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addAllObjectsToMap();
    this.ctx.translate(-this.camera_x, 0);
    // Space for fixed  objects --------
    this.statusBar.forEach((bar) => {
      this.addToMap(bar);
    });
    requestAnimationFrame(() => this.draw());
  }

  /**
   *Rendered all movable objects,background ,clouds, collectibles, throwable objects and enemies
   @return {void}
   */
  addAllObjectsToMap() {
    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.collectibles);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.throwableObject);
    this.addToMap(this.character);
  }

  /**
   *Added every given Object to game
   * @param {Object[]} objects - Array of objects for add to the map.
   */
  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws the given movabal object on the canvas
   * If the object have "otherdirection" set , flips the canvas to draw it facing the other way
   * @param {Object} movableObject - The object to drawn
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);
    this.ctx.stroke();
    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  /**
   *Saves the current canvas state, move the canvas flips the canvas horizontally and mirror the object`s x-position.
   Used to draw objects facing the opposite direction.
   * @param {Object} movableObject - The object to drawn mirrored
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Restores the mirrored x-position of the object and resets the canvas
   * Used after drawing an object that was flipped to the other direction
   * @param {Object} movableObject - The object that was drawn  mirrored.
   */
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}
