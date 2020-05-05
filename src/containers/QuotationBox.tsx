/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Card, Elevation, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FLTypes } from "~types";

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
  text: string;
  shuffleOnClick: any;
  routeInfo: FLTypes.RouteInfo;
};

export const QuotationBox = (props: Props) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.ZERO} css={textStyle}>
        {props.text.split("\n").map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </Card>

      <Button
        rightIcon={IconNames.RANDOM}
        large
        intent={Intent.PRIMARY}
        onClick={props.shuffleOnClick}
        css={shuffleButtonStyle}
        text="Next"
      />
    </div>
  );
};
