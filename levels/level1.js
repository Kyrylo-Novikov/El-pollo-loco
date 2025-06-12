const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],

  [new Cloud()],
  [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),
  ],
  [
    new Collectibles("coin", 2000, 200, 120, 120),
    new Collectibles("coin", 1700, 300, 120, 120),
    new Collectibles("coin", 200, 100, 120, 120),
    new Collectibles("coin", 400, 200, 120, 120),
    new Collectibles("coin", 1200, 300, 120, 120),
    new Collectibles("bottle", 400, 300, 120, 120),
    new Collectibles("bottle", 500, 300, 120, 120),
    new Collectibles("bottle", 1000, 300, 120, 120),
  ]
);
