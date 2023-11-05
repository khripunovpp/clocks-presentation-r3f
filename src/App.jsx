import {Canvas} from "@react-three/fiber";
import './App.scss';
import {Environment, GizmoHelper, GizmoViewport, OrbitControls, ScrollControls, StatsGl} from "@react-three/drei";
import {Clocks} from "./Clocks.jsx";
import {createContext, useState} from "react";
import {useControls} from "leva";

export const rootContext = createContext({
  helpers: false,
  wireframe: false,
});

function App() {
  const controls = useControls({
    helpers: false,
    wireframe: {
      value: false,
      render: (get) => get('helpers'),
    },
  });
  const [stage, setStage] = useState('start');

  return <>
    {/*<Interface onBtnClick={stageName => setStage(stageName)}/>*/}
    <Canvas shadows gl={{
      preserveDrawingBuffer: true,
    }}>

      {controls.helpers && <>
        <gridHelper/>
        <gridHelper rotation-x={Math.PI / 2} position-y={0}/>
        <Stats/>
        <StatsGl/>
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1}/>
        </GizmoHelper>
        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={controls.helpers} makeDefault/>
      </>}
      <ScrollControls pages={10} damping={.4}>
        <Scene/>
      </ScrollControls>
    </Canvas>
  </>
}

function Scene() {

  return <>
    <directionalLight position={[0, 7, 5]} intensity={5} theatreKey={'light'}/>

    <group position={[0, 0, 0]} theatreKey={'Clocks'}>
      <Clocks/>
    </group>
    <Environment preset="studio"/>

    {/*<Environment background>*/}
    {/*  <Lightformer intensity={40} color={'#ffffff'} rotation-y={Math.PI / 2} position={[5, 1, 1]} scale={[20, 1, 1]}/>*/}
    {/*  <Lightformer intensity={10} rotation-y={Math.PI / 2} position={[-5, 4, -1]} scale={[20, 0.9, 1]}/>*/}
    {/*  <Lightformer intensity={60} rotation-y={Math.PI / 2} position={[10, 10, 10]} scale={[20, 1, 1]}/>*/}
    {/*</Environment>*/}
  </>
}


export default App
