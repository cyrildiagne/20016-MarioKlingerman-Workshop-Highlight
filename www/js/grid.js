var sprites = [];
var mesh;
var numX = 19;
var numY = 26;
var loadCallback;

function setup(cb) {
  loadCallback = cb;
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load("res/highlight.png", onTextureLoaded);
}

function onTextureLoaded(texture) {
  var geometry = new THREE.Geometry();
  var w = 1280;
  var h = 800 * 3;
  var size = 72;
  var offset = 201;
  for ( var i = 0; i < numX; i ++ ) {
    for ( var j = 0; j < numY; j ++ ) {
      if (j == numY-1 && i%2) continue;
			var vertex = new THREE.Vector3();
			vertex.x = -w * 0.5 + 67 * (i + 0.5);
			vertex.y = -h * 0.5 + 77 * (j + 0.5) + (i%2?size*0.5:0);
      vertex.y += offset;
			vertex.z = 0;
			geometry.vertices.push(vertex);
      // vertex colors
      var color = new THREE.Color();
      if (Math.random() < 0.1) {
        color.setHSL( 0, 0, 1 );
      } else {
        color.setHSL( 0, 0, 0 );
      }
      geometry.colors.push(color);
		}
  }

  var material = new THREE.PointsMaterial( {
    map: texture,
    size: 0.95,
    // color: 0xffffff,
    transparent: true,
    vertexColors: THREE.VertexColors
    // blending: THREE.AdditiveBlending,
    // depthTest: false
  });
	mesh = new THREE.Points(geometry, material);

  if (loadCallback) {
    loadCallback(mesh);
    loadCallback = null;
  }
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

export default {
  setup,
  randomHighlight
}
