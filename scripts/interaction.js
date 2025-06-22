import * as THREE from 'three';
import { gsap } from 'gsap';

export function setupInteractions(scene, camera, renderer, productGroup) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const infoPanel = document.getElementById('infoPanel');

  let hoveredObject = null;

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(productGroup.children);

    if (intersects.length > 0) {
      if (hoveredObject !== intersects[0].object) {
        if (hoveredObject) {
          gsap.to(hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "power2.out" });
          gsap.to(hoveredObject.material, { emissiveIntensity: 0.12, duration: 0.3 });
        }
        hoveredObject = intersects[0].object;
        gsap.to(hoveredObject.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.35, ease: "power2.out" });
        gsap.to(hoveredObject.material, { emissive: { r: 0.2, g: 0.4, b: 0.7 }, emissiveIntensity: 0.45, duration: 0.35 });
      }
      document.body.classList.add('pointer');
    } else {
      if (hoveredObject) {
        gsap.to(hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(hoveredObject.material, { emissive: { r: 0.07, g: 0.07, b: 0.07 }, emissiveIntensity: 0.12, duration: 0.3 });
        hoveredObject = null;
      }
      document.body.classList.remove('pointer');
    }
  }

  function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(productGroup.children);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      const originalColor = obj.material.color.getHex();

      // Animate color change (flash blue)
      gsap.to(obj.material.color, {
        r: 0.2, g: 0.6, b: 1,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          obj.material.color.setHex(originalColor);
        },
      });

      infoPanel.textContent = obj.name;
      infoPanel.classList.add('visible');

      setTimeout(() => {
        infoPanel.classList.remove('visible');
      }, 1500);
    }
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onClick);
}
