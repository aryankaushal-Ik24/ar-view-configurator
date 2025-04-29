

import React, { Suspense, useContext, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { ConfigurationContext } from "./context/Configuration";
import { Interface } from "./components/Interface";
import { LoadingScreen } from "./components/LoadingScreen";
import QrCodePopup from "./components/QrCodePopup";
import { TableModel } from "./components/Tablemodel";
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { useLocation } from "react-router-dom";



function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const ResponsiveQrCodePopup = ({ url, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">View in AR</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-4 text-center">Scan this QR code with your mobile device to view the table in AR</p>
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`} 
            alt="QR Code" 
            className="mb-4"
          />
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Open directly
          </a>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isQropen, setIsQropen] = useState(false);
  const { leg, tableWidth, legColor } = useContext(ConfigurationContext);
  const [modelUrl, setModelUrl] = useState(null);
  const tableRef = useRef();
  const location = useLocation();
  const isMobile = isMobileDevice();
  const [isLoading, setIsLoading] = useState(true);
  const [arView, setArView] = useState(false);

  // Import model-viewer web component
useEffect(() => {
  // Add the model-viewer script to the document if it doesn't exist
  if (!document.querySelector('script[src="https://unpkg.com/@google/model-viewer"]')) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.type = 'module';
    document.head.appendChild(script);
  }
}, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOnClick = () => {
    if (tableRef.current) {
      
      const exporter = new GLTFExporter();
      if (isMobile) {
        tableRef.current.traverse((child) => {
          if (child.isMesh) {
            // 🎨 Apply legColor to 'Metal' materials
            if (child.material?.name === 'Metal' && legColor) {
              child.material.color.set(legColor);
            }
      
            // 📏 Scale the 'Plate'
            if (child.name === 'Plate' && tableWidth) {
              child.scale.set(tableWidth / 50, 1, 1);
            }
      
            // 🦿 Toggle leg visibility
            if (
              child.name.startsWith('Legs01') ||
              child.name.startsWith('Legs02') ||
              child.name.startsWith('Legs03')
            ) {
              const currentLegName = `Legs0${leg + 1}`; // 0-based to Legs01
              child.visible = child.name.startsWith(currentLegName);
            }
          }
        });
        exporter.parse(
          tableRef.current,
          (gltf) => {
            const blob = new Blob([JSON.stringify(gltf)], { type: "application/json" });
            console.log("blll",blob);
            const blobUrl = URL.createObjectURL(blob);
            console.log("Blob URL:", blobUrl);
            setModelUrl(blobUrl);
            setArView(true);
          },
          { binary: true }
        );
      }
      else {
        exporter.parse(
          tableRef.current,
          (gltf) => {
            const blob = new Blob([JSON.stringify(gltf)], { type: "application/json" });
            console.log("blll",blob);
            const blobUrl = URL.createObjectURL(blob);
            console.log("Blob URL:", blobUrl);
            
            const params = new URLSearchParams({
              leg,
              tableWidth,
              legColor,
            });
            
            const fullUrl = `${blobUrl}#${params.toString()}`;
            console.log("Full URL with params:", fullUrl.slice(5));
            setModelUrl(fullUrl.slice(5));
            setIsQropen(true);
  
          },
          { binary: false }
        );
      }
    }
  };

  const closeQrPopup = () => {
    setIsQropen(false);
  };

  const closeArView = () => {
    setArView(false);
  };

  // AR View for mobile devices
  if (isMobile && arView && modelUrl) {
    console.log("Model URL for mobile:", modelUrl);
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <model-viewer
          src={modelUrl}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          ios-src={modelUrl}
          alt="3D table model"
          ar-scale="fixed"
          exposure="0.5"
          style={{ width: '100%', height: '100%' }}
          ar-status="not-presenting"
        >
          <button 
            slot="ar-button" 
            style={{
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: 'none',
              marginLeft:'40%',
              padding: '8px 16px',
              color: 'black',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
            👋 Activate AR
          </button>
        </model-viewer>
        <button
          onClick={closeArView}
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          ←
        </button>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {isQropen ? (
            <ResponsiveQrCodePopup url={modelUrl} onClose={closeQrPopup} />
          ) : (
            <>
              <Canvas
                gl={{ antialias: false, preserveDrawingBuffer: true }}
                shadows
                camera={{ position: [4, 0, 6], fov: 35 }}
                style={{ 
                  position: 'fixed', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%',
                  touchAction: 'none' 
                }}
              >
                <group position={[0, -0.75, 0]}>
                  <Center top>
                    <TableModel ref={tableRef} />
                  </Center>
                  <ContactShadows opacity={0.5} position-z={0.2} />
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[0, 10, 5]} intensity={1} castShadow />
                </group>
                <Environment
                  background={false}
                  near={1}
                  far={1000}
                  resolution={256}
                  preset="city"
                />
                <OrbitControls
                  makeDefault
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2}
                  enablePan={!isMobile}
                  enableZoom={true}
                  maxDistance={10}
                  minDistance={2}
                />
                <color attach="background" args={["white"]} />
              </Canvas>
              <Interface onQrClick={handleOnClick} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;