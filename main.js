

import './style.css'

import * as THREE from 'three'
import { Loader, PointLight } from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui'

const gui = new GUI()

//loarding
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('myimpulseprojects/textures/NormalMap.png')

//background materials
const spaceTexture = new THREE.TextureLoader().load('myimpulseprojects/textures/Vector.jpg')
// scene.background = spaceTexture;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight );
camera.position.setZ(70);



//pink things features 
const geometry = new THREE.SphereGeometry(40)
const material = new THREE.MeshStandardMaterial({color: 0x000000});
material.metalness = .8
material.roughness = .3
material.normalMap = normalTexture;

const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xff5420, 1)
pointLight.position.set(1,1,1)
pointLight.intensity = 2
scene.add(pointLight)





const pointLight2 = new THREE.PointLight(0xff5420,1)
pointLight2.position.set(1,1,1)
pointLight2.intensity = 25
scene.add(pointLight2)


const pointLight3 = new THREE.PointLight(0x003200,1)
pointLight3.position.set(30,1,1)
pointLight3.intensity = 25
scene.add(pointLight2)

//GUI CONTROL THING
gui.add(pointLight.position, 'y').min(-30).max(30).step(0.01)
gui.add(pointLight.position, 'x').min(-30).max(30).step(0.01)
gui.add(pointLight.position, 'z').min(-30).max(30).step(0.01)

gui.add(pointLight2.position, 'y').min(-30).max(30).step(0.01)
gui.add(pointLight2.position, 'x').min(-30).max(30).step(0.01)
gui.add(pointLight2.position, 'z').min(-30).max(30).step(0.01)




const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)
const lightHelper2 = new THREE.PointLightHelper(pointLight2)
scene.add(lightHelper2)



const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(1,10,10);
  const material = new THREE.MeshStandardMaterial({color: 0x32CD32})
  material.metalness = .8
  material.roughness = .3
  material.normalMap = normalTexture;
  const star = new THREE.Mesh(geometry,material);
  var[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x,y,z);
  scene.add(star)
}

Array(10000).fill().forEach(addStar)




function animate(){
  requestAnimationFrame( animate );
  
  torus.rotation.x += 0.001;
  torus.rotation.y += 0
  torus.rotation.z += 0.01


  renderer.render(scene,camera);

}
animate()
