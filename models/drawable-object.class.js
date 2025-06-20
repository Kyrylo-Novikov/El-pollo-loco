class DrawableObject {
  img;
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
  otherDirection = false;

  //   loadImage('img/test.png')
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Collectibles ||
      this instanceof ThrowableObject
    ) {
      let hitbox = this.hitbox();
      let x = hitbox.x;
      let y = hitbox.y;
      let width = hitbox.width;
      let height = hitbox.height;
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(x, y, width, height);
      ctx.stroke();
    }
  }

  hitbox() {
    return {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.top - this.offset.bottom,
    };
  }

  playSounds(key) {
    let sound = this.sounds[key];
    sound.play();
    if (!sound) return;
    if (!sound.paused) {
      return;
    }
    sound.currentTime = 0;
    sound.play();
  }

  stopSound(key) {
    let sound = this.sounds[key];
    if (!sound) {
      return;
    }
    if (sound.paused) {
      return;
    }
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  constructor(parameters) {}
}
