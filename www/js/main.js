import scene from 'js/scene.js';

var updateId, isActive = true;

function setup() {
  scene.setup();
  update();
}

function update() {
  if (isActive) {
    updateId = window.requestAnimationFrame(update);
  }
  scene.render();
}

function activate() {
  if (isActive) return;
  isActive = true;
  update();
}

function deactivate() {
  if (!isActive) return;
  isActive = false;
  window.cancelAnimationFrame(updateId);
}


setup();
