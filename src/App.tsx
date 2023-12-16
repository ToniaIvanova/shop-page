import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Shop } from "./pages/Shop/Shop";
import { SnackbarProvider } from "notistack";
import { PageContainer } from "./common/PageContainer";
import { Product } from "./pages/Product/Product";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const BreadCrumbsContext = React.createContext({
  changeCategoryBreadcrumb: (newValue: string) => {},
  changeProductBreadcrumb: (newValue: string) => {},
  categoryBreadcrumb: "",
  productBreadcrumb: "",
});

export const App = () => {
  const [mode, setMode] = useLocalStorage<"light" | "dark">("mode", "light");
  const [categoryBC, setCategoryBC] = useLocalStorage("categoryBC", "");
  const [productBC, setProductBC] = useLocalStorage("productBC", "");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [setMode]
  );

  const pageBreadcrumbs = React.useMemo(
    () => ({
      changeCategoryBreadcrumb: (newValue: string) => {
        setCategoryBC(newValue);
      },
      changeProductBreadcrumb: (newValue: string) => {
        setProductBC(newValue);
      },
      categoryBreadcrumb: categoryBC,
      productBreadcrumb: productBC,
    }),
    [categoryBC, productBC, setCategoryBC, setProductBC]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <BreadCrumbsContext.Provider value={pageBreadcrumbs}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <RouterProvider
              router={createBrowserRouter([
                {
                  path: "/",
                  element: (
                    <PageContainer>
                      <Shop />
                    </PageContainer>
                  ),
                },
                {
                  path: "product/:id",
                  element: (
                    <PageContainer>
                      <Product />
                    </PageContainer>
                  ),
                },
                {
                  path: "*",
                  element: <Navigate to="/" replace />,
                },
              ])}
            />
          </SnackbarProvider>
        </ThemeProvider>
      </BreadCrumbsContext.Provider>
    </ColorModeContext.Provider>
  );
};

// export default App;
