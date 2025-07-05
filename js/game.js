let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  initMuteStatus();
}

function startTheGame() {
  if (world) {
    world.stopGame();
  }
  let level = level1();
  world = new World(canvas, keyboard, level);
  setTimeout(() => {
    hiddeOverlays();
    world.draw();
    world.run();
  }, 1000);
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

function muteBtn() {
  let isMuted = loadMuteStatus();
  isMuted = !isMuted;
  saveMuteStatus(isMuted);
  muteBtnStyle(isMuted);
  if (world) {
    world.isMuted = isMuted;
    world.backgroundMusicManager();
    if (!isMuted) {
      world.backgroundMusic.play();
    }
    if (isMuted) {
      world.stopAllSounds();
    }
  }
}

function initMuteStatus() {
  let isMuted = loadMuteStatus();
  muteBtnStyle(isMuted);
}

function muteBtnStyle(isMuted) {
  let muteBtn = document.getElementById("mute-btn");
  muteBtn.classList.toggle("muted", isMuted);
  muteBtn.classList.toggle("aktivBtn", isMuted);
}

function saveMuteStatus(isMuted) {
  localStorage.setItem("muteStatus", JSON.stringify(isMuted));
}

function loadMuteStatus() {
  let savedStatus = localStorage.getItem("muteStatus");
  return savedStatus ? JSON.parse(savedStatus) : false;
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

function fullscreenView() {
  if (!document.fullscreenElement) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
}

function openFullscreen() {
  let gameContainer = document.getElementById("game-container");
  if (gameContainer.requestFullscreen) {
    gameContainer.requestFullscreen();
  } else if (gameContainer.webkitRequestFullscreen) {
    gameContainer.webkitRequestFullscreen();
  } else if (gameContainer.msRequestFullscreen) {
    gameContainer.msRequestFullscreen();
  } else if (gameContainer.mozRequestFullScreen) {
    gameContainer.mozRequestFullScreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozExitFullscreen) {
    document.mozExitFullscreen();
  }
}

function styleFullscreen() {
  let btn = document.querySelectorAll(".main-btn");
  btn[0].classList.add("aktivBtn");
  let screens = document.querySelectorAll(".screen");
  screens.forEach((screnn) => {
    screnn.classList.add("fullscreens");
  });
}

function removeStyleFullscreen() {
  let btn = document.querySelectorAll(".main-btn");
  btn[0].classList.remove("aktivBtn");
  let screens = document.querySelectorAll(".screen");
  screens.forEach((screnn) => {
    screnn.classList.remove("fullscreens");
  });
}

addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    styleFullscreen();
  } else {
    removeStyleFullscreen();
  }
});
function toggleControlMenu(id) {
  let elementToShow = document.getElementById(`${id}`);
  elementToShow.classList.toggle("d-none");
  elementToShow.classList.toggle("d-flex");
  let btn = document.querySelectorAll(".main-btn");
  btn[2].classList.toggle("aktivBtn");
  if (world) {
    world.pauseOnOpenOverlay();
  }
}
