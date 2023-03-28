import { useContext } from "react";
import { AppContext } from "../AppContext.js/AppContext";
import { Suspense } from "react";
import React from "react";
import { DelayedFallback } from "./DelayedFallback";
import { Typography } from "@mui/material";

export const UserInfo = () => {
  const { isUserLogged } = useContext(AppContext);

  return (
    <Suspense
      fallback={
        <Typography>
          <DelayedFallback />
        </Typography>
      }
    >
      {isUserLogged ? (
        <Box>
          <Pulpit />
        </Box>
      ) : (
        console.log("erorrs")
      )}
    </Suspense>
  );
};

export default UserInfo;
