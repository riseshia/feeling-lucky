import React, { useState } from "react";

import { App } from "./App";
import { RouteContext } from "~contexts/route-context";

type RouteInfo = {
  currentPath: string,
  routePath: React.Dispatch<React.SetStateAction<string>>
}

const chooseComponent = (routeInfo: RouteInfo) => {
  // if (routeInfo.currentPath == "App") {
    return <App routeInfo={routeInfo} />;
  // }
};

export const Router = () => {
  const [currentPath, setCurrentPath] = useState("App");
  const routeInfo: RouteInfo = {
    currentPath: currentPath,
    routePath: setCurrentPath
  };
  const currentComponent = chooseComponent(routeInfo);
  const routeContextValue = {
    page: currentPath,
    routePage: setCurrentPath,
  };

  return (
    <RouteContext.Provider value={routeContextValue}>
      {currentComponent}
    </RouteContext.Provider>
  );
};
