import React from "react";
import { render } from "react-dom";
import { Router } from "~containers/Router";

const $app = document.getElementById("root")!;

function renderApp() {
  render(<Router />, $app);
}

renderApp();

if (module.hot) {
  module.hot.accept(renderApp);
}
