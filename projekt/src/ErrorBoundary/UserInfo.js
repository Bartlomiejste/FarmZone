import { useContext } from "react";
import { AppContext } from "../AppContext.js/AppContext";
import { Suspense } from "react";
import React from "react";
import { DelayedFallback } from "./DelayedFallback";

export const UserInfo = () => {
  const { isUserLogged } = useContext(AppContext);

  return (
    <Suspense
      fallback={
        <Box>
          <DelayedFallback />
        </Box>
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
