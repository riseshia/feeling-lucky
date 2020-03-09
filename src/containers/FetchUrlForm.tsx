/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { ControlGroup, InputGroup, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useState } from "react";

const formStyle = css`
  padding: 10px;
`;

export const FetchUrlForm = (props: { setFetchUrl: any }) => {
  const [url, setUrl] = useState("");
  const updateFetchUrl = () => props.setFetchUrl(url);
  const onChangeUrl = (event: any) => setUrl(event.target.value);

  return (
    <section css={formStyle}>
      <ControlGroup>
        <InputGroup
          id="text-input"
          fill
          placeholder="https://..."
          value={url}
          onChange={onChangeUrl}
        />
        <Button
          intent={Intent.PRIMARY}
          icon={IconNames.ARROW_RIGHT}
          onClick={updateFetchUrl}
        />
      </ControlGroup>
    </section>
  );
};
