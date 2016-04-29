import scene from 'js/scene.js';
import remote from 'js/remote.js';

var updateId, isActive = false;
var names = ['Andre', 'Pierry', 'Corentin', 'Luca', 'Justine', 'Adrien', 'Mathilde', 'Guillaume', 'Giulio', 'Kelian', 'David', 'Pierre', 'Callum', 'Matthieu', 'Fabiola']
var idleAnimItv;

function setup() {
  scene.setup();
  remote.connect(onMessage);
  // launchIdleAnimation();
}

function onMessage(data) {
  clearInterval(idleAnimItv);
  if (data == 'reset') {
    scene.grid.reset();
  } else if (data == 'all') {
    scene.grid.all();
  } else {
    scene.grid.highlight(data);
  }
  update();
}

function launchIdleAnimation() {
  if (idleAnimItv) {
    clearInterval(idleAnimItv);
  }
  idleAnimItv = setInterval(function(){
    var idx = Math.floor(Math.random() * names.length);
    console.log(names[idx]);
    scene.grid.reset();
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
