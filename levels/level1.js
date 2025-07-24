/** Creats and returns the first level of the game
 * Contains a predefined set of enemies, clouds, background objects and items.
 * Used to initialize gameplay elements when level 1 starts.
 * @returns A Level instance with all objects needed for Level 1.
 */

function level1() {
  return new Level(
    [
      new Chicken(400 + Math.random() * 1500),
      new Chicken(500 + Math.random() * 1500),
      new Chicken(600 + Math.random() * 1500),
      new Chicken(2500 + Math.random() * 1500),
      new Chicken(3100 + Math.random() * 1500),
      new Chicken(3700 + Math.random() * 1500),
      new SmallChicken(1000 + Math.random() * 1500),
      new SmallChicken(2400 + Math.random() * 1500),
      new SmallChicken(1500 + Math.random() * 1500),
      new SmallChicken(2600 + Math.random() * 1500),
      new SmallChicken(2000 + Math.random() * 1500),

      new Chicken(4000 + Math.random() * 1500),
      new Chicken(5000 + Math.random() * 1500),
      new Chicken(6000 + Math.random() * 1500),
      new Chicken(4500 + Math.random() * 1500),
      new Chicken(5100 + Math.random() * 1500),
      new Chicken(4700 + Math.random() * 1500),

      new SmallChicken(6000 + Math.random() * 1500),
      new SmallChicken(6200 + Math.random() * 1500),
      new SmallChicken(6300 + Math.random() * 1500),
      new SmallChicken(6500 + Math.random() * 1500),
      new SmallChicken(5000 + Math.random() * 1500),
      new Endboss(),
    ],

    [
      new Cloud(50),
      new Cloud(700 * 1.2),
      new Cloud(700 * 2.4),
      new Cloud(700 * 4),
      new Cloud(700 * 5.4),
      new Cloud(700 * 6.8),
      new Cloud(700 * 7.9),
      new Cloud(700 * 9),
    ],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719
      ),
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
      new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 4
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 5
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 6),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 6
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 6
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 6
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 7),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 7
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 7
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 7
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 8),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 8
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 8
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 8
      ),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 9),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 9
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 9
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 9
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 10),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 10
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 10
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 10
      ),
    ],
    [
      new Collectibles("coin", -200, 160, 120, 120),
      new Collectibles("coin", -200, 200, 120, 120),
      new Collectibles("coin", -200, 240, 120, 120),
      new Collectibles("bottle", -180, 320, 80, 100),
      new Collectibles("coin", 1700, 300, 120, 120),
      new Collectibles("coin", 140, 70, 120, 120),
      new Collectibles("coin", 200, 100, 120, 120),
      new Collectibles("coin", 270, 130, 120, 120),
      new Collectibles("coin", 340, 170, 120, 120),
      new Collectibles("coin", 700, 160, 120, 120),
      new Collectibles("coin", 600, 240, 120, 120),
      new Collectibles("coin", 600, 160, 120, 120),
      new Collectibles("coin", 700, 240, 120, 120),
      new Collectibles("coin", 1200, 180, 120, 120),
      new Collectibles("coin", 1250, 180, 120, 120),
      new Collectibles("coin", 1300, 180, 120, 120),
      new Collectibles("coin", 2150, 240, 120, 120),
      new Collectibles("coin", 2100, 300, 120, 120),
      new Collectibles("coin", 2200, 240, 120, 120),
      new Collectibles("coin", 2250, 300, 120, 120),
      new Collectibles("coin", 2300, 240, 120, 120),
      new Collectibles("coin", 2400, 300, 120, 120),
      new Collectibles("coin", 2350, 240, 120, 120),
      new Collectibles("coin", 3000, 320, 120, 120),
      new Collectibles("coin", 3080, 250, 120, 120),
      new Collectibles("coin", 3160, 180, 120, 120),
      new Collectibles("coin", 3240, 180, 120, 120),
      new Collectibles("coin", 3320, 250, 120, 120),
      new Collectibles("coin", 3400, 320, 120, 120),
      new Collectibles("coin", 4200, 180, 120, 120),
      new Collectibles("coin", 4200, 240, 120, 120),
      new Collectibles("coin", 4200, 300, 120, 120),
      new Collectibles("coin", 4400, 220, 120, 120),
      new Collectibles("coin", 4400, 170, 120, 120),
      new Collectibles("coin", 4400, 120, 120, 120),
      new Collectibles("coin", 4600, 180, 120, 120),
      new Collectibles("coin", 4600, 240, 120, 120),
      new Collectibles("coin", 4600, 300, 120, 120),
      new Collectibles("coin", 5800, 140, 120, 120),
      new Collectibles("coin", 5900, 140, 120, 120),
      new Collectibles("coin", 6000, 140, 120, 120),
      new Collectibles("bottle", 1216, 340, 80, 100),
      new Collectibles("bottle", 1266, 340, 80, 100),
      new Collectibles("bottle", 1316, 340, 80, 100),
      new Collectibles("bottle", 400, 340, 80, 100),
      new Collectibles("bottle", 500, 340, 80, 100),
      new Collectibles("bottle", 5400, 340, 80, 100),
      new Collectibles("bottle", 5500, 340, 80, 100),
      new Collectibles("bottle", 1000, 340, 80, 100),
      new Collectibles("bottle", 3900, 340, 80, 100),
      new Collectibles("bottle", 4000, 340, 80, 100),
      new Collectibles("bottle", 4100, 340, 80, 100),
    ]
  );
}
