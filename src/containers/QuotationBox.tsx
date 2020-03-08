/** @jsx jsx */

import { jsx } from "@emotion/core";

export const QuotationBox = (props: { text: string }) => (
  <section>{props.text}</section>
);
