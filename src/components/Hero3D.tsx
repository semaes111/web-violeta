import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════
   CRYSTAL DIAMOND — Main focal object (warm tones)
   ═══════════════════════════════════════════════════════ */
const CrystalDiamond = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.rotation.z = Math.sin(t * 0.25) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[2.5, 0.5, -1]} scale={1.4}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshTransmissionMaterial
          ref={materialRef as any}
          backside
          samples={8}
          thickness={0.5}
          chromaticAberration={0.2}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.25}
          temporalDistortion={0.08}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          color="#d4a48c"
          transmission={0.95}
          roughness={0.05}
          ior={1.5}
        />
      </mesh>
    </Float>
  );
};

/* ═══════════════════════════════════════════════════════
   TORUS RING — Gold orbiting ring
   ═══════════════════════════════════════════════════════ */
const OrbitRing = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.PI * 0.5 + Math.sin(t * 0.2) * 0.15;
    meshRef.current.rotation.z = t * 0.08;
  });

  return (
    <Float speed={1} rotationIntensity={0.25} floatIntensity={0.7}>
      <mesh ref={meshRef} position={[2.5, 0.5, -1]} scale={1}>
        <torusGeometry args={[2.2, 0.025, 16, 100]} />
        <meshPhysicalMaterial
          color="#c8a55a"
          metalness={0.95}
          roughness={0.08}
          emissive="#c8a55a"
          emissiveIntensity={0.12}
        />
      </mesh>
    </Float>
  );
};

/* ═══════════════════════════════════════════════════════
   FLOATING SPHERES — Warm ambient orbs
   ═══════════════════════════════════════════════════════ */
const FloatingSphere = ({ position, scale, color, speed }: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.4;
    meshRef.current.position.x = position[0] + Math.cos(t * speed * 0.7) * 0.25;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.1}
        roughness={0.12}
        transmission={0.85}
        thickness={1}
        clearcoat={1}
        clearcoatRoughness={0.05}
      />
    </mesh>
  );
};

/* ═══════════════════════════════════════════════════════
   PARTICLE FIELD — Gold floating particles
   ═══════════════════════════════════════════════════════ */
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 250;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.03 + 0.01;
    }
    return s;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.008) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8a55a"
        size={0.035}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ═══════════════════════════════════════════════════════
   MOUSE FOLLOW LIGHT — Warm light
   ═══════════════════════════════════════════════════════ */
const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!lightRef.current) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 3);
  });

  return <pointLight ref={lightRef} intensity={0.6} color="#e4c0ab" distance={10} />;
};

/* ═══════════════════════════════════════════════════════
   MAIN 3D SCENE
   ═══════════════════════════════════════════════════════ */
const Hero3D: React.FC = () => {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 1.5]}
      >
        {/* Warm ambient lighting */}
        <ambientLight intensity={0.25} color="#f5e6d3" />
        <directionalLight position={[10, 10, 5]} intensity={0.7} color="#f5f0ea" />
        <directionalLight position={[-5, -5, -3]} intensity={0.25} color="#d4a48c" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.5}
          penumbra={1}
          intensity={0.4}
          color="#c8a55a"
        />

        {/* Interactive light */}
        <MouseLight />

        {/* Main objects */}
        <CrystalDiamond />
        <OrbitRing />

        {/* Floating spheres — warm palette */}
        <FloatingSphere position={[-3, 2, -2]} scale={0.22} color="#e4c0ab" speed={0.7} />
        <FloatingSphere position={[-4, -1.5, -3]} scale={0.14} color="#c8a55a" speed={1.1} />
        <FloatingSphere position={[5, -2, -4]} scale={0.18} color="#d4a48c" speed={0.5} />
        <FloatingSphere position={[-2, -3, -1]} scale={0.11} color="#dbc07a" speed={0.9} />
        <FloatingSphere position={[4, 3, -3]} scale={0.16} color="#b8876f" speed={0.8} />

        {/* Particles */}
        <ParticleField />

        {/* Environment */}
        <Environment preset="night" />
        <fog attach="fog" args={['#0c0a08', 8, 25]} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
