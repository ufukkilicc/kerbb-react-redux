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
  getAllCompanyDetailJobs,
  getCompanyDetailJobSearchObject,
  getCompanyDetailSettingsDropdown,
  getCompanyDetailThemeColor,
  includeCompanyDetailJobs,
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

const CompanyDetailPage = () => {
  const dispatch = useDispatch();
  let { title } = useParams();
  const [infoSection, setInfoSection] = useState("isilanlari");
  const companyDetailInnerRef = useRef();
  const loaderRef = useRef();
  const [loader, setLoader] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [company, setCompany] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [naviSticky, setNaviSticky] = useState(false);
  const [elementsLoading, setElementsLoading] = useState(true);
  const [scrolltop, setScrolltop] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [colors, setColors] = useState(null);

  const [topNaviHeader, setTopNaviHeader] = useState("");

  useEffect(() => {
    async function fetchData() {
      setElementsLoading(true);
      const companyDetailResponse = await fetchCompanies({
        page: 1,
        query_text: title,
      });
      const what = companyDetailResponse.data[0].scrape_name;
      const response = await fetchJobs({
        what,
        page: 1,
        size: 20,
        sort_by: companyDetailJobSearchObject.sort_by,
        sort: companyDetailJobSearchObject.sort,
        date: companyDetailJobSearchObject.date,
      });
      setElementsLoading(false);
      setCompany(companyDetailResponse.data[0]);
      dispatch(addCompanyDetailJobs(response.data));
      await incrementCompanyView(company._id);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (colors !== null && colors.length > 0) {
      dispatch(updateCompanyDetailThemeColor(colors[0]));
      // document.getElementById(
      //   "logo-container"
      // ).style.backgroundImage = `radial-gradient( circle farthest-corner at 22.4% 21.7%, #ffffff 0%, ${colors[0]} 100.2%`;
    }
  }, [colors]);
  let load = async () => {
    console.log("hey");
    if (companyDetailJobs.length % 10 === 0 && hasMore) {
      setPageCount(pageCount + 1);
      setLoader(true);
      const jobsResponse = await fetchJobs({
        what: company.scrape_name,
        page: pageCount + 1,
        size: 20,
        sort_by: companyDetailJobSearchObject.sort_by,
        sort: companyDetailJobSearchObject.sort,
        date: companyDetailJobSearchObject.date,
      });
      if (jobsResponse.data.length === 0) {
        setLoader(false);
        setHasMore(false);
      }
      setLoader(false);
      dispatch(includeCompanyDetailJobs(jobsResponse.data));
    } else {
      setLoader(false);
      setHasMore(false);
    }
  };
  const loaderr = useRef(load);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loaderr.current();
        }
      },
      { threshold: 0.2 }
    )
  );
  const [element, setElement] = useState(null);

  useEffect(() => {
    loaderr.current = load;
  }, [load]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  const handleSectionChange = async (e) => {
    setInfoSection(e.target.id);
    scrollToTop();
  };
  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      setNaviSticky(true);
    } else {
      setNaviSticky(false);
    }
  };
  const handleFilterClick = async () => {
    const width = window.innerWidth;
    if (width <= 1120) {
      dispatch(updateCompanyMobileDialog(true));
    } else {
      dispatch(updateCompanyDialog(true));
    }
  };
  const handleDialogClose = async () => {
    dispatch(updateCompanyDialog(false));
  };
  const handleMobilDialogClose = async () => {
    dispatch(updateCompanyMobileDialog(false));
  };
  const companyDetailJobs = useSelector(getAllCompanyDetailJobs);
  const companyDialog = useSelector(getCompanyDialog);
  const companyMobileDialog = useSelector(getCompanyMobileDialog);
  const companyDetailJobSearchObject = useSelector(
    getCompanyDetailJobSearchObject
  );
  const companyDetailSettingsDropdown = useSelector(
    getCompanyDetailSettingsDropdown
  );
  const companyDetailThemeColor = useSelector(getCompanyDetailThemeColor);
  const scrolledPage = useSelector(getScrolledPage);

  useEffect(() => {
    async function fetchData() {
      setHasMore(true);
      scrollToTop();
      setPageCount(1);
      setElementsLoading(true);
      const jobsResponse = await fetchJobs({
        what: company.scrape_name,
        page: 1,
        size: 20,
        sort_by: companyDetailJobSearchObject.sort_by,
        sort: companyDetailJobSearchObject.sort,
        date: companyDetailJobSearchObject.date,
      });
      console.log({
        what: company.scrape_name,
        page: 1,
        size: 20,
        sort_by: companyDetailJobSearchObject.sort_by,
        sort: companyDetailJobSearchObject.sort,
        date: companyDetailJobSearchObject.date,
      });
      setElementsLoading(false);
      dispatch(addCompanyDetailJobs(jobsResponse.data));
    }
    fetchData();
  }, [companyDetailJobSearchObject]);

  const onScroll = () => {
    const { scrollTop } = companyDetailInnerRef.current;
    if (scrollTop > 300 && topNaviHeader === null) {
      setTopNaviHeader(`${company.name}`);
    } else if (scrollTop < 300 && topNaviHeader !== null) {
      setTopNaviHeader(null);
    }
  };
  const handleDropDown = () => {
    if (companyDetailSettingsDropdown) {
      dispatch(updateCompanyDetailSettingsDropdown(false));
    } else {
      dispatch(updateCompanyDetailSettingsDropdown(true));
    }
  };
  const handleShareDrawerOpen = () => {
    const width = window.innerWidth;
    dispatch(updateShareDrawerCompany(company));
    if (width <= 1120) {
      dispatch(updateShareMobileOpen(true));
    } else {
      dispatch(updateShareOpen(true));
    }
    dispatch(updateCompanyDetailSettingsDropdown(false));
  };

  const scrollToTop = () => {
    companyDetailInnerRef.current.scrollTo(0, 0);
  };
  useEffect(() => {
    if (scrolledPage === window.location.pathname) {
      scrollToTop();
      dispatch(updateScrolledPage(""));
    }
  }, [scrolledPage]);
  return (
    <div
      className="company-detail-page-container"
      ref={companyDetailInnerRef}
      onScroll={onScroll}
      onWheel={handleWheel}
    >
      <Helmet>
        <title>{`(${
          company ? (company.job_count ? company.job_count : 0) : 0
        }) ${
          company ? (company.name ? company.name : "") : ""
        } İş İlanları`}</title>
        <meta
          property="og:title"
          content={`${company.name} İş İlanları  | Kerbb`}
        />
        <meta
          property="og:image"
          content={`${company.cover_image_url}?w=800`}
        />
        <meta
          name="description"
          content={`Yüzlerce kurumsal şirketin iş ilanını ve haberlerini Kerbb ile keşfedin! | Kerbb`}
        />
      </Helmet>
      <div
        className={
          naviSticky
            ? "company-detail-page-navi-active"
            : "company-detail-page-navi"
        }
      >
        <div className="company-info-container">
          <div className="company-title-and-logo-image-container">
            <div className="company-info-logo-image-container">
              <ColorExtractor getColors={setColors}>
                <img
                  src={
                    company
                      ? company.logo_image_url === ""
                        ? process.env.PUBLIC_URL + "/no-image.png"
                        : company.logo_image_url
                      : company.logo_image_url
                  }
                  alt=""
                />
              </ColorExtractor>
            </div>
            <div className="company-info-title-container">
              <h1 className="company-title">
                {company ? company.name : ""}
                <sup
                  className={
                    company
                      ? company.is_approved
                        ? "company-approve-container-active"
                        : "company-approve-container"
                      : ""
                  }
                >
                  <CheckCircleIcon fontSize="small" />
                </sup>
                {/* <sup className="company-job-count">+{company.job_count}</sup> */}
              </h1>
            </div>
          </div>
          <div className="company-info-cover-image-container">
            <img
              src={
                company
                  ? company.cover_image_url === ""
                    ? process.env.PUBLIC_URL + "/no-image-cover.jpg"
                    : company.cover_image_url
                  : process.env.PUBLIC_URL + "/no-image-cover.jpg"
              }
              alt=""
            />
          </div>
          <div className="company-settings-container">
            <div
              className="company-settings-icon-container"
              onClick={handleDropDown}
            >
              <MoreHorizIcon fontSize="medium" />
            </div>
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
                  onClick={handleShareDrawerOpen}
                >
                  <div className="company-settings-dropdown-item-icon-container">
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
        <div className="company-features-container">
          <ul className="company-features">
            <li
              className={
                infoSection === "isilanlari"
                  ? "company-feature-active"
                  : "company-feature"
              }
              style={{
                borderBottomColor:
                  infoSection === "isilanlari" &&
                  window.location.pathname.includes("/companies/") &&
                  companyDetailThemeColor !== ""
                    ? companyDetailThemeColor
                    : "#4e21e7",
              }}
            >
              <h4
                className="company-feature-title"
                id="isilanlari"
                onClick={handleSectionChange}
              >
                {`İş İlanları (${company ? company.job_count : 0})`}
              </h4>
            </li>
            {/* <li
              className={
                infoSection == "haberler"
                  ? "company-feature-active"
                  : "company-feature"
              }
            >
              <h4
                className="company-feature-title"
                id="haberler"
                onClick={handleSectionChange}
              >
                Haberler
              </h4>
            </li> */}
          </ul>
          <div className="filter-icon-container">
            <HtmlTooltip
              title="filtre"
              placement="bottom"
              TransitionComponent={Zoom}
            >
              <div
                className="filter-icon"
                style={{
                  backgroundColor:
                    window.location.pathname.includes("/companies/") &&
                    companyDetailThemeColor !== ""
                      ? companyDetailThemeColor
                      : "#4e21e7",
                }}
                onClick={handleFilterClick}
              >
                <TuneIcon fontSize="medium" />
              </div>
            </HtmlTooltip>
          </div>
        </div>
        {/* <div className="company-search-container">
          <div className="company-search-inner-container">
            <input
              type="text"
              className="company-search-input"
              placeholder="Pozisyon adı veya lokasyon"
            />
            <div className="company-search-input-icon-container">
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </div>
          </div>
        </div> */}
      </div>
      {elementsLoading ? (
        <div className="company-skeleton-jobs-container">
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
        </div>
      ) : (
        <div className="company-jobs-container">
          {companyDetailJobs.length > 0 &&
          companyDetailJobs[0].scrape_name === company.scrape_name ? (
            companyDetailJobs.map((job) => {
              return <Job job={job} key={job._id} />;
            })
          ) : (
            <div></div>
          )}
        </div>
      )}
      <Dialog open={companyDialog} onClose={handleDialogClose}>
        <CompanyFilter />
      </Dialog>
      <Drawer
        open={companyMobileDialog}
        anchor="bottom"
        onClose={handleMobilDialogClose}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        <CompanyMobileFilter />
      </Drawer>
      {loaderVisible ? (
        <div className="loader-container" ref={setElement}>
          {hasMore ? (
            <div className={loader ? "loader-active" : "loader"}>
              <CircularProgress
                size="30px"
                sx={{ color: "#4e21e7", opacity: 0.8 }}
              />
            </div>
          ) : (
            <div className="seen-all-container">
              {companyDetailJobs.length > 20 ? (
                <h5 className="seen-all">Tümünü gördün</h5>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CompanyDetailPage;
