var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background = new THREE.Color( 0xa0a0a0 );
scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 200, 0 );
scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( 0, 200, 100 );
dirLight.castShadow = true;
dirLight.shadow.camera.top = 180;
dirLight.shadow.camera.bottom = - 100;
dirLight.shadow.camera.left = - 120;
dirLight.shadow.camera.right = 120;
scene.add( dirLight );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', function()
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

controls = new THREE.OrbitControls(camera, renderer.domElement);

// var geometry = new THREE.BoxGeometry(1,1,1,2,2,2);
// var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: false } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 3;

// model
let loader = new THREE.GLTFLoader();
loader.load('Monkey.glb', function(gltf){
    scene.add(gltf.scene);
});

// let loader = new THREE.FBXLoader();
// loader.load('Monkey.fbx', function(fbx){
//     scene.add(fbx.scene);
// });

const animate = function () 
{
    requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

var update = function()
{
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
};

var render = function()
{
    renderer.render(scene, camera);
};

var GameLoop = function()
{
    requestAnimationFrame(GameLoop);
    update();
    render();
};

GameLoop();