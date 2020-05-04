import React, { useState } from "react";

import { App } from "./App"
import { DataStore } from "~DataStore";

const dataStore = new DataStore();
dataStore.update(["Now loading..."]);

const chooseComponent = (currentPath: string) => {
  if (currentPath == "App") {
    return <App />;
  }
}

export const Router = () => {
  const [currentPath] = useState("App");
  return chooseComponent(currentPath);
};
