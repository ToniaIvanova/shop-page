import React, { useState, useCallback } from "react";

import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Paper,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Search } from "./Search";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const [t] = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      console.log(event.currentTarget.innerText);
      setAnchorEl(null);
    },
    []
  );
  // const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));

  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: "space-between", height: "64px" }}>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
        >
          {t("header.title")}
        </Typography>
        <Search />
        <IconButton onClick={handleClick} sx={{ ml: "15px" }}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiMenu-list": {
              padding: 0,
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Paper sx={{ width: 200 }}>
            <MenuItem onClick={handleMenuClick}>
              {t("header.menuItems.profile")}
            </MenuItem>
            <MenuItem onClick={handleMenuClick}>
              {t("header.menuItems.cart")}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClick}>
              {t("header.menuItems.settings")}
            </MenuItem>
            <MenuItem onClick={handleMenuClick}>
              {t("header.menuItems.logout")}
            </MenuItem>
          </Paper>
        </Menu>{" "}
      </Toolbar>
    </AppBar>
  );
};
