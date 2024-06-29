import * as THREE from 'three'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, useTexture, useGLTF, Html, useProgress } from '@react-three/drei'
import { easing } from 'maath'
import './util'
import './App.css'

const CubeLoader = ({ setLoadingComplete }) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setLoadingComplete(true);
    }
  }, [progress, setLoadingComplete]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <Html fullscreen>
      <div className="loader-container">
        <div className="loader-content">
          <svg className="progress-ring" width="100" height="100">
            <circle
              className="progress-ring__circle"
              stroke="#007BFF"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            <circle
              className="progress-ring__circle-progress"
              stroke="#007BFF"
              strokeWidth="4"
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: progressOffset,
              }}
            />
            <line x1="50" y1="50" x2="50" y2="20" stroke="#007BFF" strokeWidth="2" />
          </svg>
          <p className="loader-text">The entirety of time is loading...</p>
        </div>
      </div>
    </Html>
  );
};

export const App = () => {
  const [fov, setFov] = useState(15)
  const [showScrollText, setShowScrollText] = useState(true)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const isMobile = window.innerWidth < 768;

  const toggleFov = () => {
    setFov((prevFov) => (prevFov === 15 ? 105 : 15))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollText(false)
    }, 7000) // Hide the text after 7 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 0, 100], fov }}>
        <Suspense fallback={<CubeLoader setLoadingComplete={setLoadingComplete} />}>
          <ScrollControls pages={4} infinite>
            <ambientLight intensity={4} />
            <Rig rotation={[0, 0, 0.15]} fov={fov}>
              <Carousel  />
            </Rig>
            <Model position={[0, -0.15, 0]} />
            <Banner position={[0, -0.15, 0]} />
          </ScrollControls>
          <Environment files="./assets/sky.exr" background />
          {showScrollText && (
            <Html>
              <div className='scroll-instruction-container'>
              <div className="scroll-instruction">Scroll to explore</div>
              </div>
            </Html>
          )}
        </Suspense>
      </Canvas>

      {loadingComplete && (
        <button onClick={toggleFov} className="toggle-button moon">
          See the Void
        </button>
      )}
    </div>
  )
}

function Rig({ fov, ...props }) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2) // Rotate contents
    state.events.update() // Raycasts every frame rather than on pointer-move
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
    state.camera.lookAt(0, 0, 0) // Look at center
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, fov, 0.1) // Animate FOV
    state.camera.updateProjectionMatrix() // Update projection matrix
  })
  return <group ref={ref} {...props} />
}

function Carousel({ radius = 1.4, count = 8 }) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/img${Math.floor(i % 10) + 1}_.webp`}
      position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ))
}

function Card({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
  })
  return (
    <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  )
}

function Model(props) {
  const { nodes, materials } = useGLTF('/binance.glb')
  const btc = useRef()
  useFrame((state, delta) => {
    btc.current.rotation.y += delta / 0.9
  })
  return (
    <group ref={btc} scale={2} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.mesh.geometry} material={materials.base_material} rotation={[Math.PI / 2, 0, 1.5]} scale={1.707} />
    </group>
  )
}

function Banner(props) {
  const ref = useRef()
  const texture = useTexture('/work_.png')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4
    ref.current.material.map.offset.x += delta / 2
  })
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  )
}