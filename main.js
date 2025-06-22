import { initScene } from './scripts/initScene.js';
import { createProduct } from './scripts/createProduct.js';
import { addLighting } from './scripts/addLighting.js';
import { setupInteractions } from './scripts/interaction.js';
import { setupCameraAnimation } from './scripts/cameraAnimation.js';

let scene, camera, renderer, controls, productGroup;

({ scene, camera, renderer, controls } = initScene());

productGroup = createProduct(scene);
addLighting(scene);
setupInteractions(scene, camera, renderer, productGroup);
setupCameraAnimation(camera, productGroup, controls);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
