import { useSnackbar } from "notistack";
import { useCallback } from "react";

const autoHideDuration = 6000;

export const useFeedError = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useCallback(
    (message: string) =>
      enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration,
      }),
    [enqueueSnackbar]
  );
};
