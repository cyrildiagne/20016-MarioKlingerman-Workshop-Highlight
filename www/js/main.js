import scene from 'js/scene.js';

var updateId, isActive = false;
var names = ['Andre', 'Pierry', 'Corentin', 'Luca', 'Justine', 'Adrien', 'Mathilde', 'Guillaume', 'Giulio', 'Kelian', 'David', 'Pierre', 'Callum', 'Matthieu', 'Fabiola']

function setup() {
  scene.setup();
  setInterval(function(){
    var idx = Math.floor(Math.random() * names.length);
    console.log(names[idx]);
    scene.grid.highlight(names[idx]);
    update();
  }, 5000);
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
