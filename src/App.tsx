import {Canvas} from "@react-three/fiber";
import './App.scss';
import {
  Center,
  Environment,
  GizmoHelper,
  GizmoViewport,
  Lightformer,
  OrbitControls,
  ScrollControls,
  Stats
} from "@react-three/drei";
import {Clocks} from "./Clocks.tsx";
import {useRef} from "react";
import * as THREE from "three";
import {useControls} from "leva";


function App() {
  const controls = useControls('General', {
    zoom: false,
    helpers: false,
  });
  return (
    <Canvas shadows>
      <directionalLight position={[0, 7, 5]} intensity={5}/>
      {controls.helpers && <>
        <axesHelper args={[5]}/>
        <gridHelper/>
        <gridHelper rotation-x={Math.PI / 2} position-y={0}/>
        <Stats/>
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1}/>
        </GizmoHelper>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={controls.zoom} makeDefault/>
      </>}


      <ScrollControls pages={3}>

        <CameraRig>
          <group position={[0, 0, 0]}>
            <Center>
              <Clocks helpers={controls.helpers}/>
            </Center>


            {/*<AccumulativeShadows temporal*/}
            {/*                     frames={100}*/}
            {/*                     color={'#78a4b0'}*/}
            {/*                     colorBlend={1}*/}
            {/*                     toneMapped={true}*/}
            {/*                     alphaTest={0.75}*/}
            {/*                     opacity={2}*/}
            {/*                     scale={15}>*/}
            {/*  <RandomizedLight intensity={Math.PI}*/}
            {/*                   amount={10}*/}
            {/*                   radius={7}*/}
            {/*                   ambient={0.5}*/}
            {/*                   position={[-10, 10, 10]}*/}
            {/*                   bias={0.001}/>*/}
            {/*</AccumulativeShadows>*/}
          </group>
        </CameraRig>
      </ScrollControls>
      <Environment background>
        <Lightformer intensity={40} color={'#ffffff'} rotation-y={Math.PI / 2} position={[5, 1, 1]} scale={[20, 1, 1]}/>
        <Lightformer intensity={10} rotation-y={Math.PI / 2} position={[-5, 4, -1]} scale={[20, 0.9, 1]}/>
        <Lightformer intensity={60} rotation-y={Math.PI / 2} position={[10, 10, 10]} scale={[20, 1, 1]}/>
      </Environment>
    </Canvas>
  )
}

function CameraRig({children}) {
  const groupRef = useRef<THREE.Group>();

  // useFrame((state, delta) => {
  //   // @ts-ignore
  //   // easing.dampE(group.current.rotation, [0, -state.pointer.x / 4, 0], 0.25, delta)
  // })
  // @ts-ignore
  return <group ref={groupRef}>{children}</group>
}


export default App
