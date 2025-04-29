
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
  Drawer,
  Divider
} from "@mui/material";
import { useContext, useState } from "react";
import { ConfigurationContext } from "../context/Configuration";


export const Interface = ({ onQrClick }) => {
  const { leg, setLeg, tableWidth, setTableWidth, legColor, setLegColor } = useContext(ConfigurationContext);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const ConfigControls = () => (
    <Stack spacing={3} width={isMobile ? "100%" : "280px"}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Table Configurator</Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer} edge="end">
            close
          </IconButton>
        )}
      </Box>
      
      <Divider />
      
      <Box className="glass" p={2}>
        <FormControl fullWidth>
          <FormLabel>Table width</FormLabel>
          <Slider
            min={50}
            max={200}
            value={tableWidth}
            onChange={(e) => setTableWidth(e.target.value)}
            valueLabelDisplay="auto"
          />
        </FormControl>
      </Box>
      
      <Box className="glass" p={2}>
        <FormControl fullWidth>
          <FormLabel>Legs Layout</FormLabel>
          <RadioGroup
            value={leg}
            onChange={(e) => setLeg(parseInt(e.target.value))}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="Standard"
            />
            <FormControlLabel value={1} control={<Radio />} label="Solid" />
            <FormControlLabel value={2} control={<Radio />} label="Design" />
          </RadioGroup>
        </FormControl>
      </Box>
      
      <Box className="glass" p={2}>
        <FormControl fullWidth>
          <FormLabel>Legs Color</FormLabel>
          <RadioGroup
            value={legColor}
            onChange={(e) => setLegColor(e.target.value)}
          >
            <FormControlLabel
              value={"#777777"}
              control={<Radio />}
              label="Black"
            />
            <FormControlLabel
              value={"#ECECEC"}
              control={<Radio />}
              label="Chrome"
            />
            <FormControlLabel
              value={"#C9BD71"}
              control={<Radio />}
              label="Gold"
            />
            <FormControlLabel
              value={"#C9A3B9"}
              control={<Radio />}
              label="Pink Gold"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      
      <Box className="glass" p={2} display="flex" justifyContent="center">
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%"
          }}
          onClick={onQrClick}
        >
          View in AR
        </button>
      </Box>
    </Stack>
  );

  if (isMobile) {
    return (
      <>
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 100,
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
              width: 56,
              height: 56,
              boxShadow: 3
            }}
          >
            settings
          </IconButton>
        </Box>
        
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={toggleDrawer}
          PaperProps={{
            sx: {
              maxHeight: "80vh",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 2,
              paddingTop: 1
            }
          }}
        >
          <ConfigControls />
        </Drawer>
      </>
    );
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 10
      }}
      p={3}
    >
      <ConfigControls />
    </Box>
  );
};