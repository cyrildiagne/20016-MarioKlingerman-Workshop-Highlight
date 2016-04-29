import scene from 'js/scene.js';

var updateId, isActive = false;

function setup() {
  scene.setup();
  setInterval(function(){
    if (Math.random() < 0.02) {
      scene.grid.randomHighlight();
      update();
    }
  }, 100);
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
