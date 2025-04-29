
import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ConfigurationContext = createContext();

export const ConfigurationProvider = ({ children }) => {
  const location = useLocation();

  const [leg, setLeg] = useState(0); 
  const [tableWidth, setTableWidth] = useState(50); 
  const [legColor, setLegColor] = useState('#777777'); 
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));

    const urlLeg = params.get('leg');
    const urlTableWidth = params.get('tableWidth');
    const urlLegColor = params.get('legColor');

    if (urlLeg !== null) setLeg(parseInt(urlLeg));
    if (urlTableWidth !== null) setTableWidth(parseFloat(urlTableWidth));
    if (urlLegColor !== null) setLegColor(urlLegColor);
    
    
  }, []); 
  return (
    <ConfigurationContext.Provider value={{ leg, setLeg, tableWidth, setTableWidth, legColor, setLegColor }}>
      {children}
    </ConfigurationContext.Provider>
  );
};
