/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Card, Elevation } from "@blueprintjs/core";

const textStyle = css`
  p {
    margin: 2px 0 2px 0;
    min-height: 10px;
    line-height: 1.4;
  }
`;

export const QuotationBox = (props: { text: string }) => (
  <Card interactive={false} elevation={Elevation.ZERO} css={textStyle}>
    {props.text.split("\n").map((item, idx) => (
      <p key={idx}>{item}</p>
    ))}
  </Card>
);
