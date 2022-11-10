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
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import {
  updateDialog,
  updateMobileDialog,
} from "../../features/dialogs/dialogsSlice";
import ClearIcon from "@mui/icons-material/Clear";
import {
  addJobs,
  getJobsCount,
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
import { fetchCompanies } from "../../features/companies/companiesAPI";
import {
  addCompanies,
  getCompaniesCount,
  updateCompaniesCount,
  updateCompaniesSearchObject,
  updateElementsLoadingCompany,
} from "../../features/companies/companiesSlice";

const SearchPage = () => {
  const dispatch = useDispatch();

  const pageInnerRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [companyInputValue, setCompanyInputValue] = useState("");

  const [section, setSection] = useState("company");

  useEffect(() => {
    async function fetchData() {
      const totals = await fetchTotal();
      const companiesCount = await fetchCompanies({
        is_active: true,
        document_count: true,
      });
      dispatch(updateJobsCount(totals.data["job"]));
      dispatch(updateCompaniesCount(companiesCount.data[0]));
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
    console.log(jobsCountResponse);
    const jobsResponse = await fetchJobs(newJobSearchObject);
    dispatch(updateJobsCount(jobsCountResponse.data));
    dispatch(addJobs(jobsResponse.data));
    dispatch(updateJobSearchObject(newJobSearchObject));
    dispatch(updateElementsLoading(false));
  };
  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    let newCompanySearchObject = {
      page: 1,
      size: jobSearchObject.size,
      query_text: companyInputValue,
      is_active: true,
    };
    dispatch(updateElementsLoadingCompany(true));
    const companiesCountResponse = await fetchCompanies({
      query_text: companyInputValue,
      document_count: true,
      is_active: true,
    });
    const companiesResponse = await fetchCompanies(newCompanySearchObject);
    dispatch(updateCompaniesCount(companiesCountResponse.data[0]));
    dispatch(addCompanies(companiesResponse.data));
    dispatch(updateCompaniesSearchObject(newCompanySearchObject));
    dispatch(updateElementsLoadingCompany(false));
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };
  const handleCompanyInputChange = (e) => {
    const inputValue = e.target.value;
    setCompanyInputValue(inputValue);
  };
  const handleFilterClick = async () => {
    const width = window.innerWidth;
    if (width <= 1120) {
      dispatch(updateMobileDialog(true));
    } else {
      dispatch(updateDialog(true));
    }
  };
  const handleCompanyFilterClick = async () => {
    // const width = window.innerWidth;
    // if (width <= 1120) {
    //   dispatch(updateMobileDialog(true));
    // } else {
    //   dispatch(updateDialog(true));
    // }
  };
  const handleJobClear = async () => {
    setInputValue("");
    let newJobSearchObject = {
      page: 1,
      size: jobSearchObject.size,
      sort_by: jobSearchObject.sort_by,
      sort: jobSearchObject.sort,
      date: jobSearchObject.date,
      what: "",
      where: jobSearchObject.where,
    };
    dispatch(updateElementsLoading(true));
    const jobsCountResponse = await fetchJobs({
      what: "",
      date: jobSearchObject.date,
      document_count: true,
    });
    const jobsResponse = await fetchJobs(newJobSearchObject);
    dispatch(updateJobsCount(jobsCountResponse.data));
    dispatch(addJobs(jobsResponse.data));
    dispatch(updateJobSearchObject(newJobSearchObject));
    dispatch(updateElementsLoading(false));
  };
  const handleCompanyClear = async () => {
    setCompanyInputValue("");
    let newCompanySearchObject = {
      page: 1,
      size: jobSearchObject.size,
      query_text: "",
      is_active: true,
    };
    dispatch(updateElementsLoadingCompany(true));
    const companiesCountResponse = await fetchCompanies({
      query_text: "",
      document_count: true,
      is_active: true,
    });
    const companiesResponse = await fetchCompanies(newCompanySearchObject);
    dispatch(updateCompaniesCount(companiesCountResponse.data[0]));
    dispatch(addCompanies(companiesResponse.data));
    dispatch(updateCompaniesSearchObject(newCompanySearchObject));
    dispatch(updateElementsLoadingCompany(false));
  };
  const jobSearchObject = useSelector(getJobSearchObject);
  const mobileNaviObject = useSelector(getMobileNaviObject);
  const companyCount = useSelector(getCompaniesCount);
  const jobCount = useSelector(getJobsCount);
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
                onClick={() => handleJobClear()}
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
            <div className="search-container">
              <SearchIcon fontSize="small" className="search-search-icon" />
              <form onSubmit={handleCompanySubmit} className="search-form">
                <input
                  type="text"
                  value={companyInputValue}
                  onChange={handleCompanyInputChange}
                  className="search-input"
                />
              </form>
              <ClearIcon
                fontSize="small"
                className={
                  companyInputValue.length > 0
                    ? "search-clear-icon-active"
                    : "search-clear-icon"
                }
                onClick={() => handleCompanyClear()}
              />
            </div>
            {/* <div
              className="filter-container"
              onClick={() => handleCompanyFilterClick()}
            >
              <TuneIcon fontSize="medium" />
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
