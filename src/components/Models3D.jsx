import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Models3D = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000);
    scene.add(camera);
    camera.position.z = 6;
    camera.position.x = 6;
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: "rgb(255, 0, 0)" });
    const cube = new THREE.Mesh(geometry, material);
    const ambientlight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientlight);
    const light = new THREE.PointLight(0xff0000, 10);
    light.position.set(8, 8, 8);
    scene.add(light);
    scene.add(cube);
    camera.lookAt(cube.position);
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      cube.rotation.y = elapsedTime;
      cube.rotation.x = elapsedTime;
      cube.position.y = Math.sin(elapsedTime);
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      currentRef.removeChild(renderer.domElement);
    };
  });

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default Models3D;
