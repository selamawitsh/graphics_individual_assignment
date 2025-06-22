import * as THREE from 'three';

export function createProduct(scene) {
  const group = new THREE.Group();

  // Brown colors for a wooden chair
  const colors = {
    seat: 0x8B5C2A,       // Brown
    legs: 0x6B4226,       // Darker brown
    backrest: 0x8B5C2A    // Brown
  };

  // Materials with subtle emissive for glow effect
  const seatMat = new THREE.MeshPhysicalMaterial({ color: colors.seat, roughness: 0.5, metalness: 0.2, emissive: 0x3e2412, emissiveIntensity: 0.10 });
  const legMat = new THREE.MeshPhysicalMaterial({ color: colors.legs, roughness: 0.6, metalness: 0.2, emissive: 0x2d180a, emissiveIntensity: 0.08 });
  const backrestMat = new THREE.MeshPhysicalMaterial({ color: colors.backrest, roughness: 0.4, metalness: 0.2, emissive: 0x3e2412, emissiveIntensity: 0.10 });

  // Seat (box)
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 2), seatMat);
  seat.position.y = 1;
  seat.name = 'Seat';
  seat.castShadow = true;
  seat.receiveShadow = true;
  group.add(seat);

  // Legs (cylinders)
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1);
  const legPositions = [
    [-0.8, 0.5, -0.8],
    [0.8, 0.5, -0.8],
    [-0.8, 0.5, 0.8],
    [0.8, 0.5, 0.8],
  ];

  legPositions.forEach((pos, i) => {
    const leg = new THREE.Mesh(legGeometry, legMat);
    leg.position.set(...pos);
    leg.name = `Leg ${i + 1}`;
    leg.castShadow = true;
    leg.receiveShadow = true;
    group.add(leg);
  });

  // Backrest (box)
  const backrest = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 0.2), backrestMat);
  backrest.position.set(0, 2, -0.9);
  backrest.name = 'Backrest';
  backrest.castShadow = true;
  backrest.receiveShadow = true;
  group.add(backrest);

  scene.add(group);

  // Store materials for hover effect
  group.userData = {
    seatMat,
    legMat,
    backrestMat
  };

  return group;
}
