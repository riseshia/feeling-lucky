/** @jsx jsx */
import { useState, useEffect } from "react";

import { css, jsx, Global } from "@emotion/core";
import { Button, Intent, Colors, Navbar, Alignment } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { QuotationBox } from "./QuotationBox";
import { FetchDocIdForm } from "./FetchDocIdForm";

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
  const [fetchDocId, setFetchDocId] = useState(localStorage.getItem("fetchDocId"));
  const shuffleOnClick = () => setPicked(props.dataStore.pick());
  const setFetchDocIdWithLocalStorage = (value: Url) => {
    if (value == null) {
      localStorage.removeItem("fetchDocId");
    } else {
      localStorage.setItem("fetchDocId", value);
    }
    setFetchDocId(value);
  };
  const resetFetchDocId = () => setFetchDocIdWithLocalStorage(null);

  useEffect(() => {
    if (fetchDocId) {
      props.dataStore.update(["a", "b", "c", "d", "e"]);
      setPicked(props.dataStore.pick());
    }
  }, [props.dataStore, setPicked, fetchDocId]);

  return (
    <section>
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Lucky</Navbar.Heading>
          <Button
            minimal
            icon={IconNames.RESET}
            onClick={resetFetchDocId}
          />
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

      {fetchDocId ? (
        <QuotationBox text={picked} />
      ) : (
        <FetchDocIdForm setFetchDocId={setFetchDocIdWithLocalStorage} />
      )}
    </section>
  );
};
