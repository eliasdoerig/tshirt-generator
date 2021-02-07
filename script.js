import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('texture');
let tshirtObj;
let tshirtLoaded = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio * 1.5 );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
controls.autoRotate = false;

// How far you can orbit vertically, upper and lower limits.
// Range is 0 to Math.PI radians.
//controls.minPolarAngle = Math.PI/2; // radians
//controls.maxPolarAngle = Math.PI/2; // radians

// How far you can orbit horizontally, upper and lower limits.
// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
controls.minAzimuthAngle = - Infinity; // radians
controls.maxAzimuthAngle = Infinity; // radians

const light = new THREE.HemisphereLight( 0xffffff, 0x080808, 1.2 );
scene.add( light );


const loader = new GLTFLoader();

loader.load(
	// resource URL
	'model/tshirt.glb',
	// called when the resource is loaded
	function ( gltf ) {

		tshirtObj = gltf.scene
		scene.add( tshirtObj );
		
		tshirtLoaded = true;

		updateTexture();

		/*
		var textureLoader = new THREE.TextureLoader();
		textureLoader.load( "model/texture.jpg", function( newTexture ) {
			newTexture.encoding = THREE.sRGBEncoding;
			newTexture.flipY = false;
			newTexture.repeat.set(5, 4);
			newTexture.offset.set(-.7, -.7 );

			modelObj.traverse( function ( child ) {
			
			if (child instanceof THREE.Mesh) {
				//create a global var to reference later when changing textures
				//apply texture
				
				child.material.map = newTexture;
				child.material.needsUpdate = true;
				child.material.map.needsUpdate = true;

			}
			});
			console.log(modelObj);
		});
		*/

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( `An error happened: ${error}` );

	}
);

/*
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
*/
camera.position.z = 20;

function updateTexture() {

	const canvasTexture = new THREE.CanvasTexture(canvas);

	canvasTexture.encoding = THREE.sRGBEncoding;
	canvasTexture.flipY = false;
	canvasTexture.repeat.set(5, 5);
	canvasTexture.offset.set(-.75, -.9 );

	tshirtObj.traverse( function ( child ) {
		if (child instanceof THREE.Mesh) {
			//create a global var to reference later when changing textures
			//apply texture
			
			child.material.map = canvasTexture;
			child.material.needsUpdate = true;
			child.material.map.needsUpdate = true;
		}
	});
}

const animate = function () {
    requestAnimationFrame( animate );
	controls.update();
	if(tshirtLoaded){
		updateTexture();
	}
    renderer.render( scene, camera );
};

animate();