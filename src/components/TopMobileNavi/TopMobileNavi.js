import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getMobileNaviHeader,
  getMobileNaviObject,
  updateMobileNaviHeader,
  updateMobileNaviObject,
} from "../../features/navigation/navigationSlice";
import { updateScrolledPage } from "../../features/scrolls/scrollsSlice";
import "./TopMobileNavi.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TopMobileNavi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleScrollToTop = (path) => {
    if (window.location.pathname === path) {
      dispatch(updateScrolledPage(path));
    }
  };
  const goBack = () => {
    dispatch(updateMobileNaviObject(null));
    navigate(-1);
  };
  const mobileNaviObject = useSelector(getMobileNaviObject);
  return (
    <div
      className={
        mobileNaviObject !== null
          ? "top-mobile-navi-container-center"
          : "top-mobile-navi-container-start"
      }
    >
      {mobileNaviObject !== null ? (
        mobileNaviObject.type === "header" ? (
          <div
            className="top-mobile-navi-header-container"
            onClick={() => handleScrollToTop(mobileNaviObject.path)}
          >
            <h2 className="top-mobile-navi-header">
              {mobileNaviObject.header}
            </h2>
          </div>
        ) : (
          <div
            className="top-mobile-navi-header-container"
            onClick={() => handleScrollToTop(mobileNaviObject.path)}
          >
            <h2 className="top-mobile-navi-header">
              {mobileNaviObject.company.name}
            </h2>
            <CheckCircleIcon
              fontSize="small"
              className={
                mobileNaviObject.company.is_approved
                  ? "top-mobile-navi-header-approve-container-active"
                  : "top-mobile-navi-header-approve-container"
              }
            />
          </div>
        )
      ) : (
        <Link to="/">
          <div
            className="top-mobile-navi-logo-container"
            onClick={() => handleScrollToTop("/")}
          >
            <h1 className="logo-header">Kerbb</h1>
            <div className="logo"></div>
          </div>
        </Link>
      )}
      <div className="navigation-icon-container" onClick={() => goBack()}>
        <ArrowBackIosNewIcon fontSize="small" />
      </div>
    </div>
  );
};

export default TopMobileNavi;
