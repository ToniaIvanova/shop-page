import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { ColorModeContext } from "../App";

export const ModeIcon = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      sx={{ mr: 1, mt: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7 color="primary" />
      ) : (
        <Brightness4 color="primary" />
      )}
    </IconButton>
  );
};
