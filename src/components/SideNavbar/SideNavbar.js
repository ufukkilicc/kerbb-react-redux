import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SideNavbar.scss";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import { useDispatch, useSelector } from "react-redux";
import { updateScrolledPage } from "../../features/scrolls/scrollsSlice";
import {
  getCurrentRoute,
  updateCurrentRoute,
} from "../../features/routes/routesSlice";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#e8e7ff",
    color: "#4e21e7",
    maxWidth: 220,
    padding: "5px",
    fontSize: theme.typography.pxToRem(12),
    fontFamily: "'Poppins', sans-serif",
    border: "1px solid #dadde9",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
}));

const SideNavbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCurrentRoute(window.location.pathname));
  }, []);

  const handleScrollToTop = (path) => {
    if (window.location.pathname === path) {
      dispatch(updateScrolledPage(path));
    }
  };
  const handleRouteChange = (path) => {
    handleScrollToTop(path);
    dispatch(updateCurrentRoute(path));
  };
  const currentRoute = useSelector(getCurrentRoute);
  return (
    <div className="navbar-side-container">
      <Link to="/">
        <div className="logo-container" onClick={() => handleRouteChange("/")}>
          <h1 className="logo-header">Kerbb</h1>
          <div className="logo"></div>
        </div>
      </Link>
      {/* <Link to="/">
        <div className="logo-lined">
          <hr className="first-line" />
          <hr className="second-line" />
        </div>
      </Link> */}
      <ul className="navbar-side-items">
        <HtmlTooltip
          title="Ana Sayfa"
          placement="right-start"
          TransitionComponent={Zoom}
        >
          <Link to="/">
            <li
              className={
                currentRoute === "/"
                  ? "navbar-side-item-active"
                  : "navbar-side-item"
              }
              onClick={() => handleRouteChange("/")}
            >
              <HomeIcon fontSize="medium" />
            </li>
          </Link>
        </HtmlTooltip>
        <HtmlTooltip
          title="Arama"
          placement="right-start"
          TransitionComponent={Zoom}
        >
          <Link to="/dashboard/search">
            <li
              className={
                currentRoute.startsWith("/dashboard/search") ||
                currentRoute.startsWith("/dashboard/companies")
                  ? "navbar-side-item-active"
                  : "navbar-side-item"
              }
              onClick={() => handleRouteChange("/dashboard/search")}
            >
              <SearchIcon fontSize="medium" />
            </li>
          </Link>
        </HtmlTooltip>

        {/* <Link to="companies">
            <li className="navbar-side-item">
              <FontAwesomeIcon icon={faBuilding} size="lg" />
            </li>
          </Link> */}
        <HtmlTooltip
          title="Haberler"
          placement="right-start"
          TransitionComponent={Zoom}
        >
          <Link to="/dashboard/news">
            <li
              className={
                currentRoute === "/dashboard/news"
                  ? "navbar-side-item-active"
                  : "navbar-side-item"
              }
              onClick={() => handleRouteChange("/dashboard/news")}
            >
              <NewspaperIcon fontSize="medium" />
            </li>
          </Link>
        </HtmlTooltip>
      </ul>
    </div>
  );
};

export default SideNavbar;
