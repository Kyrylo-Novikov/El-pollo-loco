class SmallChicken extends Chicken {
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  sounds = {
    standard: new Audio("audio/small-chicken-noise_dMEMJDpb.mp3"),
    dead: new Audio("audio/chicken_dead.mp3"),
  };

  height = 80;
  width = 60;
  y = 350;
  constructor(parameters) {
    super(), this.loadImage(this.IMAGE_DEAD);
    this.loadImages(this.IMAGES_WALKING);
  }
}
