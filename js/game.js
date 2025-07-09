let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the canvas element and mute staus when the application starts.
 */
function init() {
  canvas = document.getElementById("canvas");
  initMuteStatus();
}

/**
 * Loads the level and creats a new world for a game.
 * If a world are already exists, it stop it first.
 * Then hides overlays and starts the draw and run loops of the world  after a 1 second delay.
 */
function startTheGame() {
  if (world) {
    world.stopGame();
  }
  let level = level1();
  world = new World(canvas, keyboard, level);
  setTimeout(() => {
    hideOverlays();
    world.draw();
    world.run();
  }, 1000);
}

/**
 * Hides all overlay elements ,then showing the start overlay.
 */
function backToStart() {
  hideOverlays();
  let startOverlay = document.getElementById("overlay-start");
  startOverlay.classList.remove("d-none");
}

/**
 * Hides all overlay elements by adding the "d-none" class
 */
function hideOverlays() {
  const overlays = document.querySelectorAll(".overlay");
  overlays.forEach((overlay) => {
    overlay.classList.add("d-none");
  });
}

/**
 * load the mute status from localStorage, toggle it, save the new status ,
 * update the button style and controls the sound behavior.
 */
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

/**
 * load the mute status form localStorage and style the button.
 */
function initMuteStatus() {
  let isMuted = loadMuteStatus();
  muteBtnStyle(isMuted);
}

/**
 * Toggles the style based on the mute status
 * @param {boolean} isMuted - Indicates whether the sound is muted
 */
function muteBtnStyle(isMuted) {
  let muteBtn = document.getElementById("mute-btn");
  muteBtn.classList.toggle("muted", isMuted);
  muteBtn.classList.toggle("aktivBtn", isMuted);
}

/**
 * Saves the mute status in localStorage
 * @param {boolean} isMuted - Indicates whether the sound is muted
 */
function saveMuteStatus(isMuted) {
  localStorage.setItem("muteStatus", JSON.stringify(isMuted));
}

/**
 * Loads from the localStorage whether the sound is muted
 * @returns true if muted, false otherwise.
 */
function loadMuteStatus() {
  let savedStatus = localStorage.getItem("muteStatus");
  return savedStatus ? JSON.parse(savedStatus) : false;
}

/**
 * Listen on pressed keys in the window and set the key flag to true
 * @listens window#keydown
 * @param {KeyboardEvent} event - The keydowm event triggered by the user pressing a key
 */
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

/**
 * Listen on realeased keys on the window and sets the key flag to false.
 * @listens window#keyup
 * @param {KeyboardEvent} event - The keyup event triggered by the user released a key
 */
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

/**
 * toggles fullscrenn:
 * - enters fullscreen if no element is currently fullscreen
 * - exits fullscreen if an element is already fullscreen
 */
function fullscreenView() {
  if (!document.fullscreenElement) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
}

/**
 * Enters fullscreen
 */
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

/**
 * Exits the fullscreen
 */
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

/**
 * Styles the button and overlays so they displayed correctly in fullscreen
 */
function styleFullscreen() {
  let btn = document.querySelectorAll(".main-btn");
  btn[0].classList.add("aktivBtn");
  let screens = document.querySelectorAll(".screen");
  screens.forEach((screnn) => {
    screnn.classList.add("fullscreens");
  });
}

/**
 * Removes the style of the button and the overlays so they displayed correctly when fullscrenn is exited
 */
function removeStyleFullscreen() {
  let btn = document.querySelectorAll(".main-btn");
  btn[0].classList.remove("aktivBtn");
  let screens = document.querySelectorAll(".screen");
  screens.forEach((screnn) => {
    screnn.classList.remove("fullscreens");
  });
}

/**Listens for changes in fullscreen status updates style */
addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    styleFullscreen();
  } else {
    removeStyleFullscreen();
  }
});

/**
 * Toggled the visibility of the menu overlay ,changesthe button style and pauses the world if it exists.
 * @param {string} id - id of the menu overlay to toggle
 * @param {string} btnID - id of the button to toggle
 */
function toggleOverlay(id, btnID) {
  let elementToShow = document.getElementById(`${id}`);
  let presstBtn = document.getElementById(`${btnID}`);
  if (!restartOverlay(id)) return;
  presstBtn.classList.toggle("aktivBtn");
  elementToShow.classList.toggle("d-none");
  toggleControlMenu(id);
  if (world) {
    world.pauseOnOpenOverlay();
  }

  /**
   * Toggles overlay to display flex if it's the controls-menu
   * @param {string} id - id of the menu overlay to toggle
   */
  function toggleControlMenu(id) {
    if (id === "controls-menu") {
      elementToShow.classList.toggle("d-flex");
    }
  }

  /**
   *Checks whether all other overlay elements (expect the given)  are hidden
   * @param {string} id - The id of the menu overlay to check
   * @returns {boolean} True if all other overlay elements have the class "d-none"
   */
  function restartOverlay(id) {
    if (id === "overlay-game-restart") {
      let overlays = Array.from(document.querySelectorAll(".overlay")).filter(
        (overlay) => overlay.id != id
      );
      let allHidden = overlays.every((overlay) =>
        overlay.classList.contains("d-none")
      );
      return allHidden;
    }
    return true;
  }
}
