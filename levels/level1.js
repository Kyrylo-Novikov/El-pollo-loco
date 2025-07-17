/** Creats and returns the first level of the game
 * Contains a predefined set of enemies, clouds, background objects and items.
 * Used to initialize gameplay elements when level 1 starts.
 * @returns A Level instance with all objects needed for Level 1.
 */

function level1() {
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
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
      new Collectibles("coin", 2000, 200, 120, 120),
      new Collectibles("coin", 1700, 300, 120, 120),
      new Collectibles("coin", 200, 100, 120, 120),
      new Collectibles("coin", 400, 200, 120, 120),
      new Collectibles("coin", 1200, 300, 120, 120),
      new Collectibles("bottle", 400, 340, 80, 100),
      new Collectibles("bottle", 500, 340, 80, 100),
      new Collectibles("bottle", 1000, 340, 80, 100),
    ]
  );
}
