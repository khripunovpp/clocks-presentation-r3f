import {Canvas, useThree} from "@react-three/fiber";
import './App.scss';
import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PivotControls,
  ScrollControls,
  Stats,
  StatsGl
} from "@react-three/drei";
import {Clocks} from "./Clocks.jsx";
import React, {createContext, useContext, useEffect, useState} from "react";
import {useControls} from "leva";
import Interface from "./Interface.jsx";
import {atom} from 'jotai'

const MOBILE_CAMERA_ZOOM = 8;
const DESKTOP_CAMERA_ZOOM = 5;
const calculateCameraZoom = () => window.innerWidth < 768 ? MOBILE_CAMERA_ZOOM : DESKTOP_CAMERA_ZOOM;

export const stageAtom = atom('start');
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
    body: {
      value: true,
      render: (get) => get('helpers'),
    },
    screen: {
      value: true,
      render: (get) => get('helpers'),
    },
  });
  return <>
    <Interface/>
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
        <rootContext.Provider value={controls}>
          <Scene/>
        </rootContext.Provider>
      </ScrollControls>
    </Canvas>
  </>
}

function Scene() {
  const context = useContext(rootContext);
  const [zZoom, setZZoom] = useState(calculateCameraZoom());

  useThree(({camera}) => {
    camera.position.z = zZoom;
  });

  useEffect(() => {
    const resize = () => {
      setZZoom(calculateCameraZoom());
    }
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, []);

  return <>
    <directionalLight position={[0, 7, 5]} intensity={5} theatreKey={'light'}/>

    <group position={[0, 0, 0]} theatreKey={'Clocks'}>
      {context.helpers ? <PivotControls><Clocks/></PivotControls> : <Clocks/>}
    </group>
    <Environment preset="city"/>

    {/*<Environment background>*/}
    {/*  <Lightformer intensity={40} color={'#ffffff'} rotation-y={Math.PI / 2} position={[5, 1, 1]} scale={[20, 1, 1]}/>*/}
    {/*  <Lightformer intensity={10} rotation-y={Math.PI / 2} position={[-5, 4, -1]} scale={[20, 0.9, 1]}/>*/}
    {/*  <Lightformer intensity={60} rotation-y={Math.PI / 2} position={[10, 10, 10]} scale={[20, 1, 1]}/>*/}
    {/*</Environment>*/}
  </>
}


export default App
