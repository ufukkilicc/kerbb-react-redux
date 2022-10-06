import React, { useEffect, useState } from "react";
import "./BottomMobileNavi.scss";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateScrolledPage } from "../../features/scrolls/scrollsSlice";

const BottomMobileNavi = () => {
  const dispatch = useDispatch();
  const [current_path, set_current_path] = useState("");
  const MINUTE_MS = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      set_current_path(window.location.pathname);
    }, MINUTE_MS);

    return () => clearInterval(interval);
    // This represents the unmount function,
    // in which you need to clear your interval to
    // prevent memory leaks.
  }, []);
  const handleScrollToTop = (path) => {
    if (window.location.pathname === path) {
      dispatch(updateScrolledPage(path));
    }
  };
  return (
    <div className="bottom-mobile-navi-container">
      <ul className="bottom-mobile-navi-list">
        <Link to="/">
          <li
            className={
              current_path === "/"
                ? "bottom-mobile-navi-item-active"
                : "bottom-mobile-navi-item"
            }
            onClick={() => handleScrollToTop("/")}
          >
            <HomeIcon fontSize="medium" />
          </li>
        </Link>
        <Link to="/dashboard/search">
          <li
            className={
              current_path === "/dashboard/search"
                ? "bottom-mobile-navi-item-active"
                : "bottom-mobile-navi-item"
            }
            onClick={() => handleScrollToTop("/dashboard/search")}
          >
            <SearchIcon fontSize="medium" />
          </li>
        </Link>
        <Link to="/dashboard/news">
          <li
            className={
              current_path.startsWith("/dashboard/news")
                ? "bottom-mobile-navi-item-active"
                : "bottom-mobile-navi-item"
            }
            onClick={() => handleScrollToTop("/dashboard/news")}
          >
            <NewspaperIcon fontSize="medium" />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default BottomMobileNavi;
