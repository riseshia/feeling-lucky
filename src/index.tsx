import React from "react";
import { render } from "react-dom";
import { App } from "~containers/App";
import { DataStore } from "~DataStore";

const $app = document.getElementById("root")!;

const dataStore = new DataStore();
dataStore.update(["Now loading..."]);

function renderApp() {
  render(<App dataStore={dataStore} />, $app);
}

renderApp();

if (module.hot) {
  module.hot.accept(renderApp);
}
