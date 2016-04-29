import grid from 'js/grid.js';

var scene, camera, renderer;
var mappingScene, mappingCamera, fbo;

var INPUT_WIDTH = 1280;
var INPUT_HEIGHT = 800 * 3;

function setup() {
  var w = window.innerWidth;
	var h = window.innerHeight;
	mappingCamera = new THREE.OrthographicCamera(-w/2, w/2, h/2, -h/2, 1, 1000);
	mappingCamera.position.z = 10;

	camera = new THREE.OrthographicCamera(-INPUT_WIDTH/2, INPUT_WIDTH/2, INPUT_HEIGHT/2, -INPUT_HEIGHT/2, 1, 1000);
	camera.position.z = 10;

  // create FBO
  createFBO();

  // create mapping scene
	mappingScene = new THREE.Scene();
  createMappingMesh();

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

  // setup mesh grid
  grid.setup((mesh) => scene.add(mesh));

	// load debug texture
	var textureLoader = new THREE.TextureLoader();
	textureLoader.load("res/grid.png", onDebugTextureLoaded);

  // look for resize event
	window.addEventListener('resize', onWindowResize, false);

  render();
}

function createFBO() {
  scene = new THREE.Scene();
  fbo = new THREE.WebGLRenderTarget(INPUT_WIDTH, INPUT_HEIGHT, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.NearestFilter
  });
}

function createMappingMesh() {
  for (var i = 0; i < 3; i++) {
    var planeWidth = window.innerWidth / 3;
    var geometry = new THREE.PlaneGeometry(planeWidth, window.innerHeight, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: fbo
    });

    var u = 1, v = 1 / 3;
    var uvs = geometry.faceVertexUvs[0];
    uvs[ 0 ][ 0 ].set( 0, v * (1 + i) );
    uvs[ 0 ][ 1 ].set( 0, v * i );
    uvs[ 0 ][ 2 ].set( u, v * (1 + i) );
    uvs[ 1 ][ 0 ].set( 0, v * i );
    uvs[ 1 ][ 1 ].set( u, v * i );
    uvs[ 1 ][ 2 ].set( u, v * (1 + i));

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -window.innerWidth / 2 + planeWidth * ( 0.5 + i);
    mappingScene.add(mesh);
  }
}

function onDebugTextureLoaded(texture) {
	var material = new THREE.SpriteMaterial({ map: texture });
  var width = material.map.image.width;
	var height = material.map.image.height;
  var sprite = new THREE.Sprite(material);
	sprite.scale.set(width, height, 1);
  sprite.position.z = -1;
  scene.add(sprite);
  render();
}

function onWindowResize() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	mappingCamera.left = - width / 2;
	mappingCamera.right = width / 2;
	mappingCamera.top = height / 2;
	mappingCamera.bottom = - height / 2;
	mappingCamera.updateProjectionMatrix();
	renderer.setSize(width, height);
	render();
}

function render() {
  renderer.clear();
	renderer.render(scene, camera, fbo);
	renderer.render(mappingScene, mappingCamera);
}

export default {
  setup,
  render,
  grid
};
