/**
 * Represents the Cloud with all informations from Movableobject
 */
class Cloud extends Movableobject {
  /** Vertical position (y) */
  y = 0;
  /**Height in pixel */
  height = 400;
  /** Width in pixel */
  width = 720;
  /**Movement speed of the cloud */
  speed = 0.5;

  /**
   * Creates a cloud at a specific horizontal position (x) and start the animation.
   * @param {number} x - The initial horizontal position of the cloud (x)
   */
  constructor(x) {
    super().loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = x;
    this.animate();
  }

  /**
   * Moves the cloud to left side
   */
  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 20);
  }
}
