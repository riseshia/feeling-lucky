import React, { useState, useContext } from "react";

import { App } from "./App"
import { DataStore } from "~DataStore";
import { RouteContext } from "~contexts/route-context";

const dataStore = new DataStore();
dataStore.update(["Now loading..."]);

const chooseComponent = (currentPath: string) => {
  if (currentPath == "App") {
    return <App />;
  }
}

export const Router = () => {
  const [currentPath, setCurrentPath] = useState("App");
  const currentComponent = chooseComponent(currentPath);
  const routeContextValue = {
    page: currentPath,
    routePage: setCurrentPath
  }

  return (
    <RouteContext.Provider value={routeContextValue}>
      {currentComponent}
    </RouteContext.Provider>
  );
};
