import {useGLTF, useHelper, useScroll} from "@react-three/drei";
import * as THREE from "three";
import {useContext, useLayoutEffect, useRef} from "react";
import gsap from "gsap";
import {useFrame} from "@react-three/fiber";
import RotationOrigin from "./RotationOrigin.jsx";
import {rootContext} from "./App.jsx";

export function Clocks() {
  const {nodes, materials} = useGLTF("./models/clocks.gltf");
  const context = useContext(rootContext);
  const groupRef = useRef();
  const standRef = useRef();
  const clocksRef = useRef();
  const tlRef = useRef();
  const scroll = useScroll();

  useHelper(context.helpers ? groupRef : undefined, THREE.BoxHelper, 'cyan');

  useFrame(() => {
    const seek = scroll.offset * tlRef.current.duration();
    tlRef.current?.seek(seek);
  });

  useLayoutEffect(() => {
    tlRef.current = gsap.timeline();

    tlRef.current.addLabel('start', 0);
    tlRef.current.from(groupRef.current?.rotation, {
      duration: 2,
      y: Math.PI / 2,
    });

    const scaleMultiplier = 2;

    tlRef.current.addLabel('stage1');
    tlRef.current.to(groupRef.current?.scale, {
      duration: 2,
      y: groupRef.current?.scale.y * scaleMultiplier,
      x: groupRef.current?.scale.x * scaleMultiplier,
      z: groupRef.current?.scale.z * scaleMultiplier,
    }, '-=2');

    tlRef.current.to(groupRef.current?.rotation, {
      duration: 2,
      y: -Math.PI / 9,
    });

    tlRef.current.to(groupRef.current?.scale, {
      duration: 2,
      y: groupRef.current?.scale.y * 1.3,
      x: groupRef.current?.scale.x * 1.3,
      z: groupRef.current?.scale.z * 1.3,
    }, '-=2');

    tlRef.current.to(groupRef.current?.rotation, {
      duration: 2,
      y: -Math.PI / 2,
    });

    tlRef.current.to(groupRef.current?.rotation, {
      duration: 2,
      y: -Math.PI / 2,
    });

    tlRef.current.to(groupRef.current?.rotation, {
      duration: 2,
      y: -Math.PI,
    });
  }, []);

  const onClickStage = stage => {
    tlRef.current?.seek(stage);
  }

  return (
    <group dispose={null} ref={groupRef}>
      {context.helpers && <RotationOrigin/>}
      <group ref={standRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stand.geometry}
          material={nodes.Stand.material}
        >
          <BaseMaterial/>
        </mesh>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Magnet_1_border.geometry}
        material={nodes.Magnet_1_border.material}
        position={[1.14, 0.591, -0.461]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Magnet_1.geometry}
        material={nodes.Magnet_1.material}
        position={[1.14, 0.591, -0.461]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Magnet_2_border.geometry}
        material={nodes.Magnet_2_border.material}
        position={[-1.149, 0.591, -0.461]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.156, 0.053, 0.156]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Magnet_2.geometry}
        material={nodes.Magnet_2.material}
        position={[-1.149, 0.591, -0.461]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.136, 0.05, 0.136]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back_base.geometry}
        material={nodes.Back_base.material}
        position={[0, 0.225, -0.277]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mute_btn_base.geometry}
        material={nodes.Mute_btn_base.material}
        position={[1.719, -0.043, -0.124]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mute_btn_top.geometry}
        material={nodes.Mute_btn_top.material}
        position={[1.741, -0.043, -0.124]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button_1.geometry}
        material={nodes.Button_1.material}
        position={[-1.215, -0.651, 0.124]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button_2.geometry}
        material={nodes.Button_2.material}
        position={[-0.577, -0.651, 0.124]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button_3.geometry}
        material={nodes.Button_3.material}
        position={[0.03, -0.651, 0.124]}
      >
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button_4.geometry}
        material={nodes.Button_4.material}
        position={[0.649, -0.65, 0.126]}
      >
        <BaseMaterial color={'#c55900'}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Base.geometry}
        material={nodes.Base.material}
      >
        <BaseMaterial/>
      </mesh>
    </group>
  );
}

function BaseMaterial({color}) {

  const context = useContext(rootContext);
  return <meshStandardMaterial color={color ?? "#ffffff"}
                               side={THREE.DoubleSide}
                               wireframe={context.wireframe}
                               roughness={0.5}/>
}

useGLTF.preload("./models/clocks.gltf");
