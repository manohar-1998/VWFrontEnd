import React from "react";
import {
  CHeader,
  CHeaderNav,
} from "@coreui/react";
import TheHeaderDropdown from "./TheHeaderDropdown";

const TheHeader = ({ history }) => {
  return (
    <CHeader style={aaa}>
      <CHeaderNav>
        <TheHeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
const aaa = {
  backgroundColor: 'black',
  height:'50px',
  marginTop:'3px'
}

