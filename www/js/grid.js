import data from 'js/data.js';
import settings from  'js/settings.js';

var sprites = [];
var mesh;
var loadCallback;

function setup(cb) {
  loadCallback = cb;
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load("res/highlight.png", onTextureLoaded);
}

function onTextureLoaded(texture) {
  var geometry = new THREE.Geometry();

  for ( var i = 0; i < data.items.length; i++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = data.items[i].position.x;
		vertex.y = data.items[i].position.y;
		vertex.z = 0;
    vertex.item = data.items[i];
		geometry.vertices.push(vertex);
    // vertex colors
    var color = new THREE.Color();
    color.setHSL(0, 0, 1);
    geometry.colors.push(color);
  }

  var material = new THREE.PointsMaterial( {
    map: texture,
    size: settings.itemSize,
    transparent: true,
    vertexColors: THREE.VertexColors
  });
	mesh = new THREE.Points(geometry, material);

  if (loadCallback) {
    loadCallback(mesh);
    loadCallback = null;
  }
}

function reset() {
  if (!mesh) return;
  for (var i = 0; i < mesh.geometry.colors.length; i++) {
    var color = mesh.geometry.colors[i];
    color.setHSL( 0, 0, 0 );
  }
  mesh.geometry.colorsNeedUpdate = true;
}

function randomHighlight() {
  if (!mesh) return;
  for (var i = 0; i < mesh.geometry.colors.length; i++) {
    var color = mesh.geometry.colors[i];
    if (Math.random() < 0.1) {
      color.setHSL( 0, 0, 1 );
    } else {
      color.setHSL( 0, 0, 0 );
    }
  }
  mesh.geometry.colorsNeedUpdate = true;
}

function highlight(filter) {
  if (!mesh) return;

  filter = filter.split('.')[0];
  for (var i = 0; i < mesh.geometry.vertices.length; i++) {
    var vertex = mesh.geometry.vertices[i];
    var item = vertex.item;
    var color = mesh.geometry.colors[i];
    var id = item.id.split('.')[0];
    if (id.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
      color.setHSL(0, 0, 1);
    }
  }
  mesh.geometry.colorsNeedUpdate = true;
}

export default {
  setup,
  randomHighlight,
  highlight,
  reset
}
