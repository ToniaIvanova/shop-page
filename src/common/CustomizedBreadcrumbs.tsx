import React, { useCallback, useContext } from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import { BreadCrumbsContext } from "../App";
import { useNavigate } from "react-router-dom";

export const CustomizedBreadcrumbs: React.FC<{
  openDrawer: (open: boolean) => void;
}> = ({ openDrawer }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const breadcrumbs = useContext(BreadCrumbsContext);
  const chooseCategory = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      openDrawer(true);
    },
    [openDrawer]
  );

  const onCategoryClick = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      if (breadcrumbs.productBreadcrumb) {
        breadcrumbs.changeProductBreadcrumb("");
        navigate("/");
      } else {
        chooseCategory(event);
      }
    },
    [breadcrumbs, chooseCategory, navigate]
  );

  const unsetCategory = () => {
    breadcrumbs.changeCategoryBreadcrumb("");
    breadcrumbs.changeProductBreadcrumb("");
    navigate("/");
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ p: "10px" }}>
      <StyledBreadcrumb
        component="a"
        label={t("shopPage.breadcrumbs.home")}
        icon={<HomeIcon fontSize="small" />}
        onClick={unsetCategory}
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
      />
      {!breadcrumbs.categoryBreadcrumb && (
        <StyledBreadcrumb
          label={t("shopPage.breadcrumbs.choose")}
          onClick={chooseCategory}
        />
      )}
      {!!breadcrumbs.categoryBreadcrumb && (
        <StyledBreadcrumb
          label={breadcrumbs.categoryBreadcrumb}
          onClick={onCategoryClick}
        />
      )}
      {!!breadcrumbs.productBreadcrumb && (
        <StyledBreadcrumb
          label={breadcrumbs.productBreadcrumb}
          sx={{
            width: "150px",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        />
      )}
    </Breadcrumbs>
  );
};

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;
