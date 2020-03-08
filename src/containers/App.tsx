/** @jsx jsx */
import { useState, useEffect } from "react";

import { css, jsx, Global } from "@emotion/core";
import { Button, Intent, Colors } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { QuotationBox } from "~/containers/QuotationBox";
import { DataStore } from "~DataStore";

const globalStyle = css`
  body {
    background-color: ${Colors.LIGHT_GRAY5};
    font-size: 14px;
  }
`;

const appStyle = css`
  margin: 0 auto;
  width: 1200px;
`;

export const App = (props: { dataStore: DataStore }) => {
  const [picked, setPicked] = useState(props.dataStore.pick());
  const shuffleOnClick = () => setPicked(props.dataStore.pick());

  useEffect(() => {
    props.dataStore.update(["a", "b", "c", "d", "e"]);
    setPicked(props.dataStore.pick());
  }, [props.dataStore, setPicked]);

  return (
    <section css={appStyle}>
      <Global styles={globalStyle} />

      <QuotationBox text={picked} />

      <Button
        large
        icon={IconNames.THUMBS_UP}
        intent={Intent.SUCCESS}
        onClick={shuffleOnClick}
      >
        LGTM
      </Button>
    </section>
  );
};
