import { styled, Paper, CircularProgress } from "@mui/material";

export const LoadingPage = () => {
  return (
    <LoadingPaper>
      <CircularProgress color="primary" />
    </LoadingPaper>
  );
};

const LoadingPaper = styled(Paper)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  minHeight: 500,
});
