/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";
import { Button, Colors, Navbar, Alignment } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { QuotationBox } from "./QuotationBox";
import { FetchDocIdForm } from "./FetchDocIdForm";

import { getFetchDocId } from "~DocIdStore";
import { FLTypes } from "~types";

const globalStyle = css`
  body {
    background-color: ${Colors.LIGHT_GRAY5};
    font-size: 16px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

type Props = { routeInfo: FLTypes.RouteInfo };

export const App = (props: Props) => {
  const { routeInfo } = props;
  const fetchDocId = getFetchDocId();

  const clickEditBtn = () => {
    routeInfo.routePath("FetchDocIdForm");
  };

  let targetComponent = null;
  if (routeInfo.currentPath == "FetchDocIdForm") {
    targetComponent = <FetchDocIdForm routeInfo={routeInfo} />;
  } else {
    targetComponent = <QuotationBox routeInfo={routeInfo} />;
  }

  return (
    <section>
      <Navbar className="bp3-dark" fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Lucky</Navbar.Heading>
          {fetchDocId ? (
            <Button minimal icon={IconNames.EDIT} onClick={clickEditBtn} />
          ) : null}
        </Navbar.Group>
      </Navbar>
      <Global styles={globalStyle} />

      {targetComponent}
    </section>
  );
};
