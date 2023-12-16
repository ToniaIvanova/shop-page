import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Rating,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  FormLabel,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type GenderType = "female" | "male" | "other";

type FiltersDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const FiltersDrawer: React.FC<FiltersDrawerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [t] = useTranslation();

  const [rating, setRating] = useState<number | null>(null);
  const [gender, setGender] = useState<"female" | "male" | "other">("female");

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value as GenderType);
  };

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

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
      <Grid container sx={{ width: 250, p: "20px" }} spacing={3}>
        <Grid item>
          <Typography variant="h6">{t("shopPage.filter.title")}</Typography>
        </Grid>
        <Grid item>
          <Typography component="legend">
            {t("shopPage.filter.rate.label")}
          </Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Grid>

        <Grid item>
          <Typography component="legend">
            {t("shopPage.filter.gender.label")}
          </Typography>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={gender}
            onChange={handleChangeGender}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label={t("shopPage.filter.gender.female")}
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label={t("shopPage.filter.gender.male")}
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label={t("shopPage.filter.gender.other")}
            />
          </RadioGroup>
        </Grid>
        <Grid item>
          <FormGroup>
            <FormLabel component="legend">
              {t("shopPage.filter.brand.label")}
            </FormLabel>
            <FormControlLabel
              control={<Checkbox />}
              label={t("shopPage.filter.brand.boss")}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={t("shopPage.filter.brand.levis")}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={t("shopPage.filter.brand.guess")}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Drawer>
  );
};
