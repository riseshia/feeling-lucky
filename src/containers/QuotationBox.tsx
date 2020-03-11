/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Card, Elevation } from "@blueprintjs/core";

const textStyle = css`
p { margin: 5px 0 5px 0; }
`;

export const QuotationBox = (props: { text: string }) => (
  <Card interactive={false} elevation={Elevation.ZERO} css={textStyle}>
    {props.text.split("\n").map((item) => (<p>{item}</p>))}
  </Card>
);
