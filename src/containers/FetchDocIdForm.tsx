/** @jsx jsx */

import { useState } from "react";

import { jsx, css } from "@emotion/core";
import { ControlGroup, InputGroup, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { getFetchDocId, setFetchDocId } from "~DocIdStore";

const formStyle = css`
  padding: 10px;
`;

type RouteInfo = {
  currentPath: string;
  routePath: React.Dispatch<React.SetStateAction<string>>;
};

type Props = { routeInfo: RouteInfo };

export const FetchDocIdForm = (props: Props) => {
  const updateFetchDocId = () => {
    setFetchDocId(docId);
    props.routeInfo.routePath("QuotationBox");
  };

  const [docId, setDocId] = useState(getFetchDocId() || "");
  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDocId(event.target.value);

  return (
    <section css={formStyle}>
      <ControlGroup>
        <InputGroup
          id="text-input"
          fill
          placeholder="google document id"
          value={docId}
          onChange={onChangeUrl}
        />
        <Button
          intent={Intent.PRIMARY}
          icon={IconNames.ARROW_RIGHT}
          onClick={updateFetchDocId}
        />
      </ControlGroup>
    </section>
  );
};
