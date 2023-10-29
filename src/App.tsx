import {Canvas} from "@react-three/fiber";
import './App.scss';
import {OrbitControls} from "@react-three/drei";
import {Clocks} from "./Clocks.tsx";

function App() {
  return (
    <Canvas>
      <OrbitControls/>
      <Clocks/>
    </Canvas>
  )
}

export default App
