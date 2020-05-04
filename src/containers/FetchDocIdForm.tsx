/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { ControlGroup, InputGroup, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useState } from "react";

const formStyle = css`
  padding: 10px;
`;

export const FetchDocIdForm = (props: { setFetchDocId: any }) => {
  const [docId, setDocId] = useState("");
  const updateFetchDocId = () => props.setFetchDocId(docId);
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
