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

const TopMobileNavi = ({ header, path }) => {
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
  useEffect(() => {
    console.log("hey");
  }, [header]);

  return (
    <div
      className={
        header !== null
          ? "top-mobile-navi-container-center"
          : "top-mobile-navi-container-start"
      }
    >
      {header !== null ? (
        <div
          className="top-mobile-navi-header-container"
          onClick={() => handleScrollToTop(path)}
        >
          <h2 className="top-mobile-navi-header">{header}</h2>
        </div>
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
