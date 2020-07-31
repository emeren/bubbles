// Three JS Template
window.addEventListener('load', init, false);
function init() {
     createWorld();
     createLights();
     //createGrid();
     createPrimitive();

     createParticleWord();
     animation();
     window.addEventListener('click', addBubble, false);
}
//--------------------------------------------------------------------
var scene, camera, renderer, container;
var world = new THREE.Object3D();
var _width, _height;
function createWorld() {
     _width = window.outerWidth;
     _height = window.innerHeight;
     //---
     scene = new THREE.Scene();
     scene.fog = new THREE.Fog(0x000000, 4, 12);
     //scene.background = new THREE.Color(0xF00000);
     //---
     camera = new THREE.PerspectiveCamera(60, _width / _height, 1, 500);
     camera.position.set(0, 4, 8);
     //---
     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
     renderer.setSize(_width, _height);
     renderer.shadowMap.enabled = true;
     //---
     document.body.appendChild(renderer.domElement);
     //---
     window.addEventListener('resize', onWindowResize, false);

}
function onWindowResize() {
     _width = window.innerWidth;
     _height = window.innerHeight;
     renderer.setSize(_width, _height);
     camera.aspect = _width / _height;
     camera.updateProjectionMatrix();
}
//--------------------------------------------------------------------
var _ambientLights, _lights;
function createLights() {
     _ambientLights = new THREE.AmbientLight();
     _ambientLights = new THREE.HemisphereLight();
     _lights = new THREE.PointLight();
     _lights.position.set(52, 2, 3);
     _lights.castShadow = true;
     scene.add(_ambientLights);
     scene.add(_lights);
}
//--------------------------------------------------------------------

var createParticleWord = function () {
     var geometry = new THREE.IcosahedronGeometry(0.7, 3);
     var bubble_start = 50;
     var bubble_count = 15;
     var bubble_colors = [
          0xffcc00, 0xffcc00
     ]

     for (var i = 0; i < bubble_count; i++) {
          var material = new THREE.MeshBasicMaterial({
               color: bubble_colors[Math.floor(Math.random() * bubble_colors.length)],
               //color: 0xF00000,
               //wireframe:false
          });
          var bubble = new THREE.Mesh(geometry, material);
          bubble.castShadow = true;
          bubble.receivedShadow = true;

          bubble.position.x = -Math.random() * bubble_start + Math.random() * bubble_start;
          bubble.position.z = -Math.random() * bubble_start + Math.random() * bubble_start;
          bubble.position.y = -Math.random() * bubble_start + Math.random() * bubble_start;
          var bubble_scale = Math.random() * 1;
          var bubble_random = Math.random() * 1;
          bubble.scale.set(bubble_scale, bubble_scale, bubble_scale);

          var object_pos = world.children[0];
          var object_pos_range = 0;
          setInterval(function () {
               object_pos.position.x = -Math.random() * object_pos_range + Math.random() * object_pos_range;
               object_pos.position.y = -Math.random() * object_pos_range + Math.random() * object_pos_range;
               object_pos.position.z = -Math.random() * object_pos_range + Math.random() * object_pos_range;
          }, 100);
          world.add(bubble);
     }
     scene.add(world);
}
//--------------------------------------------------------------------
var primitiveElement = function () {
     this.mesh = new THREE.Object3D();
     var geo = new THREE.IcosahedronGeometry();
     var mat = new THREE.MeshBasicMaterial({ color: 0x500000, flatShading: false });
     var mesh = new THREE.Mesh(geo, mat);
     //---
     //this.mesh.add(mesh);
     //---
}
var _primitive;
function createPrimitive() {
     _primitive = new primitiveElement();
     _primitive.mesh.scale.set(1, 1, 1);
     scene.add(_primitive.mesh);
}
function createGrid() {
     var gridHelper = new THREE.GridHelper(20, 20);
     gridHelper.position.y = -1;
     scene.add(gridHelper);
}
//--------------------------------------------------------------------
var distx, momentumx, momentumy, momentumz;
function animation() {
     var time = Date.now() * 0.001;
     _primitive.mesh.rotation.y += 0.003;
     world.rotation.y = Math.sin(time) * Math.PI / 90;
     world.rotation.z = Math.cos(time) * Math.PI / 90;
     var object_place = world.children[0];
     object_place.visible = true;
     //---
     for (let i = 0, l = world.children.length; i < l; i++) {
          var object = world.children[i];
          var object_left = world.children[i - 2];
          if (i > 1) {
               TweenMax.to(object.position, 5, {
                    x: Math.cos(object_left.position.x * Math.PI) * 1,
                    y: Math.sin(object_left.position.y * Math.PI) * 1,
                    z: Math.cos(object_left.position.z * Math.PI) * 1,
                    //elay:0.001*i,
                    //ease:Expo.easeOut
               });
               //---
          }
     }
     //---
     var object_speed = 0.01;
     var object_guide = world.children[1];
     object_guide.position.x += Math.sin(object_place.position.x) - object_guide.position.x * object_speed;
     object_guide.position.y += Math.cos(object_place.position.y) - object_guide.position.y * object_speed;
     object_guide.position.z += object_place.position.z - object_guide.position.z * object_speed;
     //---
     camera.lookAt(scene.position);
     //---
     requestAnimationFrame(animation);
     renderer.render(scene, camera);
}
//ADD bubble !

function addBubble() {
     var bubble_start = 10;
     var material = new THREE.MeshBasicMaterial({
          color: Math.random() * 0xffffff,
          wireframe: true
     });
     var geometry = new THREE.IcosahedronGeometry(0.7, 3);
     var bubble = new THREE.Mesh(geometry, material);
     bubble.castShadow = true;
     bubble.receivedShadow = true;
     bubble.position.x = -Math.random() * bubble_start + Math.random() * bubble_start;
     bubble.position.z = -Math.random() * bubble_start + Math.random() * bubble_start;
     bubble.position.y = -Math.random() * bubble_start + Math.random() * bubble_start;
     var bubble_scale = Math.random() * 1;
     bubble.scale.set(bubble_scale, bubble_scale, bubble_scale);
     world.add(bubble);
}