import React, { useState } from "react";

import { App } from "./App";

type RouteInfo = {
  currentPath: string;
  routePath: React.Dispatch<React.SetStateAction<string>>;
};

const chooseComponent = (routeInfo: RouteInfo) => {
  // if (routeInfo.currentPath == "App") {
  return <App routeInfo={routeInfo} />;
  // }
};

export const Router = () => {
  const [currentPath, setCurrentPath] = useState("QuotationBox");
  const routeInfo: RouteInfo = {
    currentPath: currentPath,
    routePath: setCurrentPath,
  };
  const currentComponent = chooseComponent(routeInfo);

  return currentComponent;
};
