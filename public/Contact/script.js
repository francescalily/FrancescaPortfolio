import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";

THREE.ColorManagement.enabled = false;

/**
 * Debug
 */
const gui = new dat.GUI();

const parameters = {
  materialColor: "#ffeded",
  wireframe: true,
};

gui.addColor(parameters, "materialColor").onChange(() => {
  material.color.set(parameters.materialColor);
  particlesMaterial.color.set(parameters.materialColor);
});

gui.add(parameters, "wireframe").onChange(() => {
  material.wireframe = parameters.wireframe;
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const loader = new THREE.ImageLoader();

const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("../assets/static/ny.jpg");
gradientTexture.magFilter = THREE.NearestFilter;
const boxTexture = new THREE.TextureLoader().load("../assets/static/ny.jpg");
const boxMaterial = new THREE.MeshBasicMaterial({ map: boxTexture });

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "rgb(69, 248, 14)" })
// );
// scene.add(cube);

// loader.load(
//   "../assets/websites/jobBoardScreenshot.png",
//   function (image) {
//     // use the image, e.g. draw part of it on a canvas
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");
//     context.drawImage(image, 100, 100);
//   },

//   // onProgress callback currently not supported
//   undefined,

//   // onError callback
//   function () {
//     console.error("An error happened.");
//   }
// );

const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
  wireframe: parameters.wireframe,
});

const objectsDistance = 4;

const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 1.7), material);

const mesh2 = new THREE.Mesh(new THREE.TorusGeometry(1, 3, 2, 100), material);

const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material
);

mesh1.position.y = -objectsDistance * 0;
mesh2.position.y = -objectsDistance * 1;
mesh1.position.y = -objectsDistance * 2;

mesh1.position.x = -1.7;
mesh2.position.x = 1.7;
mesh3.position.x = -1.7;
// scene.add(mesh1, mesh2, mesh3);
scene.add(mesh2);

const sectionMeshes = [mesh1, mesh2, mesh3];

const particlesCount = 0;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  positions[i * 1 + 0] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] =
    objectsDistance * 0.5 -
    Math.random() * objectsDistance * sectionMeshes.length;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x000000,
  sizeAttenuation: true,
  size: 0.02,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearAlpha(0);

//scrolling

let scrollY = window.scrollY;
let currentSection = 0;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != currentSection) {
    currentSection = newSection;

    gsap.to(sectionMeshes[currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: "+=6",
      y: "+=1",
      z: "+=1.5",
    });
  }
});

const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});
/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  //animating the camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = -cursor.x * 0.5;
  const parallaxY = cursor.y * 0.5;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  //animating the meshes
  for (const mesh of sectionMeshes) {
    mesh.rotation.x += deltaTime * 0.1;
    mesh.rotation.y += deltaTime * 0.12;
  }
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
