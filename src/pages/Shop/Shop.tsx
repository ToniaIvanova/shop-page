import React, { useState, useEffect, useContext } from "react";
import { Container, Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { useFeedError } from "../../utils/feedHooks";
import { getAllProducts, getProductsByCategory } from "../../api/fetchProducts";
import { LoadingPage } from "../../common/LoadingPage";
import { Product } from "../../api/types";
import { BreadCrumbsContext } from "../../App";

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const breadcrambs = useContext(BreadCrumbsContext);

  const feedError = useFeedError();

  useEffect(() => {
    const getProducts = async () => {
      setProducts([]);
      setIsLoading(true);
      const category = breadcrambs.categoryBreadcrumb.toLowerCase();
      if (category) {
        getProductsByCategory(category)
          .then((res) => {
            setProducts(res);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            feedError(
              typeof err === "string" ? err : "Something go wrong, try again"
            );
          });
      } else {
        getAllProducts()
          .then((res) => {
            setProducts(res);
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
    getProducts();
  }, [breadcrambs.categoryBreadcrumb, feedError, setIsLoading, setProducts]);

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {isLoading && <LoadingPage />}
        <Grid container spacing={2}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Grid>
      </Container>
    </main>
  );
};
