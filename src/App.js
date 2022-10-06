import React, { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Dashboard from "./components/Dashboard/Dashboard";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import LandingPage from "./components/LandingPage/LandingPage";
import Snackbar from "@mui/material/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { getSnackBar, updateSnackBar } from "./features/snackbar/snackbarSlice";
import TopMobileNavi from "./components/TopMobileNavi/TopMobileNavi";
import BottomMobileNavi from "./components/BottomMobileNavi/BottomMobileNavi";
import AboutPage from "./components/AboutPage/AboutPage";
import ContactPage from "./components/ContactPage/ContactPage";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga4";
import {
  getShareMobileOpen,
  getShareOpen,
  updateShareDrawerCompany,
  updateShareMobileOpen,
  updateShareOpen,
} from "./features/shareDrawer/shareDrawerSlice";
import Dialog from "@mui/material/Dialog";
import ShareDrawer from "./components/ShareDrawer/ShareDrawer";
import { updateCompanyDetailSettingsDropdown } from "./features/companyDetail/companyDetailSlice";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ShareDrawerMobile from "./components/ShareDrawerMobile/ShareDrawerMobile";
import Drawer from "@mui/material/Drawer";
import { updateJobSettingsDropdown } from "./features/jobs/jobsSlice";
import {
  getShareJobMobileOpen,
  getShareJobOpen,
  updateShareDrawerJob,
  updateShareJobMobileOpen,
  updateShareJobOpen,
} from "./features/shareDrawerJob/shareDrawerJobSlice";
import ShareDrawerJob from "./components/ShareDrawerJob/ShareDrawerJob";
import ShareDrawerJobMobile from "./components/ShareDrawerJobMobile/ShareDrawerJobMobile";

function App() {
  const dispatch = useDispatch();
  const [naviSticky, setNaviSticky] = useState(true);
  const [gaActive, setGaActive] = useState(false);
  useEffect(() => {
    if (!window.location.href.includes("localhost2")) {
      ReactGA.initialize("G-HZYD33NZBQ");
    }
    setGaActive(true);
  }, []);
  useEffect(() => {
    if (gaActive) {
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, [gaActive]);
  useEffect(() => {
    let handler = (event) => {
      if (
        event.target.className !== "company-settings-dropdown-item-header" &&
        event.target.className !== "company-settings-dropdown-active"
      ) {
        dispatch(updateCompanyDetailSettingsDropdown(false));
      }
      if (
        event.target.className !== "job-settings-dropdown-item-header" &&
        event.target.className !== "job-settings-dropdown-item" &&
        event.target.className !== "job-settings-dropdown-active"
      ) {
        dispatch(updateJobSettingsDropdown(false));
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const handleShareDrawerClose = () => {
    dispatch(updateShareOpen(false));
    // setTimeout(() => {
    //   dispatch(updateShareDrawerCompany({}));
    // }, 500);
  };
  const handleShareDrawerMobileClose = () => {
    dispatch(updateShareMobileOpen(false));
    // setTimeout(() => {
    //   dispatch(updateShareDrawerCompany({}));
    // }, 800);
  };
  const handleShareDrawerJobClose = () => {
    dispatch(updateShareJobOpen(false));
    // setTimeout(() => {
    //   dispatch(updateShareDrawerJob({}));
    // }, 500);
  };
  const handleShareDrawerJobMobileClose = () => {
    dispatch(updateShareJobMobileOpen(false));
    // setTimeout(() => {
    //   dispatch(updateShareDrawerJob({}));
    // }, 800);
  };
  const shareDrawerOpen = useSelector(getShareOpen);
  const shareDrawerMobileOpen = useSelector(getShareMobileOpen);
  const shareDrawerJobOpen = useSelector(getShareJobOpen);
  const shareDrawerJobMobileOpen = useSelector(getShareJobMobileOpen);
  const snackbar = useSelector(getSnackBar);
  useEffect(() => {
    if (snackbar.open) {
      setTimeout(() => {
        dispatch(updateSnackBar({ open: false, type: "", message: "" }));
      }, 5000);
    }
  }, [snackbar]);
  const handleSnackbarClose = () => {
    dispatch(updateSnackBar({ open: false, type: "", message: "" }));
  };
  return (
    <div className="app">
      <Helmet>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <BrowserRouter>
        <div className="app-side-navbar-container">
          <SideNavbar />
        </div>
        <div
          className={
            naviSticky
              ? "app-top-mobile-navbar-container-active"
              : "app-top-mobile-navbar-container"
          }
        >
          <TopMobileNavi />
        </div>
        <div className="app-content-container">
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <div
          className={
            naviSticky
              ? "app-bottom-mobile-navbar-container-active"
              : "app-bottom-mobile-navbar-container"
          }
        >
          <BottomMobileNavi />
        </div>
      </BrowserRouter>
      <div className={snackbar.open ? "snackbar-active" : "snackbar"}>
        <div className="snackbar-inner-container" onClick={handleSnackbarClose}>
          <div className="snackbar-icon-success">
            <TaskAltIcon fontSize="medium" />
          </div>
          <div className="snackbar-message-container">
            <h4 className="snackbar-message">{snackbar.message}</h4>
          </div>
        </div>
      </div>
      <Dialog open={shareDrawerOpen} onClose={handleShareDrawerClose}>
        <ShareDrawer />
      </Dialog>
      <Drawer
        open={shareDrawerMobileOpen}
        anchor="bottom"
        onClose={handleShareDrawerMobileClose}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        <ShareDrawerMobile />
      </Drawer>
      <Dialog open={shareDrawerJobOpen} onClose={handleShareDrawerJobClose}>
        <ShareDrawerJob />
      </Dialog>
      <Drawer
        open={shareDrawerJobMobileOpen}
        anchor="bottom"
        onClose={handleShareDrawerJobMobileClose}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        <ShareDrawerJobMobile />
      </Drawer>
    </div>
  );
}

export default App;