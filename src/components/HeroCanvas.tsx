"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CssFallbackD } from "./CssFallbackD";
import type { PerformanceMode } from "./usePerformanceMode";

/** Geometric "D" brand mark: vertical stem + semicircular bowl, extruded with a small bevel. */
function useDShapeGeometry(high: boolean) {
  return useMemo(() => {
    const shape = new THREE.Shape();
    // Outer D outline.
    shape.moveTo(-0.7, -1.5);
    shape.lineTo(-0.7, 1.5);
    shape.lineTo(0.1, 1.5);
    shape.absarc(0.1, 0, 1.5, Math.PI / 2, -Math.PI / 2, true);
    shape.lineTo(-0.7, -1.5);

    // Inner counter (the hole of the D).
    const hole = new THREE.Path();
    hole.moveTo(-0.28, -1.02);
    hole.lineTo(-0.28, 1.02);
    hole.lineTo(0.1, 1.02);
    hole.absarc(0.1, 0, 1.02, Math.PI / 2, -Math.PI / 2, true);
    hole.lineTo(-0.28, -1.02);
    shape.holes.push(hole);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: high ? 3 : 1,
      curveSegments: high ? 48 : 20,
    });
    geometry.center();
    return geometry;
  }, [high]);
}

function DMark({ mode, interactive }: { mode: PerformanceMode; interactive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const geometry = useDShapeGeometry(mode === "high");

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // Slow continuous Y rotation + gentle float.
    g.rotation.y += delta * 0.35;
    g.position.y = Math.sin(t * 0.8) * 0.08;
    if (interactive) {
      // Subtle mouse-responsive tilt, lerped toward the pointer.
      const targetX = THREE.MathUtils.clamp(pointer.current.y * 0.18, -0.2, 0.2);
      const targetZ = THREE.MathUtils.clamp(pointer.current.x * 0.18, -0.2, 0.2);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.05);
      g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -targetZ, 0.05);
    }
  });

  const high = mode === "high";

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow={high} receiveShadow={high}>
        {high ? (
          <meshPhysicalMaterial
            color="#3b82f6"
            metalness={0.15}
            roughness={0.12}
            transmission={0.85}
            thickness={1.4}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.2}
          />
        ) : (
          <meshStandardMaterial color="#3b82f6" metalness={0.65} roughness={0.25} />
        )}
      </mesh>
      {/* Thin torus ring around the D for depth. */}
      <mesh rotation={[Math.PI / 2.4, 0.25, 0]} position={[0, 0, -0.15]}>
        <torusGeometry args={[2.35, 0.028, 12, high ? 96 : 48]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.7} roughness={0.3} emissive="#1d4ed8" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Scene({ mode }: { mode: PerformanceMode }) {
  const high = mode === "high";
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#60a5fa" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#2563eb" />
      <spotLight
        position={[0, 6, 6]}
        angle={0.5}
        penumbra={1}
        intensity={high ? 120 : 60}
        color="#93c5fd"
        castShadow={high}
      />
      <DMark mode={mode} interactive={high} />
    </>
  );
}

interface HeroCanvasProps {
  mode: PerformanceMode;
}

/** Real Three.js D. Rendered only when the hero is in view (parent mounts/unmounts). */
export default function HeroCanvas({ mode }: HeroCanvasProps) {
  const [failed, setFailed] = useState(false);
  const high = mode === "high";

  if (failed) return <CssFallbackD className="h-full w-full" />;

  return (
    <Canvas
      dpr={high ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      shadows={high}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        if (!gl.getContext()) setFailed(true);
      }}
      onError={() => setFailed(true)}
      aria-hidden="true"
    >
      <Scene mode={mode} />
    </Canvas>
  );
}
