import React from "react";
import { Grid, IconButton, CssBaseline } from "@mui/material";
import { Header } from "./Header";
import { CustomizedBreadcrumbs } from "./CustomizedBreadcrumbs";
import { CategoriesDrawer } from "./CategoriesDrawer";
import { ModeIcon } from "./ModeIcon";
import { FilterAlt } from "@mui/icons-material";
import { FiltersDrawer } from "./FiltersDrawer";

type PageContainerProps = {
  children: string | JSX.Element | JSX.Element[]
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const [isCategoriesDrawer, setIsCategoriesDrawer] = React.useState(false);
  const [isFiltersDrawer, setIsFiltersDrawer] = React.useState(false);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container justifyContent="space-between">
        <CustomizedBreadcrumbs openDrawer={setIsCategoriesDrawer} />
        <Grid>
          <ModeIcon />
          <IconButton
            sx={{ mr: 1, mt:1 }}
            onClick={() => setIsFiltersDrawer(true)}
            color="inherit"
          >
            <FilterAlt color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <CategoriesDrawer
        isOpen={isCategoriesDrawer}
        setIsOpen={setIsCategoriesDrawer}
      />
      <FiltersDrawer isOpen={isFiltersDrawer} setIsOpen={setIsFiltersDrawer} />
      {children}
    </>
  );
};
