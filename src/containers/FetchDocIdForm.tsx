/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { ControlGroup, InputGroup, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useState } from "react";
import { useFetchDocId } from "~hooks/fetchDocId";
import { RouteContext } from "~contexts/route-context";

const formStyle = css`
  padding: 10px;
`;

export const FetchDocIdForm = ({ routePage }) => {
  const [_, setFetchDocId] = useFetchDocId();
  const updateFetchDocId = () => {
    setFetchDocId(docId);
    routePage("App1");
  }

  const [docId, setDocId] = useState("");
  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => setDocId(event.target.value);

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
