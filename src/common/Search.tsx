import React from "react";

import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

export const Search = () => {
  const [t] = useTranslation();
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", mr: "4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase sx={{ ml: 3, flex: 1 }} placeholder={t("header.search")} />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
