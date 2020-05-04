import React from "react";

const context = React.createContext({
  page: "",
  routePage: () => {},
});
export const RouteContext = context;