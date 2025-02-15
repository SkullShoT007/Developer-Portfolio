import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ==========================================
// Main Scene: Rendered in #background-canvas
// ==========================================

// Set up the main scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.lookAt(0, -50, 0);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Append the renderer to the #background-canvas div
const backgroundCanvas = document.getElementById('background-canvas');
backgroundCanvas.appendChild(renderer.domElement);

// Add lighting to the main scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load the 3D model
let model;
const loader = new GLTFLoader();
loader.load(
    'public/gaming_room.glb', // Replace with your model path
    function (gltf) {
        model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, -4, 14); // Initial position
        model.rotation.y = 5.5;
        model.rotation.x = 0.5;
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error('Error loading model:', error);
    }
);
/* loader.load(
    'public/dream_bedroom..glb', // Replace with your model path
    function (gltf) {
        model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, -5, 16); // Initial position
        model.rotation.y = 4.5;
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error('Error loading model:', error);
    }
); */

// Set up OrbitControls for mouse interaction with the camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = true;
controls.enablePan = true;

// Mouse movement tracking
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalize to range [-1, 1]
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize to range [-1, 1]
});

// Animation Loop for Main Scene
function animate() {
    // Update and render the main scene
    if (model) {
        const radius = 15; // Distance from the model (camera radius)
        const angleX = mouseX * 0.01; // Map mouseX to angle for X-axis rotation
        const angleY = mouseY * 0.01; // Map mouseY to angle for Y-axis rotation

        camera.position.x = radius * Math.cos(angleY) * Math.sin(angleX);
        camera.position.y = radius * Math.sin(angleY);
        camera.position.z = radius * Math.cos(angleY) * Math.cos(angleX);

        camera.lookAt(model.position); // Always look at the model
    }

    controls.update(); // Smooth camera movement
    renderer.render(scene, camera); // Render the main scene
    requestAnimationFrame(animate); // Request the next frame
}
animate();

// Handle resizing for main scene
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 5.5, window.innerHeight / 5.5);

});

// ==========================================
// New Scene: Rendered in #section-5
// ==========================================

// Create a new scene, camera, and renderer for section-5
const section5Scene = new THREE.Scene();
const section5Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
section5Camera.position.z = 10;
section5Camera.position.y = 5;
section5Camera.lookAt(0, 0, 0);

const section5Renderer = new THREE.WebGLRenderer({ alpha: true });
section5Renderer.setSize(window.innerWidth, window.innerHeight);
section5Renderer.setPixelRatio(window.devicePixelRatio);

// Append the renderer to the #section-5 div
const section5Canvas = document.getElementById('section-5');
section5Canvas.appendChild(section5Renderer.domElement);

// Add lighting to section-5 scene
const section5AmbientLight = new THREE.AmbientLight(0xffffff, 0.4);
section5Scene.add(section5AmbientLight);

const section5SpotLight = new THREE.SpotLight(0xffffff, 1);
section5SpotLight.position.set(10, 15, 10);
section5SpotLight.castShadow = true;
section5Scene.add(section5SpotLight);

// Load a new 3D model for section-5
let section5Model;
const section5Loader = new GLTFLoader();
section5Loader.load(
    'public/the_smoking_room.glb', // Replace with your model path
    function (gltf) {
        section5Model = gltf.scene;
        section5Model.scale.set(1.5, 1.5, 1.5);
        section5Model.position.set(0, -4, 15.5);
        section5Model.rotation.y = 4.5;
        section5Scene.add(section5Model);
    },
    undefined,
    function (error) {
        console.error('Error loading section-5 model:', error);
    }
);
const controls2 = new OrbitControls(section5Camera, section5Renderer.domElement);
controls2.enableDamping = true;
controls2.dampingFactor = 0.25;
controls2.screenSpacePanning = true;
controls2.enablePan = true;
// Animation loop for section-5
// Animation loop for section-5
function animate2() {
    // Update and render the section-5 scene
    if (section5Model) {
        const radius = 15; // Distance from the model (camera radius)
        const angleX = mouseX * 0.01; // Map mouseX to angle for X-axis rotation
        const angleY = mouseY * 0.01; // Map mouseY to angle for Y-axis rotation

        section5Camera.position.x = radius * Math.cos(angleY) * Math.sin(angleX);
        section5Camera.position.y = radius * Math.sin(angleY);
        section5Camera.position.z = radius * Math.cos(angleY) * Math.cos(angleX);

        section5Camera.lookAt(section5Model.position); // Always look at the model
    }

    controls2.update(); // Smooth camera movement
    section5Renderer.render(section5Scene, section5Camera); // Render section-5 scene
    requestAnimationFrame(animate2); // Request the next frame
}
animate2();


// Handle resizing for section-5
window.addEventListener('resize', () => {
    section5Camera.aspect = window.innerWidth / window.innerHeight;
    section5Camera.updateProjectionMatrix();
    section5Renderer.setSize(window.innerWidth, window.innerHeight);
});

/* let project_type = document.querySelectorAll('.project-type');
let id;
project_type.forEach((type)=>{
    project_type.addEventListener("click", ()=>{
        if(project_type.value == 1){
            id = project_type;
            project_type.classList.remove('selected-project-type');

        }
    })
}); */






