import { useContext } from 'react';
import { AppContext } from '../AppContext.js/AppContext';
import { Suspense } from "react";
import React from "react";
import {DelayedFallback} from './DelayedFallback'


export const UserInfo = () => {
  const { isUserLogged } = useContext(AppContext);
  

  return (
    <>  
    <Suspense fallback={<p><DelayedFallback/></p>}>
    {isUserLogged ?
      <div><Pulpit /></div> 
      : 
      console.log("erorrs")}
    </Suspense>
    </>
  );
}

export default UserInfo;