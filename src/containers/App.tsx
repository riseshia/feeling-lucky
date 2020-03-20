/** @jsx jsx */
import { useState, useEffect } from "react";

import { css, jsx, Global } from "@emotion/core";
import { Button, Intent, Colors, Navbar, Alignment } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { QuotationBox } from "./QuotationBox";
import { FetchDocIdForm } from "./FetchDocIdForm";

import { fetchQuotations } from "../api/quotations";

import { DataStore } from "~DataStore";

const globalStyle = css`
  body {
    background-color: ${Colors.LIGHT_GRAY5};
    font-size: 16px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

const shuffleButtonStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-radius: 0;
`;

type Url = string | null;

export const App = (props: { dataStore: DataStore }) => {
  const [picked, setPicked] = useState(props.dataStore.pick());
  const [fetchDocId, setFetchDocId] = useState(
    localStorage.getItem("fetchDocId"),
  );
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
  const saveDataToLocalStorage = (values: string[]): string[] => {
    localStorage.setItem("dataCache", values.join("|||"));
    return values;
  };

  useEffect(() => {
    let initData = ["Now loading..."];
    if (localStorage.getItem("dataCache")) {
      initData = localStorage.getItem("dataCache")!.split("|||");
    }
    props.dataStore.update(initData);
    setPicked(props.dataStore.pick());
    if (fetchDocId) {
      fetchQuotations(fetchDocId)
        .then(data => saveDataToLocalStorage(data))
        .then(data => props.dataStore.update(data))
        .then(() =>
          props.dataStore.pick() === "Now loading..."
            ? setPicked(props.dataStore.pick())
            : null,
        );
    }
  }, [props.dataStore, setPicked, fetchDocId]);

  return (
    <section>
      <Navbar className="bp3-dark" fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Lucky</Navbar.Heading>
          <Button minimal icon={IconNames.RESET} onClick={resetFetchDocId} />
        </Navbar.Group>
      </Navbar>
      <Global styles={globalStyle} />

      {fetchDocId ? (
        <QuotationBox text={picked} />
      ) : (
        <FetchDocIdForm setFetchDocId={setFetchDocIdWithLocalStorage} />
      )}
      <Button
        rightIcon={IconNames.RANDOM}
        large
        intent={Intent.PRIMARY}
        onClick={shuffleOnClick}
        css={shuffleButtonStyle}
        text="Next"
      />
    </section>
  );
};
