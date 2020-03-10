/** @jsx jsx */

import { jsx } from "@emotion/core";
import { Card, Elevation } from "@blueprintjs/core";

export const QuotationBox = (props: { text: string }) => (
  <Card interactive={false} elevation={Elevation.ZERO}>
    {props.text}
  </Card>
);
