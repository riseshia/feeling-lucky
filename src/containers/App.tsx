/** @jsx jsx */
import { useState, useEffect, useCallback } from "react";

import { css, jsx, Global } from "@emotion/core";
import { Button, Colors, Navbar, Alignment } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { DataStore } from "~DataStore";
import { RouteContext } from "~contexts/route-context";

import { QuotationBox } from "./QuotationBox";
import { FetchDocIdForm } from "./FetchDocIdForm";

import { fetchQuotations } from "../api/quotations";
import { useFetchDocId } from "../hooks/fetchDocId";

const globalStyle = css`
  body {
    background-color: ${Colors.LIGHT_GRAY5};
    font-size: 16px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

type Url = string | null;
const dataStore = new DataStore();

export const App = () => {
  const [picked, setPicked] = useState("Now loading...");
  const [getFetchDocId, setFetchDocId] = useFetchDocId();
  const fetchDocId = getFetchDocId();

  const resetFetchDocId = () => setFetchDocId(null);
  const saveDataToLocalStorage = (values: string[]): string[] => {
    localStorage.setItem("dataCache", values.join("|||"));
    return values;
  };
  const shuffleOnClick = useCallback(() => setPicked(dataStore.pick()), []);

  useEffect(() => {
    if (localStorage.getItem("dataCache")) {
      const initData = localStorage.getItem("dataCache")!.split("|||");
      dataStore.update(initData);
    }
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
  }, [setPicked, fetchDocId]);

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
        <QuotationBox text={picked} shuffleOnClick={shuffleOnClick} />
      ) : (
        <RouteContext.Consumer>
          {({ routePage }) => <FetchDocIdForm routePage={routePage} />}
        </RouteContext.Consumer>
      )}
    </section>
  );
};
