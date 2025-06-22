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
          gsap.to(hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        }
        hoveredObject = intersects[0].object;
        gsap.to(hoveredObject.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.3 });
      }
      document.body.style.cursor = 'pointer';
    } else {
      if (hoveredObject) {
        gsap.to(hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        hoveredObject = null;
      }
      document.body.style.cursor = 'default';
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

      // Animate color change
      gsap.to(obj.material.color, {
        r: 1,
        g: 0,
        b: 0,
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
