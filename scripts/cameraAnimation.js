export function setupCameraAnimation(camera, targetGroup, controls) {
  let angle = 0;
  let floatAngle = 0;
  const radius = 5;

  // Pause auto rotation on user interaction
  let userInteracting = false;
  controls.addEventListener('start', () => {
    userInteracting = true;
  });
  controls.addEventListener('end', () => {
    userInteracting = false;
  });

  function animateCamera() {
    if (!userInteracting) {
      angle += 0.002;
      floatAngle += 0.01;

      camera.position.x = Math.sin(angle) * radius;
      camera.position.z = Math.cos(angle) * radius;

      // Make product float gently up and down
      targetGroup.position.y = 0.1 * Math.sin(floatAngle);

      camera.lookAt(targetGroup.position);
    }
    requestAnimationFrame(animateCamera);
  }

  animateCamera();
}
