import { useRef, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════
   CUSTOM GOLD LIQUID SHADER — Luxury metallic surface
   ═══════════════════════════════════════════════════════ */
const GoldLiquidMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColor1: new THREE.Color('#c8a55a'),
    uColor2: new THREE.Color('#e4c0ab'),
    uColor3: new THREE.Color('#1a1510'),
  },
  // Vertex shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;

    //	Simplex 3D Noise
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1. + 3.0 * C.xxx;
      i = mod(i, 289.0 );
      vec4 p = permute( permute( permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      // Organic noise displacement
      float noise1 = snoise(position * 1.5 + uTime * 0.15);
      float noise2 = snoise(position * 3.0 - uTime * 0.1);
      float displacement = noise1 * 0.12 + noise2 * 0.04;

      // Mouse influence
      float mouseInfluence = smoothstep(2.0, 0.0, length(uMouse - position.xy * 0.3));
      displacement += mouseInfluence * 0.08;

      vDisplacement = displacement;
      vec3 newPos = position + normal * displacement;
      vPosition = newPos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;

    void main() {
      // Fresnel-based iridescence
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

      // Multi-layer color mixing
      vec3 color = mix(uColor1, uColor2, fresnel);
      color = mix(color, uColor3, smoothstep(0.0, 0.5, vDisplacement));

      // Gold shimmer
      float shimmer = sin(vUv.x * 40.0 + uTime * 0.5) * sin(vUv.y * 40.0 - uTime * 0.3);
      color += vec3(0.08, 0.06, 0.02) * shimmer * fresnel;

      // Subtle glow at edges
      float edgeGlow = pow(fresnel, 4.0) * 0.6;
      color += vec3(0.9, 0.75, 0.4) * edgeGlow;

      gl_FragColor = vec4(color, 0.92 + fresnel * 0.08);
    }
  `
);

extend({ GoldLiquidMaterial });

// TypeScript declaration
declare module '@react-three/fiber' {
  interface ThreeElements {
    goldLiquidMaterial: any;
  }
}

/* ═══════════════════════════════════════════════════════
   CRYSTAL DIAMOND — Main focal object with liquid gold shader
   ═══════════════════════════════════════════════════════ */
const CrystalDiamond = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.06;

    // Breathe scale
    const breathe = 1 + Math.sin(t * 0.5) * 0.03;
    meshRef.current.scale.setScalar(1.4 * breathe);

    // Update shader uniforms
    materialRef.current.uTime = t;
    materialRef.current.uMouse.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2
    );
  });

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1.0}>
      <mesh ref={meshRef} position={[2.5, 0.5, -1]}>
        <icosahedronGeometry args={[1.2, 4]} />
        <goldLiquidMaterial
          ref={materialRef}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
};

/* ═══════════════════════════════════════════════════════
   TRANSMISSION ORB — Glass-like secondary object
   ═══════════════════════════════════════════════════════ */
const TransmissionOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.position.y = -1 + Math.sin(t * 0.4) * 0.3;
    meshRef.current.position.x = -3.5 + Math.cos(t * 0.3) * 0.2;
  });

  return (
    <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[-3.5, -1, -2]} scale={0.7}>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.4}
          chromaticAberration={0.15}
          anisotropy={0.2}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.05}
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
   DUAL ORBIT RINGS — Gold + Rose gold rings
   ═══════════════════════════════════════════════════════ */
const OrbitRings = () => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI * 0.5 + Math.sin(t * 0.2) * 0.15;
      ring1Ref.current.rotation.z = t * 0.06;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = Math.PI * 0.3 + Math.cos(t * 0.15) * 0.2;
      ring2Ref.current.rotation.x = t * 0.04;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.PI * 0.7 + Math.sin(t * 0.25) * 0.1;
      ring3Ref.current.rotation.z = -t * 0.05;
    }
  });

  const ringMaterial = (color: string, emissiveIntensity: number) => (
    <meshPhysicalMaterial
      color={color}
      metalness={0.95}
      roughness={0.08}
      emissive={color}
      emissiveIntensity={emissiveIntensity}
    />
  );

  return (
    <group position={[2.5, 0.5, -1]}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          {ringMaterial('#c8a55a', 0.15)}
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.6, 0.012, 16, 120]} />
          {ringMaterial('#d4a48c', 0.1)}
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.3}>
        <mesh ref={ring3Ref}>
          <torusGeometry args={[1.8, 0.008, 16, 80]} />
          {ringMaterial('#dbc07a', 0.08)}
        </mesh>
      </Float>
    </group>
  );
};

/* ═══════════════════════════════════════════════════════
   FLOATING SPHERES — Warm ambient glass orbs
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
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
    meshRef.current.position.x = position[0] + Math.cos(t * speed * 0.7) * 0.3;
    meshRef.current.rotation.x = t * speed * 0.1;
    meshRef.current.rotation.y = t * speed * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.15}
        roughness={0.1}
        transmission={0.88}
        thickness={1.2}
        clearcoat={1}
        clearcoatRoughness={0.03}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

/* ═══════════════════════════════════════════════════════
   ADVANCED PARTICLE SYSTEM — Dual-layer gold dust
   ═══════════════════════════════════════════════════════ */
const GoldDustParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 400;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = Math.random() * 0.004 + 0.001;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3] + Math.sin(t * 0.5 + i) * 0.0005;
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset particles that drift too far
      if (posArray[i * 3 + 1] > 12) {
        posArray[i * 3 + 1] = -12;
        posArray[i * 3] = (Math.random() - 0.5) * 24;
      }
    }
    posAttr.needsUpdate = true;

    pointsRef.current.rotation.y = t * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8a55a"
        size={0.03}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ═══════════════════════════════════════════════════════
   SPARKLE PARTICLES — Bright glinting points
   ═══════════════════════════════════════════════════════ */
const SparkleParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();

    // Pulsate opacity based on phase
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.3 + Math.sin(t * 2) * 0.2;
    mat.size = 0.06 + Math.sin(t * 3) * 0.02;

    pointsRef.current.rotation.y = -t * 0.008;
    pointsRef.current.rotation.x = Math.sin(t * 0.006) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f5e6d3"
        size={0.06}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/* ═══════════════════════════════════════════════════════
   MOUSE FOLLOW LIGHT — Interactive warm light
   ═══════════════════════════════════════════════════════ */
const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!lightRef.current) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    lightRef.current.position.lerp(new THREE.Vector3(x, y, 4), 0.08);
  });

  return <pointLight ref={lightRef} intensity={0.8} color="#e4c0ab" distance={12} />;
};

/* ═══════════════════════════════════════════════════════
   SCROLL-LINKED CAMERA — Subtle dolly on scroll
   ═══════════════════════════════════════════════════════ */
const ScrollCamera = () => {
  const scrollY = useRef(0);
  const targetZ = useRef(8);

  const handleScroll = useCallback(() => {
    scrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useFrame((state) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY.current / maxScroll, 1);

    // Camera moves slightly further on scroll
    targetZ.current = 8 + progress * 4;
    state.camera.position.z += (targetZ.current - state.camera.position.z) * 0.03;

    // Subtle rotation on scroll
    state.camera.rotation.x += (progress * -0.08 - state.camera.rotation.x) * 0.02;
    state.camera.rotation.y += (progress * 0.05 - state.camera.rotation.y) * 0.02;
  });

  return null;
};

/* ═══════════════════════════════════════════════════════
   POST-PROCESSING — Bloom + Chromatic Aberration + Vignette
   ═══════════════════════════════════════════════════════ */
const PostProcessing = () => {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0004, 0.0004)}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Vignette
        eskil={false}
        offset={0.15}
        darkness={0.85}
      />
    </EffectComposer>
  );
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
          toneMappingExposure: 1.2,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        {/* Scroll-linked camera */}
        <ScrollCamera />

        {/* Warm ambient lighting rig (5 lights like Adrian portfolio) */}
        <ambientLight intensity={0.2} color="#f5e6d3" />
        <directionalLight position={[10, 10, 5]} intensity={0.7} color="#f5f0ea" />
        <directionalLight position={[-5, -5, -3]} intensity={0.25} color="#d4a48c" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.4}
          penumbra={1}
          intensity={0.5}
          color="#c8a55a"
          castShadow={false}
        />
        <hemisphereLight
          color="#f5e6d3"
          groundColor="#1a1510"
          intensity={0.3}
        />

        {/* Interactive mouse light */}
        <MouseLight />

        {/* Main objects */}
        <CrystalDiamond />
        <TransmissionOrb />
        <OrbitRings />

        {/* Floating glass spheres — warm palette */}
        <FloatingSphere position={[-3, 2.5, -2]} scale={0.24} color="#e4c0ab" speed={0.6} />
        <FloatingSphere position={[-4.5, -1.5, -3]} scale={0.15} color="#c8a55a" speed={1.0} />
        <FloatingSphere position={[5.5, -2, -4]} scale={0.2} color="#d4a48c" speed={0.45} />
        <FloatingSphere position={[-2.5, -3.5, -1.5]} scale={0.12} color="#dbc07a" speed={0.85} />
        <FloatingSphere position={[4, 3.5, -3.5]} scale={0.18} color="#b8876f" speed={0.7} />
        <FloatingSphere position={[1, -4, -2]} scale={0.1} color="#e4c0ab" speed={1.1} />

        {/* Dual-layer particle systems */}
        <GoldDustParticles />
        <SparkleParticles />

        {/* Environment */}
        <Environment preset="night" />
        <fog attach="fog" args={['#0c0a08', 8, 28]} />

        {/* Post-processing */}
        <PostProcessing />
      </Canvas>
    </div>
  );
};

export default Hero3D;
