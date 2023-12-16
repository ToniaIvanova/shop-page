import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Product as ProductType } from "../../api/types";
import { useFeedError } from "../../utils/feedHooks";
import { getProductById } from "../../api/fetchProducts";
import { LoadingPage } from "../../common/LoadingPage";
import { StarRate } from "@mui/icons-material";

export const Product: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(id);
  const feedError = useFeedError();

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      if (id && parseInt(id)) {
        getProductById(parseInt(id))
          .then((res) => {
            setProduct(res);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            feedError(
              typeof err === "string" ? err : "Something go wrong, try again"
            );
          });
      }
    };
    getProduct();
  }, [feedError, id, setIsLoading, setProduct]);

  if (isLoading || !product) {
    return (
      <main>
        <LoadingPage />
      </main>
    );
  }

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} lg={6} spacing={3}>
            <Typography sx={{paddingBottom: "20px"}} variant="h5">{product.title}</Typography>
            <Typography sx={{paddingBottom: "20px"}}>{product.description}</Typography>
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
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
