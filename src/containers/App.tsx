/** @jsx jsx */
import { useState, useEffect, useCallback } from "react";

import { css, jsx, Global } from "@emotion/core";
import { Button, Intent, Colors, Navbar, Alignment } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { QuotationBox } from "./QuotationBox";
import { FetchDocIdForm } from "./FetchDocIdForm";

import { fetchQuotations } from "../api/quotations";

import { useFetchDocId } from "../hooks/fetchDocId";

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

export const App = () => {
  const dataStore = new DataStore();
  const [picked, setPicked] = useState(dataStore.pick());
  const [getFetchDocId, setFetchDocId] = useFetchDocId();
  const fetchDocId = getFetchDocId();
  const shuffleOnClick = useCallback(() => setPicked(dataStore.pick()), []);
  const resetFetchDocId = () => setFetchDocId(null);
  const saveDataToLocalStorage = (values: string[]): string[] => {
    localStorage.setItem("dataCache", values.join("|||"));
    return values;
  };

  useEffect(() => {
    let initData = ["Now loading..."];
    if (localStorage.getItem("dataCache")) {
      initData = localStorage.getItem("dataCache")!.split("|||");
    }
    dataStore.update(initData);
    setPicked(dataStore.pick());
    if (fetchDocId) {
      fetchQuotations(fetchDocId)
        .then(data => saveDataToLocalStorage(data))
        .then(data => dataStore.update(data))
        .then(() =>
          dataStore.pick() === "Now loading..."
            ? setPicked(dataStore.pick())
            : null,
        );
    }
  }, [dataStore, setPicked, fetchDocId]);

  return (
    <section>
      <Navbar className="bp3-dark" fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Lucky</Navbar.Heading>
          <Button minimal icon={IconNames.EDIT} onClick={resetFetchDocId} />
        </Navbar.Group>
      </Navbar>
      <Global styles={globalStyle} />

      {fetchDocId ? (
        <QuotationBox text={picked} />
      ) : (
        <FetchDocIdForm />
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
