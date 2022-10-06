import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateScrolledPage } from "../../features/scrolls/scrollsSlice";
import "./TopMobileNavi.scss";

const TopMobileNavi = () => {
  const dispatch = useDispatch();
  const handleScrollToTop = (path) => {
    if (window.location.pathname === path) {
      dispatch(updateScrolledPage(path));
    }
  };
  return (
    <div className="top-mobile-navi-container">
      <Link to="/">
        <div
          className="top-mobile-navi-logo-container"
          onClick={() => handleScrollToTop("/")}
        >
          <h1 className="logo-header">Kerbb</h1>
          <div className="logo"></div>
        </div>
      </Link>
    </div>
  );
};

export default TopMobileNavi;
