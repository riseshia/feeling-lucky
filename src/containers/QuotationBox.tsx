/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Card, Elevation } from "@blueprintjs/core";

const textStyle = css`
  white-space: pre;
`;

export const QuotationBox = (props: { text: string }) => (
  <Card interactive={false} elevation={Elevation.ZERO} css={textStyle}>
    {props.text}
  </Card>
);
