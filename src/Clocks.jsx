import {Text, useGLTF, useHelper, useScroll} from "@react-three/drei";
import * as THREE from "three";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import gsap from "gsap";
import {useFrame} from "@react-three/fiber";
import RotationOrigin from "./RotationOrigin.jsx";
import {rootContext, stageAtom} from "./App.jsx";
import {useAtom} from "jotai";
import {stageKeys} from "./conts.js";

const SCREEN_COLOR = '#697367';

export function Clocks() {
  const {nodes, materials} = useGLTF("./models/clocks.gltf");
  console.log({nodes})
  const context = useContext(rootContext);
  const groupRef = useRef();
  const tlRef = useRef();
  const scroll = useScroll();
  const [stage, setStage] = useAtom(stageAtom);
  const scrollToSection = (sectionLabel) => {
    const labelTime = tlRef.current.labels[sectionLabel];
    const nextScrollOffset = labelTime / tlRef.current.duration();
    scroll.el.scrollTop = nextScrollOffset * scroll.pages * scroll.el.clientHeight;
    scroll.scroll.current = nextScrollOffset;
  };

  useHelper(context.helpers ? groupRef : undefined, THREE.BoxHelper, 'cyan');

  useFrame(() => {
    const newAnimationPosition = scroll.offset * tlRef.current.duration();
    tlRef.current?.seek(newAnimationPosition);
  });

  useEffect(() => {
    scrollToSection(stage);
  }, [stage]);

  useLayoutEffect(() => {
    tlRef.current = gsap.timeline();

    tlRef.current.add(stageKeys.start);
    tlRef.current.from(groupRef.current?.rotation, {
      duration: 2, y: Math.PI / 2, onComplete: () => {
        // setStage(stageKeys.start);
      },
    });

    const scaleMultiplier = 2;

    tlRef.current.add(stageKeys.front);
    tlRef.current.to(groupRef.current?.scale, {
      duration: 2,
      y: groupRef.current?.scale.y * scaleMultiplier,
      x: groupRef.current?.scale.x * scaleMultiplier,
      z: groupRef.current?.scale.z * scaleMultiplier,
      onComplete: () => {
        // setStage(stageKeys.front);
      },
    }, '-=2');

    tlRef.current.to(groupRef.current?.rotation, {
      duration: 2, y: -Math.PI / 9,
    });

    tlRef.current.to(groupRef.current?.scale, {
      duration: 2,
      y: groupRef.current?.scale.y * 1.3,
      x: groupRef.current?.scale.x * 1.3,
      z: groupRef.current?.scale.z * 1.3,
    }, '-=2');

    tlRef.current.to(groupRef.current?.rotation, {
      duration: 2, y: -Math.PI / 2,
    });

    tlRef.current.add(stageKeys.rightSide);
    tlRef.current.to(groupRef.current?.rotation, {
      duration: 2, y: -Math.PI / 2, onComplete: () => {
        // setStage(stageKeys.rightSide);
      }
    });

    tlRef.current.to(groupRef.current?.rotation, {
      duration: 2, y: -Math.PI, onComplete: () => {
        // setStage(stageKeys.back);
      }
    });
    tlRef.current.add(stageKeys.back);
  }, []);

  return (<group dispose={null} ref={groupRef}>
    {context.helpers && <RotationOrigin/>}
    {context.body && <>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stand.geometry}
        position={[0.01, -0.662, -0.409]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Magnet_1_border.geometry}
        position={[1.117, 0.566, -0.501]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Magnet_1.geometry}
        position={[1.075, 0.524, -0.485]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Magnet_2_border.geometry}
        material={nodes.Magnet_2_border.material}
        position={[-1.149, 0.591, -0.461]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Magnet_2.geometry}
        material={nodes.Magnet_2.material}
        position={[-1.149, 0.591, -0.461]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back_base.geometry}
        position={[0.1, 0.47, -0.403]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mute_btn_base.geometry}
        position={[1.727, -0.043, -0.124]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mute_btn_top.geometry}
        position={[1.738, -0.043, -0.124]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button_1.geometry}
        position={[-1.21, -0.637, 0.156]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button_2.geometry}
        position={[-0.582, -0.659, 0.156]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button_3.geometry}
        position={[0.02, -0.657, 0.158]}>
        <BaseMaterial/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button_4.geometry}
        position={[0.933, -0.65, 0.158]}>
        <BaseMaterial color={'#c55900'}/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Base.geometry}
        position={[0.019, 0.018, 0.018]}>
        <BaseMaterial/>
      </mesh>
    </>}
    {context.screen && <Screen geometry={nodes.Clocks_matrix.geometry}/>}
  </group>);
}

function BaseMaterial({color, ...props}) {

  const context = useContext(rootContext);
  return <meshPhysicalMaterial color={color ?? "#ffffff"}
                               side={THREE.DoubleSide}
                               wireframe={context.wireframe}
                               reflectivity={.1}
                               {...props}/>
}

function Screen({geometry}) {
  return <group position={[0, 0.326, 0.027]}>
    <mesh
      castShadow
      receiveShadow
      geometry={geometry}
    >
      <meshStandardMaterial color={SCREEN_COLOR} roughness={.2}/>
    </mesh>
    {/*<mesh*/}
    {/*  castShadow*/}
    {/*  receiveShadow*/}
    {/*  geometry={nodes.Plactic_glass.geometry}*/}
    {/*  position={[0, 0.337, 0.061]}>*/}
    {/*  <BaseMaterial transparent={true} opacity={0.2} roughness={1}/>*/}
    {/*</mesh>*/}
    <group position={[-.84, .06, 0.029]}>
      <Time/>
    </group>
  </group>
}

function Time() {
  const FONT_PATH = './fonts/digital-7.ttf';
  const FONT_SIZE = 1.0;
  const FONT_COLOR = '#000000';
  const BACK_FONT_OPACITY = 0.08;
  const FONT_BACK_COLOR = FONT_COLOR;
  const [hh, updateHours] = useState('23');
  const [mm, updateMinutes] = useState('59');
  const [ss, updateSecs] = useState('00');

  useFrame(() => {

    const time = new Date();
    const minutes = String(time.getMinutes()).padStart(2, '0').slice(-2);
    const hours = String(time.getHours()).padStart(2, '0').slice(-2);
    const seconds = String(time.getSeconds()).padStart(2, '0').slice(-2);
    updateHours(hours);
    updateMinutes(minutes);
    updateSecs(seconds);
  });
  const context = useContext(rootContext);
  const groupRef = useRef();
  useHelper(context.helpers ? groupRef : undefined, THREE.BoxHelper, 'red');

  return <group ref={groupRef}>
    <group position={[0, 0, 0.003]}>
      <Text font={FONT_PATH}
            color={FONT_COLOR}
            text={hh}
            fontSize={FONT_SIZE}/>
      <Text color={FONT_COLOR}
            font={FONT_PATH}
            text={':'}
            position={[0.5, 0, 0]}
            fontSize={FONT_SIZE}/>
      <Text font={FONT_PATH}
            color={FONT_COLOR}
            text={mm}
            position={[1.0, 0, 0]}
            fontSize={FONT_SIZE}/>
      <Text font={FONT_PATH}
            color={FONT_COLOR}
            text={ss}
            position={[1.8, -.14, 0]}
            fontSize={FONT_SIZE / 1.5}/>
    </group>
    <group position={[0, 0, 0.001]}>
      <Text font={FONT_PATH}
            color={FONT_BACK_COLOR}
            text={'00'}
            fillOpacity={BACK_FONT_OPACITY}
            fontSize={FONT_SIZE}/>
      <Text color={FONT_BACK_COLOR}
            font={FONT_PATH}
            text={':'}
            fillOpacity={BACK_FONT_OPACITY}
            position={[0.5, 0, 0]}
            fontSize={FONT_SIZE}/>
      <Text font={FONT_PATH}
            fillOpacity={BACK_FONT_OPACITY}
            color={FONT_BACK_COLOR}
            text={'00'}
            position={[1.0, 0, 0]}
            fontSize={FONT_SIZE}/>
      <Text font={FONT_PATH}
            color={FONT_BACK_COLOR}
            text={'00'}
            fillOpacity={BACK_FONT_OPACITY}
            position={[1.8, -.14, 0]}
            fontSize={FONT_SIZE / 1.5}/>
    </group>
  </group>
}

useGLTF.preload("./models/clocks.gltf");
