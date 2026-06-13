import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create scene, camera, renderer with rich depth fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfafbfc, 0.005);

    const camera = new THREE.PerspectiveCamera(65, width / height, 1, 1000);
    camera.position.z = 240;
    camera.position.y = 80;
    camera.lookAt(0, -10, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create topography terrain effect representing Sikkim high-altitude ridges
    const cols = 45;
    const rows = 45;
    const pointsCount = cols * rows;
    const positions = new Float32Array(pointsCount * 3);
    const colors = new Float32Array(pointsCount * 3);

    const spacing = 12;
    const originalHeights = new Float32Array(pointsCount);

    let idx = 0;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Grid centering around mountain axis
        const x = (c - cols / 2) * spacing;
        const z = (r - rows / 2) * spacing;
        
        // Alpine ridge mathematics (Sikkim peak simulation)
        const distFromCenter = Math.sqrt(x*x + z*z);
        const y = Math.sin(c * 0.12) * Math.cos(r * 0.12) * 16 + 25 * Math.exp(-distFromCenter * 0.006);

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;
        originalHeights[idx] = y;

        // Custom premium state gradient colors (Sophisticated Light Grays and soft blue)
        const ratio = c / cols;
        colors[idx * 3] = 0.82 + ratio * 0.05; // Soft Gray-Red
        colors[idx * 3 + 1] = 0.85 + (1 - ratio) * 0.05; // Soft Gray-Green
        colors[idx * 3 + 2] = 0.9 + ratio * 0.05; // Soft Gray-Blue

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular canvas texture for smooth glow spots (no external assets required)
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(100, 150, 200, 1)');
      gradient.addColorStop(0.3, 'rgba(148, 163, 184, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Add optional high-atmosphere floating weather particles (sparks of wisdom)
    const sparkCount = 100;
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkSpeeds = new Float32Array(sparkCount);
    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = (Math.random() - 0.5) * 450;
      sparkPositions[i * 3 + 1] = Math.random() * 150 + 10;
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 450;
      sparkSpeeds[i] = Math.random() * 0.25 + 0.05;
    }
    const sparkGeometry = new THREE.BufferGeometry();
    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMaterial = new THREE.PointsMaterial({
      size: 1.8,
      color: 0x94a3b8, // Soft corporate slate sparks
      map: texture,
      transparent: true,
      opacity: 0.25,
      depthWrite: false
    });
    const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
    scene.add(sparks);

    // Interactive mouse trackers
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      targetMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for inertia tracking
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Spin geography base slowly
      pointCloud.rotation.y = elapsedTime * 0.02;

      // Animate topography points
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      
      let pIdx = 0;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const originalHeight = originalHeights[pIdx];
          
          // Himalayan ridge ripple equation
          const wave = Math.sin(elapsedTime * 1.2 + (c + r) * 0.11) * 3.5 + 
                       Math.cos(elapsedTime * 0.6 + c * 0.18) * 2.2;

          // Compute interactive cursor proximity weight
          const worldX = posAttr.getX(pIdx);
          const worldZ = posAttr.getZ(pIdx);
          
          // Map mouse to world space roughly
          const mouseWorldX = mouseX * 180;
          const mouseWorldZ = -mouseY * 180;

          const distanceSq = Math.pow(worldX - mouseWorldX, 2) + Math.pow(worldZ - mouseWorldZ, 2);
          let hoverForce = 0;
          if (distanceSq < 8000) {
            const distance = Math.sqrt(distanceSq);
            // Height deformation proportional to distance pointer
            hoverForce = (1.0 - distance / Math.sqrt(8000)) * 14 * Math.sin(elapsedTime * 3.0 - distance * 0.1);
          }

          posAttr.setY(pIdx, originalHeight + wave + hoverForce);
          pIdx++;
        }
      }
      posAttr.needsUpdate = true;

      // Animate floating gold sparks
      const sparkAttr = sparkGeometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < sparkCount; i++) {
        let sy = sparkAttr.getY(i) - sparkSpeeds[i];
        if (sy < -40) {
          // Reset when drifting below dashboard horizon
          sy = 150;
          sparkAttr.setX(i, (Math.random() - 0.5) * 450);
          sparkAttr.setZ(i, (Math.random() - 0.5) * 450);
        }
        sparkAttr.setY(i, sy);
        
        // Gentle drift
        const sx = sparkAttr.getX(i) + Math.sin(elapsedTime + i) * 0.06;
        sparkAttr.setX(i, sx);
      }
      sparkAttr.needsUpdate = true;

      // Gentle interactive camera orientation adjustments
      camera.position.x += (mouseX * 35 - camera.position.x) * 0.05;
      camera.position.y += ((mouseY * -25 + 90) - camera.position.y) * 0.05;
      camera.lookAt(0, -5, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      sparkGeometry.dispose();
      sparkMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full -z-10 bg-[#fafbfc] overflow-hidden"
    />
  );
}
