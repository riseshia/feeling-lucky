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
    font-size: 20px;
  }
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
  const extractDataFormDoc = (data: any) => {
    const targetRows = data.feed.entry.filter(
      (row: any) => row.gs$cell.col == "1",
    );
    return targetRows.map((row: any) => row.content.$t);
  };
  const saveDataToLocalStorage = (values: Array[string]): Array[string] => {
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
      fetch(
        `https://spreadsheets.google.com/feeds/cells/${fetchDocId}/1/public/full?alt=json`,
      )
        .then(res => res.json())
        .then(data => extractDataFormDoc(data))
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
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Lucky</Navbar.Heading>
          <Button minimal icon={IconNames.RESET} onClick={resetFetchDocId} />
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
