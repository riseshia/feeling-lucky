/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Card, Elevation, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FLTypes } from "~types";
import { getFetchDocId } from "~DocIdStore";
import { useState, useCallback, useEffect } from "react";
import { fetchQuotations } from "~api/quotations";
import { DataStore } from "~DataStore";
import DataCacheStore from "~DataCacheStore";

const shuffleButtonStyle = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-radius: 0;
`;

const textStyle = css`
  p {
    margin: 2px 0 2px 0;
    min-height: 10px;
    line-height: 1.4;
  }
`;

type Props = {
  routeInfo: FLTypes.RouteInfo;
};

const dataStore = new DataStore();

export const QuotationBox = (props: Props) => {
  const { routeInfo } = props;
  const fetchDocId = getFetchDocId();

  if (routeInfo.currentPath == "QuotationBox" && !fetchDocId) {
    routeInfo.routePath("FetchDocIdForm");
  }

  const [picked, setPicked] = useState("Now loading...");

  const shuffleOnClick = useCallback(() => setPicked(dataStore.pick()), []);

  useEffect(() => {
    if (DataCacheStore.hasItems()) {
      dataStore.update(DataCacheStore.getItems());
    }
    setPicked(dataStore.pick());
    if (fetchDocId) {
      fetchQuotations(fetchDocId).then(data => {
        dataStore.update(data);
        if (DataCacheStore.getItems().length == 0) {
          setPicked(dataStore.pick());
        }
        DataCacheStore.saveItems(data);
      });
    }
  }, [fetchDocId]);

  return (
    <div>
      <Card interactive={false} elevation={Elevation.ZERO} css={textStyle}>
        {picked.split("\n").map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </Card>

      <Button
        rightIcon={IconNames.RANDOM}
        large
        intent={Intent.PRIMARY}
        onClick={shuffleOnClick}
        css={shuffleButtonStyle}
        text="Next"
      />
    </div>
  );
};
