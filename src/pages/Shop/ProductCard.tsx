import React, { useCallback, useContext } from "react";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Product } from "../../api/types";
import { StarRate } from "@mui/icons-material";
import { BreadCrumbsContext } from "../../App";
import { capitalize } from "../../utils/capitalize";
import { useNavigate } from "react-router-dom";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const breadcrumbs = useContext(BreadCrumbsContext);

  const onCardClick = () => {
    console.log(product.title);
    breadcrumbs.changeCategoryBreadcrumb(capitalize(product.category));
    breadcrumbs.changeProductBreadcrumb(product.title);
    navigate(`/product/${product.id}`)
  };

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card
        sx={{
          height: "100%",
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea onClick={onCardClick}>
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: "56.25%",
              height: "200px",
            }}
            image={product.image}
          />
          <CardContent sx={{ height: "110px", whiteSpace: "nowrap" }}>
            <Typography
              gutterBottom
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {product.title}
            </Typography>
            <Typography gutterBottom>
              czk
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                {Math.trunc(product.price)}
              </span>
              {product.price.toFixed(2).slice(-3)}
            </Typography>
            <Typography sx={{ display: "flex", color: "gray" }}>
              {`${product.rating.count} sold`}
              <StarRate fontSize="small" sx={{ color: "orange", ml: "10px" }} />
              {product.rating.rate}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
