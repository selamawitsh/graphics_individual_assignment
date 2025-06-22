import * as THREE from 'three';

export function addLighting(scene) {
  // Soft blue ambient light for dark theme
  const ambientLight = new THREE.AmbientLight(0x222a35, 0.7);
  scene.add(ambientLight);

  // Main directional light (cool white)
  const dirLight = new THREE.DirectionalLight(0xbfdcff, 1.1);
  dirLight.position.set(5, 10, 7);
  dirLight.castShadow = true;

  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 20;
  dirLight.shadow.camera.left = -5;
  dirLight.shadow.camera.right = 5;
  dirLight.shadow.camera.top = 5;
  dirLight.shadow.camera.bottom = -5;

  scene.add(dirLight);

  // Soft fill light from below/front (blue accent)
  const fillLight = new THREE.DirectionalLight(0x3a6ea5, 0.35);
  fillLight.position.set(-5, 2, 5);
  scene.add(fillLight);
}
