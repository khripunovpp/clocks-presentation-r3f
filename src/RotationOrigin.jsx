import {Sphere} from "@react-three/drei";
import * as THREE from "three";

export default function RotationOrigin({color}) {
  return <Sphere args={[0.05, 16, 16]} position={[0, 0, 0]} material={new THREE.MeshBasicMaterial({color: color ?? 'red'})}/>
}