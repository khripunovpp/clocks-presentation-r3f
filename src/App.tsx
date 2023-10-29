import {Canvas, useFrame} from "@react-three/fiber";
import './App.scss';
import {
  AccumulativeShadows,
  Center,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  ScrollControls
} from "@react-three/drei";
import {Clocks} from "./Clocks.tsx";
import {useRef} from "react";

function App() {
  return (
    <Canvas shadows>
      <color attach="background" args={['#78a4b0']}/>
      <directionalLight position={[4, 7, 2]} intensity={3}/>
      <axesHelper/>

      <ScrollControls pages={3}>

        <CameraRig>
          <group position={[0, -1, 0]}>
            <Center top>
              <Clocks/>
            </Center>

            <OrbitControls maxPolarAngle={Math.PI / 2}/>

            <AccumulativeShadows temporal
                                 frames={100}
                                 color={'#78a4b0'}
                                 colorBlend={1}
                                 toneMapped={true}
                                 alphaTest={0.75}
                                 opacity={2}
                                 scale={15}>
              <RandomizedLight intensity={Math.PI}
                               amount={10}
                               radius={7}
                               ambient={0.5}
                               position={[-10, 10, 10]}
                               bias={0.001}/>
            </AccumulativeShadows>
          </group>
        </CameraRig>
      </ScrollControls>
      <Environment>
        <Lightformer intensity={40} color={'#78a4b0'} rotation-y={Math.PI / 2} position={[5, 1, 1]} scale={[20, 1, 1]}/>
        <Lightformer intensity={20} rotation-y={Math.PI / 2} position={[-5, 4, -1]} scale={[20, 0.9, 1]}/>
        <Lightformer intensity={60} rotation-y={Math.PI / 2} position={[10, 10, 10]} scale={[20, 1, 1]}/>
      </Environment>
    </Canvas>
  )
}

function CameraRig({children}) {
  const group = useRef()
  useFrame((state, delta) => {
    // @ts-ignore
    // easing.dampE(group.current.rotation, [0, -state.pointer.x / 4, 0], 0.25, delta)
  })
  // @ts-ignore
  return <group ref={group}>{children}</group>
}


export default App
