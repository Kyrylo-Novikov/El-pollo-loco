let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
}

function startTheGame() {
  if (world) {
    world.stopGame();
  }
  let level = level1();
  world = new World(canvas, keyboard, level);
  setTimeout(() => {
    hiddeOverlays();
    world.run();
  }, 500);
}

function backToStart() {
  hiddeOverlays();
  let startOverlay = document.getElementById("overlay-start");
  startOverlay.classList.remove("d-none");
}

function hiddeOverlays() {
  let overlays = document.querySelectorAll(".overlay");
  overlays.forEach((overlay) => {
    overlay.classList.add("d-none");
  });
}

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    keyboard.UP = true;
  }
  if (event.code === "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (event.code === "Space") {
    keyboard.SPACE = true;
  }
  if (event.code === "KeyD") {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.code === "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.code === "Space") {
    keyboard.SPACE = false;
  }
  if (event.code === "KeyD") {
    keyboard.D = false;
  }
});

function openFullscreen() {
  let canvas = document.getElementById("canvas");
  if (canvas.requestFullscreen()) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen()) {
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen()) {
    canvas.msRequestFullscreen();
  } else if (canvas.mozRequestFullScreen()) {
    canvas.mozRequestFullScreen();
  }
}
