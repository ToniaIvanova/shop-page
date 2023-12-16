import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { getCategories } from "../api/fetchProducts";
import { Category } from "../api/types";
import { useFeedError } from "../utils/feedHooks";
import { capitalize } from "../utils/capitalize";
import { BreadCrumbsContext } from "../App";
import { useNavigate } from "react-router-dom";

type CategoriesDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const CategoriesDrawer: React.FC<CategoriesDrawerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const feedError = useFeedError();
  const breadcrumbs = useContext(BreadCrumbsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategoriesList = async () => {
      getCategories()
        .then((res) => {
          const capitalized = res.map((category) => capitalize(category));
          setCategories(capitalized);
        })
        .catch((err) => {
          console.log(err);
          feedError(
            typeof err === "string" ? err : "Something go wrong, try again"
          );
        });
    };
    getCategoriesList();
  }, [feedError]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const setCategory = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    breadcrumbs.changeCategoryBreadcrumb(event.currentTarget.innerText);
    breadcrumbs.changeProductBreadcrumb("");
    navigate("/");
  };

  return (
    <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {categories.map((text) => (
            <ListItem key={text} disablePadding onClick={setCategory}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
