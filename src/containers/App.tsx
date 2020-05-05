/** @jsx jsx */
import { useState, useEffect, useCallback } from "react";

import { css, jsx, Global } from "@emotion/core";
import { Button, Colors, Navbar, Alignment } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { DataStore } from "~DataStore";

import { QuotationBox } from "./QuotationBox";
import { FetchDocIdForm } from "./FetchDocIdForm";

import { fetchQuotations } from "../api/quotations";

import { getFetchDocId } from "~DocIdStore";
import { FLTypes } from "~types";

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

type Props = { routeInfo: FLTypes.RouteInfo };

export const App = (props: Props) => {
  const { routeInfo } = props;

  const [picked, setPicked] = useState("Now loading...");
  const fetchDocId = getFetchDocId();

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
          localStorage.getItem("dataCache")
            ? null
            : setPicked(dataStore.pick()),
        );
    }
  }, [setPicked, fetchDocId]);

  const routeToForm = () => {
    routeInfo.routePath("FetchDocIdForm");
  };

  if (routeInfo.currentPath == "QuotationBox" && !fetchDocId) {
    routeInfo.routePath("FetchDocIdForm");
    return null;
  }

  let targetComponent = null;
  if (routeInfo.currentPath == "FetchDocIdForm") {
    targetComponent = <FetchDocIdForm routeInfo={routeInfo} />;
  } else {
    targetComponent = (
      <QuotationBox
        text={picked}
        shuffleOnClick={shuffleOnClick}
        routeInfo={routeInfo}
      />
    );
  }

  return (
    <section>
      <Navbar className="bp3-dark" fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Lucky</Navbar.Heading>
          {fetchDocId ? (
            <Button minimal icon={IconNames.EDIT} onClick={routeToForm} />
          ) : null}
        </Navbar.Group>
      </Navbar>
      <Global styles={globalStyle} />

      {targetComponent}
    </section>
  );
};
