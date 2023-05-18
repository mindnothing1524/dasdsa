import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CHeader, CToggler, CHeaderNav } from "@coreui/react";

// routes config
import routes from "../routes";

import { TheHeaderDropdown } from "./index";
import { updateSidebar } from "src/Actions";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.changeState);
  const authDetails = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(authDetails);
  }, []);
  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch(updateSidebar(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch(updateSidebar(val));
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      {/* <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      /> */}

      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
