import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const { progress, loaded, total } = useProgress();
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);
  
  if (!show) return null;
  
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #a5d8ff 0%, #d8b4fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      zIndex: 1000,
    }}>
      <h2 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>
        Loading Table Configurator
      </h2>
      <div style={{
        width: '200px',
        height: '5px',
        background: 'rgba(255,255,255,0.3)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: '#fff',
          transition: 'width 0.3s ease',
        }}/>
      </div>
      <p style={{ color: '#1a1a1a', marginTop: '0.5rem' }}>
        {Math.round(progress)}% loaded
      </p>
    </div>
  );
}