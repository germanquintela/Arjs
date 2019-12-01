var renderer, scene, camera, composer, circle, skelet, particle;

window.onload = function() {
  init();

}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x020000, 0.0);
var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera( 95, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 50;
camera.enableZoom = false
camera.zoomSpeed = 0.001

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var controls = new THREE.OrbitControls(camera, renderer.domElement);

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(255, 39%, 53%)'), 1.0); //hsl(328, 39%, 53%)
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(255, 100%, 100%)'), 1.0); //hsl(240, 100%, 75%)'
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var textureLoader = new THREE.TextureLoader();
var map = textureLoader.load('./assets/textura1.jpg');
var material = new THREE.MeshPhongMaterial({map: map});


var loader = new THREE.OBJLoader();
loader.load( './assets/roca.obj', function ( object ) {

  // For any meshes in the model, add our material.
  object.traverse( function ( node ) {

    if ( node.isMesh ) node.material = material;

  } );

  // Add the model to the scene.
  scene.add( object );
} );

    


var animate = function () {
    requestAnimationFrame( animate );
    scene.rotation.x += 0.005;
    scene.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
    
};


animate();

}