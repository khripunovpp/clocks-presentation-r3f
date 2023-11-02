import {Canvas} from "@react-three/fiber";
import './App.scss';
import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  Lightformer,
  OrbitControls,
  ScrollControls,
  Stats,
  StatsGl
} from "@react-three/drei";
import {Clocks} from "./Clocks.jsx";
import {createContext, useState} from "react";
import {useControls} from "leva";
import Interface from "./Interface.jsx";

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
    <Canvas shadows>
      <directionalLight position={[0, 7, 5]} intensity={5}/>
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

      <ScrollControls pages={3}>
        <group position={[0, 0, 0]}>
          <rootContext.Provider value={controls}>
            <Clocks stage={stage}/>
          </rootContext.Provider>
        </group>
      </ScrollControls>

      <Environment background>
        <Lightformer intensity={40} color={'#ffffff'} rotation-y={Math.PI / 2} position={[5, 1, 1]} scale={[20, 1, 1]}/>
        <Lightformer intensity={10} rotation-y={Math.PI / 2} position={[-5, 4, -1]} scale={[20, 0.9, 1]}/>
        <Lightformer intensity={60} rotation-y={Math.PI / 2} position={[10, 10, 10]} scale={[20, 1, 1]}/>
      </Environment>
    </Canvas>
  </>
}


export default App
