import React, { useEffect, useRef, useState } from "react";
import "./CompanyDetailPage.scss";
import Job from "../Job/Job";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/jobs/jobsAPI";
import { useParams } from "react-router-dom";
import {
  fetchCompanies,
  fetchCompany,
  incrementCompanyView,
} from "../../features/companies/companiesAPI";
import { Helmet } from "react-helmet";
import SkeletonJob from "../SkeletonJob/SkeletonJob";
import CircularProgress from "@mui/material/CircularProgress";
import {
  addCompanyDetailJobs,
  addCompanyDetailObject,
  getAllCompanyDetailJobs,
  getCompanyDetailJobsCount,
  getCompanyDetailJobSearchObject,
  getCompanyDetailObject,
  getCompanyDetailSettingsDropdown,
  getCompanyDetailThemeColor,
  includeCompanyDetailJobs,
  updateCompanyDetailElementsLoading,
  updateCompanyDetailJobsCount,
  updateCompanyDetailJobSearchObject,
  updateCompanyDetailSettingsDropdown,
  updateCompanyDetailThemeColor,
} from "../../features/companyDetail/companyDetailSlice";
import TuneIcon from "@mui/icons-material/Tune";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import Drawer from "@mui/material/Drawer";
import Dialog from "@mui/material/Dialog";
import {
  getCompanyDialog,
  getCompanyMobileDialog,
  updateCompanyDialog,
  updateCompanyMobileDialog,
} from "../../features/dialogs/dialogsSlice";
import CompanyFilter from "../CompanyFilter/CompanyFilter";
import CompanyMobileFilter from "../CompanyMobileFilter/CompanyMobileFilter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IosShareIcon from "@mui/icons-material/IosShare";
import {
  updateShareDrawerCompany,
  updateShareMobileOpen,
  updateShareOpen,
} from "../../features/shareDrawer/shareDrawerSlice";
import { ColorExtractor } from "react-color-extractor";
import TopMobileNavi from "../TopMobileNavi/TopMobileNavi";
import BottomMobileNavi from "../BottomMobileNavi/BottomMobileNavi";
import {
  getScrolledPage,
  updateScrolledPage,
} from "../../features/scrolls/scrollsSlice";
import {
  getMobileNaviObject,
  updateMobileNaviObject,
} from "../../features/navigation/navigationSlice";
import CountUp from "react-countup";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import CompanyDetailJobsPage from "../CompanyDetailJobsPage/CompanyDetailJobsPage";
import CompanyDetailNewsPage from "../CompanyDetailNewsPage/CompanyDetailNewsPage";

const CompanyDetailPage = () => {
  const dispatch = useDispatch();
  const { title } = useParams();
  const pageInnerRef = useRef(null);
  const headerRef = useRef(null);
  const [colors, setColors] = useState(null);
  const [section, setSection] = useState("jobs");
  const [closeIcon, setCloseIcon] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const jobsCountResponse = await fetchJobs({
        company: title,
        date: companyDetailJobsSearchObject.date,
        document_count: true,
      });
      dispatch(updateCompanyDetailJobsCount(jobsCountResponse.data));
      const companyResponse = await fetchCompanies({
        query_text: title,
      });
      dispatch(addCompanyDetailObject(companyResponse.data[0]));
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (colors !== null && colors.length > 0) {
      dispatch(updateCompanyDetailThemeColor(colors[0]));
    }
  }, [colors]);
  const handleJobsSection = () => {
    if (section === "jobs") {
      scrollToTop();
    }
    setSection("jobs");
  };
  const handleNewsSection = () => {
    if (section === "news") {
      scrollToTop();
    }
    setSection("news");
  };

  const scrollToTop = () => {
    pageInnerRef.current.scrollTo(0, 0);
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };
  const handleInputFocus = () => {
    setCloseIcon(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateCompanyDetailElementsLoading(true));
    let newCompanyDetailJobSearchObject = {
      page: 1,
      size: 20,
      sort_by: "date",
      sort: "ASC",
      date: "whole",
      what: inputValue,
      where: "",
      company: title,
    };
    const jobsCountResponse = await fetchJobs({
      what: inputValue,
      company: title,
      date: companyDetailJobsSearchObject.date,
      document_count: true,
    });
    const jobsResponse = await fetchJobs(newCompanyDetailJobSearchObject);
    dispatch(updateCompanyDetailJobsCount(jobsCountResponse.data));
    dispatch(addCompanyDetailJobs(jobsResponse.data));
    dispatch(
      updateCompanyDetailJobSearchObject(newCompanyDetailJobSearchObject)
    );
    dispatch(updateCompanyDetailElementsLoading(false));
  };
  const handleFilterClick = async () => {
    console.log("hey");
    const width = window.innerWidth;
    if (width <= 1120) {
      dispatch(updateCompanyMobileDialog(true));
    } else {
      dispatch(updateCompanyDialog(true));
    }
  };
  const onScroll = () => {
    const { scrollTop } = pageInnerRef.current;
    if (scrollTop > 265 && mobileNaviObject === null) {
      dispatch(
        updateMobileNaviObject({
          type: "object",
          company: companyDetailObject,
          path: window.location.pathname,
        })
      );
    } else if (scrollTop < 50 && mobileNaviObject !== null) {
      dispatch(updateMobileNaviObject(null));
    }
  };
  const handleClear = async () => {
    setInputValue("");
    dispatch(updateCompanyDetailElementsLoading(true));
    let newCompanyDetailJobSearchObject = {
      page: 1,
      size: 20,
      sort_by: "date",
      sort: "ASC",
      date: "whole",
      what: "",
      where: "",
      company: title,
    };
    const jobsCountResponse = await fetchJobs({
      what: "",
      company: title,
      date: companyDetailJobsSearchObject.date,
      document_count: true,
    });
    const jobsResponse = await fetchJobs(newCompanyDetailJobSearchObject);
    dispatch(updateCompanyDetailJobsCount(jobsCountResponse.data));
    dispatch(addCompanyDetailJobs(jobsResponse.data));
    dispatch(updateCompanyDetailElementsLoading(false));
  };
  const handleShareDrawerCompanyOpen = () => {
    const width = window.innerWidth;
    dispatch(updateShareDrawerCompany(companyDetailObject));
    if (width <= 1120) {
      dispatch(updateShareMobileOpen(true));
    } else {
      dispatch(updateShareOpen(true));
    }
    dispatch(updateCompanyDetailSettingsDropdown(""));
  };
  const handleDropdown = () => {
    if (companyDetailSettingsDropdown) {
      dispatch(updateCompanyDetailSettingsDropdown(false));
    } else {
      dispatch(updateCompanyDetailSettingsDropdown(true));
    }
  };
  const companyDetailJobsSearchObject = useSelector(
    getCompanyDetailJobSearchObject
  );
  const companyDetailObject = useSelector(getCompanyDetailObject);
  const mobileNaviObject = useSelector(getMobileNaviObject);
  const scrolledPage = useSelector(getScrolledPage);
  const companyDetailSettingsDropdown = useSelector(
    getCompanyDetailSettingsDropdown
  );
  const companyDetailJobsCount = useSelector(getCompanyDetailJobsCount);
  useEffect(() => {
    if (scrolledPage === window.location.pathname) {
      scrollToTop();
      dispatch(updateScrolledPage(""));
    }
  }, [scrolledPage]);
  return (
    <div
      className="company-detail-page-container"
      onScroll={onScroll}
      ref={pageInnerRef}
    >
      <Helmet>
        <title>{`(${
          companyDetailObject
            ? companyDetailObject.job_count
              ? companyDetailObject.job_count
              : 0
            : 0
        }) ${
          companyDetailObject
            ? companyDetailObject.name
              ? companyDetailObject.name
              : ""
            : ""
        } İş İlanları`}</title>
        <meta
          property="og:title"
          content={`${
            companyDetailObject ? companyDetailObject.name : ""
          } İş İlanları  | Kerbb`}
        />
        <meta
          property="og:image"
          content={`${
            companyDetailObject ? companyDetailObject.cover_image_url : ""
          }?w=800`}
        />
        <meta
          name="description"
          content={`Yüzlerce kurumsal şirketin iş ilanını ve haberlerini Kerbb ile keşfedin! | Kerbb`}
        />
      </Helmet>
      <div className="company-detail-page-navi-container">
        <div className="company-cover-image-and-info-container">
          <img
            className="company-cover-image"
            src={
              companyDetailObject
                ? companyDetailObject.cover_image_url === ""
                  ? process.env.PUBLIC_URL + "/no-image.png"
                  : companyDetailObject.cover_image_url
                : process.env.PUBLIC_URL + "/no-image.png"
            }
            alt=""
          />
          <ColorExtractor getColors={setColors}>
            <img
              className="company-cover-image"
              style={{ display: "none" }}
              src={
                companyDetailObject
                  ? companyDetailObject.logo_image_url === ""
                    ? process.env.PUBLIC_URL + "/no-image.png"
                    : companyDetailObject.logo_image_url
                  : process.env.PUBLIC_URL + "/no-image.png"
              }
              alt=""
            />
          </ColorExtractor>
          <div className="company-info-container">
            <div
              className="company-header-container"
              ref={headerRef}
              style={{ borderLeftColor: colors ? colors[0] : "#4e21e7" }}
            >
              <h1 className="company-header">
                {companyDetailObject ? companyDetailObject.name : ""}
              </h1>
              <CheckCircleIcon
                className={
                  companyDetailObject
                    ? companyDetailObject.is_approved
                      ? "company-header-approved-container-active"
                      : "company-header-approved-container"
                    : "company-header-approved-container"
                }
                fontSize="small"
              />
            </div>
            <div className="company-interaction-container">
              <div className="company-settings-container">
                <MoreHorizIcon
                  className="company-settings"
                  fontSize="medium"
                  onClick={() => handleDropdown()}
                />
                <div
                  className={
                    companyDetailSettingsDropdown
                      ? "company-settings-dropdown-active"
                      : "company-settings-dropdown"
                  }
                >
                  <ul className="company-settings-dropdown-list">
                    <li
                      className="company-settings-dropdown-item"
                      onClick={() => handleShareDrawerCompanyOpen()}
                    >
                      <div className="job-settings-dropdown-item-icon-container">
                        <IosShareIcon fontSize="small" />
                      </div>
                      <div className="company-settings-dropdown-item-header-container">
                        <h6 className="company-settings-dropdown-item-header">
                          Paylaş
                        </h6>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="company-detail-page-other-navi-container"
        style={{ borderTopColor: colors ? colors[0] : "#4e21e7" }}
      >
        <div className="tabs-container">
          <ul className="tabs-list">
            <li
              className={
                section === "jobs" ? "tabs-item-jobs-active" : "tabs-item-jobs"
              }
              onClick={() => handleJobsSection()}
            >
              <h2 className="tabs-item-header">İŞ İLANLARI</h2>
              <h2 className="tabs-item-paranthese">(</h2>
              <h2 className="tabs-item-count">
                <CountUp end={companyDetailJobsCount} duration={0.5} />
              </h2>
              <h2 className="tabs-item-paranthese">)</h2>
            </li>
            <li
              className={
                section === "news" ? "tabs-item-news-active" : "tabs-item-news"
              }
              onClick={() => handleNewsSection()}
            >
              <div className="tabs-item-header-container">
                <h2 className="tabs-item-header">HABERLER</h2>
                <h3 className="tabs-item-beta">BETA</h3>
              </div>
            </li>
          </ul>
          <div
            className={
              section === "news"
                ? "tabs-container-cover-news"
                : "tabs-container-cover-jobs"
            }
            style={{
              backgroundColor: colors ? colors[0] : "#4e21e7",
            }}
          ></div>
        </div>
        <div
          className={
            section === "jobs"
              ? "job-search-and-filter-container-active"
              : "job-search-and-filter-container"
          }
        >
          <div className="search-container">
            <SearchIcon fontSize="small" className="search-search-icon" />
            <form onSubmit={handleSubmit} className="search-form">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="search-input"
              />
            </form>
            <ClearIcon
              fontSize="small"
              className={
                inputValue.length > 0
                  ? "search-clear-icon-active"
                  : "search-clear-icon"
              }
              onClick={() => handleClear()}
            />
          </div>
          <div
            className="filter-container"
            style={{ backgroundColor: colors ? colors[0] : "#4e21e7" }}
            onClick={() => handleFilterClick()}
          >
            <TuneIcon fontSize="medium" />
          </div>
        </div>
      </div>
      <div className="jobs-and-news-page-container">
        {section === "jobs" ? (
          <CompanyDetailJobsPage />
        ) : (
          <CompanyDetailNewsPage />
        )}
      </div>
    </div>
  );
};

export default CompanyDetailPage;
