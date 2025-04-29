
import React, { forwardRef, useContext, useEffect, useMemo, useRef } from 'react'
import { CameraControls, useCursor, useGLTF } from '@react-three/drei'
import { ConfigurationContext } from '../context/Configuration.jsx'
import { useLocation } from 'react-router-dom'

export const TableModel = forwardRef((props, ref) => {
  const { nodes, materials, scene } = useGLTF('/models/Table.gltf')
  const { leg, tableWidth, legColor } = useContext(ConfigurationContext)

  


  useCursor()
  const controls = useRef()

  const box = useRef()
  const plateRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  
  useMemo(() => {
    materials.Metal.metalness = 1
  }, [nodes, materials])

  useEffect(() => {
    console.log({ leg, tableWidth, legColor, materialColor: materials.Metal.color })
  }, [leg, tableWidth, legColor, materials.Metal.color])
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(scene)
      } else {
        ref.current = scene
      }
    }
  }, [scene, ref])

  const handlePartClick = (partRef) => {
    if (controls.current && partRef.current) {
      controls.current.fitToBox(box.current, true)  
      if(partRef==leftLegRef || partRef==rightLegRef) {
        controls.current.smoothTime = 0.55 
        controls.current.rotateTo(-Math.PI, Math.PI, true)
      }
      else controls.current.rotateTo(0, Math.PI / 4, true)
    }
  }

  const renderLegs = () => {
    const legOffset = (tableWidth / 50) * 1.5;
    switch(leg) {
      case 0:
        return (
          <>
            <mesh
              ref={leftLegRef}
              geometry={nodes.Legs01Left.geometry}
              material={materials.Metal}
              material-color={legColor}
              position={[-legOffset, 0, 0]}
              castShadow
              receiveShadow
              onClick={(e) => {
                e.stopPropagation();
                handlePartClick(leftLegRef);
              }}
            />
            <mesh
              ref={rightLegRef}
              geometry={nodes.Legs01Right.geometry}
              material={materials.Metal}
              material-color={legColor}
              position={[legOffset, 0, 0]}
              castShadow
              receiveShadow
              onClick={(e) => {
                e.stopPropagation();
                handlePartClick(rightLegRef);
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <mesh
              ref={leftLegRef}
              geometry={nodes.Legs02Left.geometry}
              material={materials.Metal}
              material-color={legColor}
              position={[-legOffset, 0, 0]}
              castShadow
              receiveShadow
              onClick={(e) => {
                e.stopPropagation();
                handlePartClick(leftLegRef);
              }}
            />
            <mesh
              ref={rightLegRef}
              geometry={nodes.Legs02Right.geometry}
              material={materials.Metal}
              material-color={legColor}
              position={[legOffset, 0, 0]}
              castShadow
              receiveShadow
              onClick={(e) => {
                e.stopPropagation();
                handlePartClick(rightLegRef);
              }}
            />
          </>
        );
      case 2:
        return (
          <>
            <mesh
              ref={leftLegRef}
              geometry={nodes.Legs03Left.geometry}
              material={materials.Metal}
              material-color={legColor}
              position={[-legOffset, 0, 0]}
              castShadow
              receiveShadow
              onClick={(e) => {
                e.stopPropagation();
                handlePartClick(leftLegRef);
              }}
            />
            <mesh
              ref={rightLegRef}
              geometry={nodes.Legs03Right.geometry}
              material={materials.Metal}
              material-color={legColor}
              position={[legOffset, 0, 0]}
              castShadow
              receiveShadow
              onClick={(e) => {
                e.stopPropagation();
                handlePartClick(rightLegRef);
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <CameraControls ref={controls} />
      <group {...props} dispose={null}>
        <mesh ref={box}>
          <boxGeometry args={[tableWidth/15, 50/30, 50/20]} />
          <meshStandardMaterial color="orange" wireframe visible={false} />
        </mesh>
        <mesh
          ref={plateRef}
          geometry={nodes.Plate.geometry}
          material={materials.Plate}
          scale={[tableWidth/50, 1, 1]}
          receiveShadow
          castShadow
          onClick={(e) => {
            e.stopPropagation();
            handlePartClick(plateRef);
          }}
        />
        {renderLegs()}
      </group>
    </>
  )
})

useGLTF.preload('/models/Table.gltf')


