import React, { useEffect, useRef, useState } from "react";
import "./SearchPage.scss";
import { Helmet } from "react-helmet";
import { fetchTotal } from "../../features/total/totalAPI";
import CountUp from "react-countup";
import JobsPage from "../JobsPage/JobsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  getScrolledPage,
  updateScrolledPage,
} from "../../features/scrolls/scrollsSlice";
import CompaniesPage from "../CompaniesPage/CompaniesPage";
import TopMobileNavi from "../TopMobileNavi/TopMobileNavi";
import BottomMobileNavi from "../BottomMobileNavi/BottomMobileNavi";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import {
  updateDialog,
  updateMobileDialog,
} from "../../features/dialogs/dialogsSlice";
import ClearIcon from "@mui/icons-material/Clear";
import {
  addJobs,
  getJobSearchObject,
  updateElementsLoading,
  updateJobsCount,
  updateJobSearchObject,
} from "../../features/jobs/jobsSlice";
import { fetchJobs } from "../../features/jobs/jobsAPI";
import {
  getMobileNaviObject,
  updateMobileNaviObject,
} from "../../features/navigation/navigationSlice";

const SearchPage = () => {
  const dispatch = useDispatch();

  const pageInnerRef = useRef();

  const [jobCount, setJobCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [topNaviHeader, setTopNaviHeader] = useState(null);

  const [inputValue, setInputValue] = useState("");

  const [closeIcon, setCloseIcon] = useState(false);

  const [section, setSection] = useState("company");

  useEffect(() => {
    async function fetchData() {
      const totals = await fetchTotal();
      setJobCount(totals.data["job"]);
      setCompanyCount(totals.data["company"]);
    }
    fetchData();
  }, []);

  const handleJobSection = () => {
    if (section === "job") {
      scrollToTop();
    }
    setSection("job");
  };
  const handleCompanySection = () => {
    if (section === "company") {
      scrollToTop();
    }
    setSection("company");
  };
  const scrollToTop = () => {
    pageInnerRef.current.scrollTo(0, 0);
  };
  const scrolledPage = useSelector(getScrolledPage);
  useEffect(() => {
    if (scrolledPage === window.location.pathname) {
      scrollToTop();
      dispatch(updateScrolledPage(""));
    }
  }, [scrolledPage]);

  const onScroll = () => {
    const { scrollTop } = pageInnerRef.current;
    if (scrollTop > 50 && mobileNaviObject === null) {
      dispatch(
        updateMobileNaviObject({
          type: "header",
          header: "Arama",
          path: window.location.pathname,
        })
      );
    } else if (scrollTop < 50 && mobileNaviObject !== null) {
      dispatch(updateMobileNaviObject(null));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newJobSearchObject = {
      page: 1,
      size: jobSearchObject.size,
      sort_by: jobSearchObject.sort_by,
      sort: jobSearchObject.sort,
      date: jobSearchObject.date,
      what: inputValue,
      where: jobSearchObject.where,
    };
    dispatch(updateElementsLoading(true));
    const jobsCountResponse = await fetchJobs({
      what: inputValue,
      date: jobSearchObject.date,
      document_count: true,
    });
    const jobsResponse = await fetchJobs(newJobSearchObject);
    dispatch(updateJobsCount(jobsCountResponse.data));
    dispatch(addJobs(jobsResponse.data));
    dispatch(updateJobSearchObject(newJobSearchObject));
    dispatch(updateElementsLoading(false));
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };
  const handleFilterClick = async () => {
    const width = window.innerWidth;
    if (width <= 1120) {
      dispatch(updateMobileDialog(true));
    } else {
      dispatch(updateDialog(true));
    }
  };
  const handleInputFocus = () => {
    setCloseIcon(true);
  };
  const jobSearchObject = useSelector(getJobSearchObject);
  const mobileNaviObject = useSelector(getMobileNaviObject);
  return (
    <div
      className="search-page-container"
      ref={pageInnerRef}
      onScroll={onScroll}
    >
      <Helmet>
        <title>Kurumsal İş İlanları</title>
        <meta property="og:title" content={`Kurumsal İş İlanları | Kerbb`} />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/kerbb/image/upload/v1664460395/local/website_photos/WhatsApp_Image_2022-09-29_at_00.17.34_mvym3a.jpg?w=800`}
        />
        <meta
          name="description"
          content={`Yüzlerce kurumsal şirketin iş ilanını ve haberlerini Kerbb ile keşfedin! | Kerbb`}
        />
      </Helmet>
      <div className="search-page-header-container">
        <h1 className="search-page-header">Arama</h1>
      </div>
      <div className="navi-container">
        <div className="tabs-container">
          <ul className="tabs-list">
            <li
              className={
                section === "company" ? "tabs-item-active" : "tabs-item"
              }
              onClick={() => handleCompanySection()}
            >
              <h2 className="tabs-item-header">ŞİRKETLER</h2>
              <h2 className="tabs-item-paranthese">(</h2>
              <h2 className="tabs-item-count">
                <CountUp end={companyCount} duration={0.5} />
              </h2>
              <h2 className="tabs-item-paranthese">)</h2>
            </li>
            <li
              className={section === "job" ? "tabs-item-active" : "tabs-item"}
              onClick={() => handleJobSection()}
            >
              <h2 className="tabs-item-header">İŞ İLANLARI</h2>
              <h2 className="tabs-item-paranthese">(</h2>
              <h2 className="tabs-item-count">
                <CountUp end={jobCount} duration={0.5} />
              </h2>
              <h2 className="tabs-item-paranthese">)</h2>
            </li>
          </ul>
          <div
            className={
              section === "company"
                ? "tabs-container-cover-company"
                : "tabs-container-cover-job"
            }
          ></div>
        </div>
        {section === "job" ? (
          <div className="job-search-and-filter-container">
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
                onClick={() => setInputValue("")}
              />
            </div>
            <div
              className="filter-container"
              onClick={() => handleFilterClick()}
            >
              <TuneIcon fontSize="medium" />
            </div>
          </div>
        ) : (
          <div className="company-search-and-filter-container">
            {/* <div className="search-container">
              <form onSubmit={handleSubmit} className="search-form">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="search-input"
                />
              </form>
            </div>
            <div
              className="filter-container"
              onClick={() => handleFilterClick()}
            >
              <TuneIcon fontSize="small" />
            </div> */}
          </div>
        )}
      </div>
      <div className="jobs-and-companies-page-container">
        {section === "company" ? <CompaniesPage /> : <JobsPage />}
      </div>
    </div>
  );
};

export default SearchPage;
