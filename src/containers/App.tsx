/** @jsx jsx */
import { useState, useEffect } from "react";

import { css, jsx, Global } from "@emotion/core";
import { Button, Intent, Colors, Navbar, Alignment } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { QuotationBox } from "./QuotationBox";
import { FetchUrlForm } from "./FetchUrlForm";

import { DataStore } from "~DataStore";

const globalStyle = css`
  body {
    background-color: ${Colors.LIGHT_GRAY5};
    font-size: 14px;
  }
`;

type Url = string | null;

export const App = (props: { dataStore: DataStore }) => {
  const [picked, setPicked] = useState(props.dataStore.pick());
  const [fetchUrl, setFetchUrl] = useState(localStorage.getItem("fetchUrl"));
  const shuffleOnClick = () => setPicked(props.dataStore.pick());
  const setFetchUrlWithLocalStorage = (value: string) => {
    // localStorage.setItem("fetchUrl", value);
    setFetchUrl(value);
  };

  useEffect(() => {
    props.dataStore.update(["a", "b", "c", "d", "e"]);
    setPicked(props.dataStore.pick());
  }, [props.dataStore, setPicked]);

  return (
    <section>
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Lucky</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button
            minimal
            icon={IconNames.RANDOM}
            intent={Intent.PRIMARY}
            onClick={shuffleOnClick}
          />
        </Navbar.Group>
      </Navbar>
      <Global styles={globalStyle} />

      {fetchUrl ? (
        <QuotationBox text={picked} />
      ) : (
        <FetchUrlForm setFetchUrl={setFetchUrlWithLocalStorage} />
      )}
    </section>
  );
};
