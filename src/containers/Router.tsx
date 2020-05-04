import { App } from "./App"
import { DataStore } from "~DataStore";
import React from "react";

const dataStore = new DataStore();
dataStore.update(["Now loading..."]);

export const Router = () => {
  return <App dataStore={dataStore} />;
};
