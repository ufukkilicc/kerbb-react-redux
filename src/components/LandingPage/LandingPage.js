import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.scss";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { useDispatch } from "react-redux";
import { fetchCompanies } from "../../features/companies/companiesAPI";
import Company from "../Company/Company";
import Job from "../Job/Job";
import { fetchJobs } from "../../features/jobs/jobsAPI";
import Illustration from "../Illustration/Illustration";
import GridOnIcon from "@mui/icons-material/GridOn";
import WindowIcon from "@mui/icons-material/Window";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import SlideCompany from "../SlideCompany/SlideCompany";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { fetchNews } from "../../features/news/newsAPI";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import CircleIcon from "@mui/icons-material/Circle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SkeletonJob from "../SkeletonJob/SkeletonJob";
import SkeletonCompanySlide from "../SkeletonCompanySlide/SkeletonCompanySlide";
import SkeletonCompany from "../SkeletonCompany/SkeletonCompany";
import SkeletonNews from "../SkeletonNews/SkeletonNews";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useDispatch, useSelector } from "react-redux";
import {
  getScrolledPage,
  updateScrolledPage,
} from "../../features/scrolls/scrollsSlice";
import { getUserSearchHistory } from "../../features/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { DateHelper } from "../../helpers/dateHelper";
import { Link } from "react-router-dom";
import { toDateHelper } from "../../helpers/toDateHelper";
import { ReadHelper } from "../../helpers/readHelper";
// import ScrollContainer from "react-indiana-drag-scroll";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    minWidth: 200,
    maxWidth: 220,
    padding: "10px",
    fontSize: theme.typography.pxToRem(12),
    fontFamily: "'Poppins', sans-serif",
    border: "1px solid #dadde9",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  // [`& .${tooltipClasses.tooltipArrow}`]: {
  //   color: "white",
  //   border: "1px solid #dadde9",
  // },
}));

const LandingPage = () => {
  const dispatch = useDispatch();
  const companiesSlideRef = useRef();
  const landingPageRef = useRef();
  const autoCompleteRef = useRef();
  const autoCompleteWhereRef = useRef();
  const submitButtonRef = useRef();
  const newsSliderRef = useRef();
  const navigate = useNavigate();
  const [whatInput, setWhatInput] = useState("");
  const [whereInput, setWhereInput] = useState("");
  const [highlightedCompanies, setHighlightedCompanies] = useState([]);
  const [slideCompanies, setSlideCompanies] = useState([]);
  const [illustrationCompanies, setIllustrationCompanies] = useState([]);
  const [highlightedJobs, setHighlightedJobs] = useState([]);
  const [highlightedNews, setHighlightedNews] = useState([]);
  const [companiesGrid, setCompaniesGrid] = useState(0);
  const [companiesGridLeftEnd, setCompaniesGridLeftEnd] = useState(false);
  const [companiesGridRightEnd, setCompaniesGridRightEnd] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [currentSliderNews, setCurrentSlidernews] = useState(null);
  const [elementsLoading, setElementsLoading] = useState(false);
  const [scrollTopButton, setScrollTopButton] = useState(false);
  const [scrolltop, setScrolltop] = useState(0);
  const [autoCompleteWhatDropdown, setAutoCompleteWhatDropdown] =
    useState(false);
  const [autoCompleteWhereDropdown, setAutoCompleteWhereDropdown] =
    useState(false);
  const [
    autoCompleteWhereDropdownLocations,
    setautoCompleteWhereDropdownLocations,
  ] = useState([]);
  const [autoCompleteWhatDropdownLoading, setAutoCompleteWhatDropdownLoading] =
    useState(false);
  const [
    autoCompleteWhereDropdownLoading,
    setAutoCompleteWhereDropdownLoading,
  ] = useState(false);
  const [
    autoCompleteWhatDropdownCompanies,
    setAutoCompleteWhatDropdownCompanies,
  ] = useState([]);
  const [autoCompleteWhatDropdownJobs, setAutoCompleteWhatDropdownJobs] =
    useState([]);
  const [newsSliderCount, setNewsSliderCount] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  // const [companyCount, setCompanyCount] = useState(0);
  // const [jobCount, setJobCount] = useState(0);
  const [turkeyStates, setTurkeyStates] = useState([
    { _id: 1, name: "Adana" },
    { _id: 2, name: "Adıyaman" },
    { _id: 3, name: "Afyon" },
    { _id: 4, name: "Ağrı" },
    { _id: 5, name: "Amasya" },
    { _id: 6, name: "Ankara" },
    { _id: 7, name: "Antalya" },
    { _id: 8, name: "Artvin" },
    { _id: 9, name: "Aydın" },
    { _id: 10, name: "Balıkesir" },
    { _id: 11, name: "Bilecik" },
    { _id: 12, name: "Bingöl" },
    { _id: 13, name: "Bitlis" },
    { _id: 14, name: "Bolu" },
    { _id: 15, name: "Burdur" },
    { _id: 16, name: "Bursa" },
    { _id: 17, name: "Çanakkale" },
    { _id: 18, name: "Çankırı" },
    { _id: 19, name: "Çorum" },
    { _id: 20, name: "Denizli" },
    { _id: 21, name: "Diyarbakır" },
    { _id: 22, name: "Edirne" },
    { _id: 23, name: "Elazığ" },
    { _id: 24, name: "Erzincan" },
    { _id: 25, name: "Erzurum" },
    { _id: 26, name: "Eskişehir" },
    { _id: 27, name: "Gaziantep" },
    { _id: 28, name: "Giresun" },
    { _id: 29, name: "Gümüşhane" },
    { _id: 30, name: "Hakkari" },
    { _id: 31, name: "Hatay" },
    { _id: 32, name: "Isparta" },
    { _id: 33, name: "Mersin" },
    { _id: 34, name: "İstanbul" },
    { _id: 35, name: "İzmir" },
    { _id: 36, name: "Kars" },
    { _id: 37, name: "Kastamonu" },
    { _id: 38, name: "Kayseri" },
    { _id: 39, name: "Kırklareli" },
    { _id: 40, name: "Kırkşehir" },
    { _id: 41, name: "Kocaeli" },
    { _id: 42, name: "Konya" },
    { _id: 43, name: "Kütahya" },
    { _id: 44, name: "Malatya" },
    { _id: 45, name: "Manisa" },
    { _id: 46, name: "Kahramanmaraş" },
    { _id: 47, name: "Mardin" },
    { _id: 48, name: "Muğla" },
    { _id: 49, name: "Muş" },
    { _id: 50, name: "Nevşehir" },
    { _id: 51, name: "Niğde" },
    { _id: 52, name: "Ordu" },
    { _id: 53, name: "Rize" },
    { _id: 54, name: "Sakarya" },
    { _id: 55, name: "Samsun" },
    { _id: 56, name: "Siirt" },
    { _id: 57, name: "Sinop" },
    { _id: 58, name: "Sivas" },
    { _id: 59, name: "Tekirdağ" },
    { _id: 60, name: "Tokat" },
    { _id: 61, name: "Trabzon" },
    { _id: 62, name: "Tunceli" },
    { _id: 63, name: "Şanlıurfa" },
    { _id: 64, name: "Uşak" },
    { _id: 65, name: "Van" },
    { _id: 66, name: "Yozgat" },
    { _id: 67, name: "Zonguldak" },
    { _id: 68, name: "Aksaray" },
    { _id: 69, name: "Bayburt" },
    { _id: 70, name: "Karaman" },
    { _id: 71, name: "Kırıkkale" },
    { _id: 72, name: "Batman" },
    { _id: 73, name: "Şırnak" },
    { _id: 74, name: "Bartın" },
    { _id: 75, name: "Ardahan" },
    { _id: 76, name: "Iğdır" },
    { _id: 77, name: "Yalova" },
    { _id: 78, name: "Karabük" },
    { _id: 79, name: "Kilis" },
    { _id: 80, name: "Osmaniye" },
    { _id: 81, name: "Düzce" },
  ]);
  useEffect(() => {
    async function fetchData() {
      // const jobsResponse = await fetchJobs({
      //   what,
      //   where,
      //   page: pageCount,
      //   size: 20,
      // });
      setElementsLoading(true);
      const companiesResponse = await fetchCompanies({
        page: 1,
        size: 6,
        is_highlighted: true,
        sort: "ASC",
        sort_by: "highlight_order",
      });
      const slideCompaniesResponse = await fetchCompanies({
        page: 1,
        size: 50,
        is_active: true,
      });
      const illustrationCompaniesResponse = await fetchCompanies({
        page: 1,
        size: 20,
        is_active: true,
      });
      const jobsResponse = await fetchJobs({
        page: 1,
        size: 6,
        is_highlighted: true,
        sort: "ASC",
        sort_by: "highlight_order",
      });
      const newsResponse = await fetchNews({
        page: 1,
        size: 2,
      });
      setElementsLoading(false);
      setHighlightedCompanies(companiesResponse.data);
      setSlideCompanies(slideCompaniesResponse.data);
      setIllustrationCompanies(illustrationCompaniesResponse.data);
      setHighlightedJobs(jobsResponse.data);
      setHighlightedNews(newsResponse.data);
      if (window.innerWidth > 850) {
        setCurrentSlidernews(newsResponse.data[0]);
      }
    }
    document.addEventListener("click", handleWhatClickCapture, true);
    document.addEventListener("click", handleWhereClickCapture, true);
    fetchData();

    // const MINUTE_MS = 3000;

    // const interval = setInterval(() => {
    //   const news = highlightedNews[sliderCount];
    //   setCurrentSlidernews(news);
    //   setSliderCount(
    //     (sliderCount) => (sliderCount + 1) % highlightedNews.length
    //   );
    //   console.log(sliderCount);
    // }, MINUTE_MS);

    // return () => clearInterval(interval);
  }, []);
  // let counter = 0;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeout(() => {
  //       if (autoScroll) {
  //         setCurrentSlidernews(highlightedNews[counter]);
  //         console.log(highlightedNews.length);
  //         console.log(counter);
  //         if (counter !== highlightedNews.length - 1) {
  //           counter++;
  //         } else {
  //           counter = 0;
  //         }
  //         // newsSliderRef.current.scrollTo(sec);
  //       }
  //     }, 2000);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [highlightedNews.length > 0]);
  // useEffect(() => {
  //   if (currentSliderNews) {
  //     const sec = document.getElementById(currentSliderNews._id);
  //     console.log(sec.offsetTop);
  //     if (counter !== highlightedNews.length - 1) {
  //       newsSliderRef.current.scrollTo(0, sec.offsetTop);
  //     } else {
  //       newsSliderRef.current.scrollTo(0, 0);
  //     }
  //   }
  // }, [currentSliderNews]);
  const ucfirst = (str) => {
    var firstLetter = str.substr(0, 1);
    var last = firstLetter.toUpperCase() + str.substr(1);
    return last.replace("I", "İ");
  };
  const onWhatChange = async (e) => {
    const what = e.target.value;
    setWhatInput(what);
    if (what.length > 0) {
      setAutoCompleteWhatDropdown(true);
      // setAutoCompleteWhatDropdownLoading(true);
      const companiesResponse = await fetchCompanies({
        query_text: what,
        page: 1,
        size: 3,
      });
      const jobsResponse = await fetchJobs({
        what,
        page: 1,
        size: 3,
      });
      // setAutoCompleteWhatDropdownLoading(false);
      setAutoCompleteWhatDropdownCompanies(companiesResponse.data);
      setAutoCompleteWhatDropdownJobs(jobsResponse.data);
    } else {
      setAutoCompleteWhatDropdown(false);
    }
  };
  const onWhereChange = async (e) => {
    const where = e.target.value;
    setWhereInput(where);
    if (where.length > 0) {
      setAutoCompleteWhereDropdown(true);
      setAutoCompleteWhereDropdownLoading(true);
      const locations = await turkeyStates.filter((location) =>
        location.name.includes(ucfirst(where))
      );
      setautoCompleteWhereDropdownLocations(locations.slice(0, 3));
      setAutoCompleteWhatDropdownLoading(false);
    } else {
      setAutoCompleteWhereDropdown(false);
    }
  };
  const onWhatKeyUpCapture = (e) => {
    const key = e.code;
    if (key === "Escape") {
      setAutoCompleteWhatDropdown(false);
    }
  };
  const onWhereKeyUpCapture = (e) => {
    const key = e.code;
    if (key === "Escape") {
      setAutoCompleteWhereDropdown(false);
    }
  };
  const handleWhatClickCapture = (e) => {
    if (autoCompleteRef.current) {
      if (!autoCompleteRef.current.contains(e.target)) {
        setAutoCompleteWhatDropdown(false);
      }
    }
  };
  const handleWhereClickCapture = (e) => {
    if (autoCompleteWhereRef.current) {
      if (!autoCompleteWhereRef.current.contains(e.target)) {
        setAutoCompleteWhereDropdown(false);
      }
    }
  };
  const handleSetAutoCompleteWhatDropdown = (what) => {
    setWhatInput(what);
    setAutoCompleteWhatDropdown(false);
    setTimeout(() => {
      submitButtonRef.current.click();
    }, 1000);
  };
  const handleSetAutoCompleteWhereDropdown = (where) => {
    setWhereInput(where);
    setAutoCompleteWhereDropdown(false);
    setTimeout(() => {
      submitButtonRef.current.click();
    }, 1000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    scrollToTop();
    navigate(`/dashboard/search?what=${whatInput}&where=${whereInput}`);
  };
  const changeCompaniesGrid = () => {
    let companyLimitPerRow = parseInt(
      companiesSlideRef.current.clientWidth / 120
    );
    if (companiesGrid === 2) {
      setCompaniesGrid(0);
    } else {
      if (
        companiesGrid === 0 &&
        slideCompanies.length > companyLimitPerRow + 1
      ) {
        setCompaniesGrid(companiesGrid + 1);
      } else if (
        companiesGrid === 1 &&
        slideCompanies.length > companyLimitPerRow * 2 + 1
      ) {
        setCompaniesGrid(companiesGrid + 1);
      } else {
        setCompaniesGrid(0);
      }
    }
  };
  const handleScrollRight = () => {
    companiesSlideRef.current.scrollLeft += 400;
  };
  const handleScrollLeft = () => {
    companiesSlideRef.current.scrollLeft -= 400;
  };
  const handleScroll = (e) => {
    const scrollWidth = e.target.scrollWidth;
    const scrollLeft = e.target.scrollLeft;
    const clientLeft = e.target.clientWidth;
    const isRight = parseInt(scrollWidth - clientLeft) === parseInt(scrollLeft);
    if (scrollLeft === 0) {
      setCompaniesGridLeftEnd(true);
    } else {
      setCompaniesGridLeftEnd(false);
    }
    if (isRight) {
      setCompaniesGridRightEnd(true);
    } else {
      setCompaniesGridRightEnd(false);
    }
  };
  const DateHandler = (date) => {
    return DateHelper(date);
  };
  const toDateHandler = (date) => {
    return toDateHelper(date);
  };
  const toReadHelper = (content) => {
    return ReadHelper(content);
  };
  const handleTooltipOpen = () => {
    setTooltip(true);
  };
  const handleTooltipClose = () => {
    setTooltip(false);
  };
  const handleNewsHover = (news) => {
    if (window.innerWidth > 850) {
      setCurrentSlidernews(news);
      setAutoScroll(false);
    }
  };
  const handleNewsUnHover = () => {
    setAutoScroll(true);
  };
  const onScroll = () => {
    if (landingPageRef.current) {
      const { scrollTop } = landingPageRef.current;
      if (scrollTop > 0) {
        setScrollTopButton(true);
      } else {
        setScrollTopButton(false);
      }
    }
  };
  const scrollToTop = () => {
    landingPageRef.current.scrollTo(0, 0);
  };

  const scrolledPage = useSelector(getScrolledPage);
  const searchHistory = useSelector(getUserSearchHistory);

  useEffect(() => {
    if (scrolledPage === window.location.pathname) {
      scrollToTop();
      dispatch(updateScrolledPage(""));
    }
  }, [scrolledPage]);

  return (
    <div className="landing-page" ref={landingPageRef} onScroll={onScroll}>
      <Helmet>
        <title>Kurumsal İş İlanları, Şirket Haberleri | Kerbb</title>
        <meta
          property="og:title"
          content={`Kurumsal İş İlanları, Şirket Haberleri | Kerbb`}
        />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/kerbb/image/upload/v1664460395/local/website_photos/WhatsApp_Image_2022-09-29_at_00.17.34_mvym3a.jpg?w=800`}
        />
        <meta
          name="description"
          content={`Yüzlerce kurumsal şirketin iş ilanını ve haberlerini Kerbb ile keşfedin! | Kerbb`}
        />
      </Helmet>
      <div className="landing-page-banner-container">
        <div className="content-search-container">
          <div className="content-search">
            <div className="content-container">
              <div className="content-header-container">
                <h1 className="content-header">
                  Tek tıkla yüzlerce sitede dolaş.
                </h1>
              </div>
              <div className="content-content-container">
                <p className="content-content">
                  Şirketlerin kendi kariyer platformlarındaki ilanları tek tıkla
                  takip et!
                </p>
              </div>
            </div>
            {/* <div className="search-container">
              <form
                // onSubmit={handleSubmit}
                // onChange={onChangeHandler}
                className="search-form"
              >
                <div className="search-form-what-container">
                  <div className="search-form-what-header-container">
                    <h3 className="search-form-what-header">Ne</h3>
                  </div>
                  <input
                    type="text"
                    className="search-form-what-input"
                    placeholder="Pozisyon veya şirket adı"
                    onChange={onWhatChange}
                    value={whatInput}
                    onKeyUpCapture={onWhatKeyUpCapture}
                    // defaultValue={what}
                  />
                  <div className="search-form-what-icon-container">
                    <SearchIcon fontSize="small" />
                  </div>
                  <div
                    className={
                      autoCompleteWhatDropdown
                        ? "search-form-what-autocomplete-dropdown-container-active"
                        : "search-form-what-autocomplete-dropdown-container"
                    }
                    ref={autoCompleteRef}
                  >
                    {autoCompleteWhatDropdownLoading ? (
                      <div className="search-form-what-autocomplete-dropdown-loader">
                        <CircularProgress
                          size="30px"
                          sx={{ color: "#4e21e7", opacity: 0.8 }}
                        />
                      </div>
                    ) : (
                      <div className="search-form-what-autocomplete-dropdown-inner-container">
                        <div className="companies-dropdown-container">
                          <div className="companies-dropdown-header-container">
                            <h4 className="companies-dropdown-header">
                              ŞİRKETLER
                            </h4>
                          </div>
                          {autoCompleteWhatDropdownCompanies.length === 0 ? (
                            <h5 className="companies-dropdown-none-list-header">
                              Hiçbir sonuç bulunamadı.
                            </h5>
                          ) : (
                            <ul className="companies-dropdown-list">
                              {autoCompleteWhatDropdownCompanies.map(
                                (company) => {
                                  return (
                                    <li
                                      className="companies-dropdown-item"
                                      key={company._id}
                                      onClick={() =>
                                        handleSetAutoCompleteWhatDropdown(
                                          company.name
                                        )
                                      }
                                    >
                                      <div className="companies-dropdown-company">
                                        <div className="companies-dropdown-company-image-container">
                                          <img
                                            src={
                                              company
                                                ? company.logo_image_url !== ""
                                                  ? company.logo_image_url
                                                  : process.env.PUBLIC_URL +
                                                    "/no-image.png"
                                                : process.env.PUBLIC_URL +
                                                  "/no-image.png"
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <div className="companies-dropdown-company-name-container">
                                          <h5 className="companies-dropdown-company-name">
                                            {company.name}
                                          </h5>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          )}
                        </div>
                        <div className="jobs-dropdown-container">
                          <div className="jobs-dropdown-header-container">
                            <h4 className="jobs-dropdown-header">İLANLAR</h4>
                          </div>
                          {autoCompleteWhatDropdownJobs.length === 0 ? (
                            <h5 className="jobs-dropdown-none-list-header">
                              Hiçbir sonuç bulunamadı.
                            </h5>
                          ) : (
                            <ul className="jobs-dropdown-list">
                              {autoCompleteWhatDropdownJobs.map((job) => {
                                return (
                                  <li
                                    className="jobs-dropdown-item"
                                    key={job._id}
                                    onClick={() =>
                                      handleSetAutoCompleteWhatDropdown(
                                        job.job_title
                                      )
                                    }
                                  >
                                    <div className="jobs-dropdown-job">
                                      <div className="jobs-dropdown-job-image-container">
                                        <img
                                          src={
                                            job
                                              ? job.job_company &&
                                                job.job_company
                                                  .logo_image_url !== ""
                                                ? job.job_company.logo_image_url
                                                : process.env.PUBLIC_URL +
                                                  "/no-image.png"
                                              : process.env.PUBLIC_URL +
                                                "/no-image.png"
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div className="jobs-dropdown-job-name-container">
                                        <h5 className="jobs-dropdown-job-name">
                                          {job.job_title}
                                        </h5>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                        <div className="search-history-dropdown-container">
                          <div className="search-history-dropdown-header-container">
                            <h4 className="search-history-dropdown-header">
                              SON ARANANLAR
                            </h4>
                          </div>
                          {searchHistory && searchHistory.length === 0 ? (
                            <div></div>
                          ) : (
                            <ul className="search-history-dropdown-list">
                              {searchHistory ? (
                                searchHistory.map((sh) => {
                                  return (
                                    <li
                                      className="search-history-dropdown-item"
                                      onClick={() =>
                                        handleSetAutoCompleteWhatDropdown(
                                          sh.what
                                        )
                                      }
                                    >
                                      <div className="search-history-dropdown-search-history">
                                        <div className="search-history-dropdown-icon-container">
                                          <SearchIcon fontSize="small" />
                                        </div>
                                        <div className="search-history-dropdown-name-container">
                                          <h5 className="search-history-dropdown-name">
                                            {sh.what}
                                          </h5>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })
                              ) : (
                                <div></div>
                              )}
                            </ul>
                          )}
                        </div>
                        <div className="arrow-container">
                          <PlayArrowIcon />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="search-form-where-container">
                  <div className="search-form-where-header-container">
                    <h3 className="search-form-where-header">Nerede</h3>
                  </div>
                  <input
                    type="text"
                    className="search-form-where-input"
                    placeholder="İstanbul'da"
                    onChange={onWhereChange}
                    value={whereInput}
                    onKeyUpCapture={onWhereKeyUpCapture}
                    // defaultValue={where}
                  />
                  <div className="search-form-where-icon-container">
                    <LocationOnIcon fontSize="small" />
                  </div>
                  <div
                    className={
                      autoCompleteWhereDropdown
                        ? "search-form-where-autocomplete-dropdown-container-active"
                        : "search-form-where-autocomplete-dropdown-container"
                    }
                    ref={autoCompleteWhereRef}
                  >
                    <div className="search-form-where-autocomplete-dropdown-inner-container">
                      <div className="locations-dropdown-container">
                        <div className="locations-dropdown-header-container">
                          <h4 className="locations-dropdown-header">
                            LOKASYON
                          </h4>
                        </div>
                        {autoCompleteWhereDropdownLocations.length === 0 ? (
                          <h5 className="locations-dropdown-none-list-header">
                            Hiçbir sonuç bulunamadı.
                          </h5>
                        ) : (
                          <ul className="locations-dropdown-list">
                            {autoCompleteWhereDropdownLocations.map(
                              (location) => {
                                return (
                                  <li
                                    className="locations-dropdown-item"
                                    key={location._id}
                                    onClick={() =>
                                      handleSetAutoCompleteWhereDropdown(
                                        location.name
                                      )
                                    }
                                  >
                                    <div className="locations-dropdown-location">
                                      <div className="locations-dropdown-location-icon-container">
                                        <LocationOnIcon fontSize="small" />
                                      </div>
                                      <div className="locations-dropdown-location-name-container">
                                        <h5 className="locations-dropdown-location-name">
                                          {location.name}
                                        </h5>
                                      </div>
                                    </div>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        )}
                      </div>
                      <div className="search-history-dropdown-container">
                        <div className="search-history-dropdown-header-container">
                          <h4 className="search-history-dropdown-header">
                            SON ARANANLAR
                          </h4>
                        </div>
                        {searchHistory && searchHistory.length === 0 ? (
                          <div></div>
                        ) : (
                          <ul className="search-history-dropdown-list">
                            {searchHistory ? (
                              searchHistory.map((sh) => {
                                return (
                                  <li
                                    className="search-history-dropdown-item"
                                    onClick={() =>
                                      handleSetAutoCompleteWhereDropdown(
                                        sh.where
                                      )
                                    }
                                  >
                                    <div className="search-history-dropdown-search-history">
                                      <div className="search-history-dropdown-icon-container">
                                        <SearchIcon fontSize="small" />
                                      </div>
                                      <div className="search-history-dropdown-name-container">
                                        <h5 className="search-history-dropdown-name">
                                          {sh.where}
                                        </h5>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })
                            ) : (
                              <div></div>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="search-form-button"
                  ref={submitButtonRef}
                  onClick={handleSubmit}
                >
                  Ara
                </button>
              </form>
            </div> */}
          </div>
        </div>
        <div className="illustration-container">
          <Illustration
            companies={
              illustrationCompanies.length > 0 ? illustrationCompanies : []
            }
          />
        </div>
      </div>
      <div className="highlighted-companies-container">
        <div className="higlighted-companies-header-container">
          <h1 className="highlighted-companies-header">ÖNE ÇIKAN ŞİRKETLER</h1>
        </div>
        {elementsLoading ? (
          <div className="highlighted-companies-skeleton-list">
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
          </div>
        ) : (
          <ul className="highlighted-companies-list">
            {highlightedCompanies ? (
              highlightedCompanies.map((company, index) => {
                return (
                  <li key={company._id} className="highlighted-companies-item">
                    <h1 className="index-header">{`0${index + 1}`}</h1>
                    <Company key={company._id} company={company} />
                  </li>
                );
              })
            ) : (
              <div></div>
            )}
          </ul>
        )}
      </div>
      <div className="companies-slide-container">
        <div className="companies-slide-grid-button-container">
          {companiesGrid === 0 ? (
            <div className="grid-button" onClick={changeCompaniesGrid}>
              <CropSquareIcon fontSize="large" />
            </div>
          ) : (
            [
              companiesGrid === 1 ? (
                <div className="grid-button" onClick={changeCompaniesGrid}>
                  <WindowIcon fontSize="large" />
                </div>
              ) : (
                <div className="grid-button" onClick={changeCompaniesGrid}>
                  <GridOnIcon fontSize="large" />
                </div>
              ),
            ]
          )}
        </div>
        <div className="companies-slide">
          <div
            className={
              companiesGridLeftEnd
                ? "companies-slide-left-arrow-container"
                : "companies-slide-left-arrow-container-active"
            }
            onClick={handleScrollLeft}
          >
            <ArrowBackIosIcon fontSize="medium" />
          </div>
          <div
            className="companies-slide-inner"
            ref={companiesSlideRef}
            onScroll={handleScroll}
          >
            {/* <ScrollContainer className="scroll-container"> */}
            {elementsLoading ? (
              <div className="companies-skeleton-slide-inner-zero">
                <SkeletonCompanySlide />
                <SkeletonCompanySlide />
                <SkeletonCompanySlide />
                <SkeletonCompanySlide />
                <SkeletonCompanySlide />
                <SkeletonCompanySlide />
                <SkeletonCompanySlide />
                <SkeletonCompanySlide />
                <SkeletonCompanySlide />
              </div>
            ) : (
              <div
                className={
                  companiesGrid === 0
                    ? "companies-slide-inner-zero"
                    : [
                        companiesGrid === 1
                          ? "companies-slide-inner-one"
                          : "companies-slide-inner-two",
                      ]
                }
              >
                {slideCompanies ? (
                  slideCompanies.map((company) => {
                    return <SlideCompany key={company._id} company={company} />;
                  })
                ) : (
                  <div></div>
                )}
              </div>
            )}
            {/* </ScrollContainer> */}
          </div>
          <div
            className={
              companiesGridRightEnd
                ? "companies-slide-right-arrow-container"
                : "companies-slide-right-arrow-container-active"
            }
            onClick={handleScrollRight}
          >
            <ArrowForwardIosIcon fontSize="medium" />
          </div>
        </div>
      </div>
      <div className="highlighted-jobs-container">
        <div className="highlighted-jobs-header-container">
          <h1 className="highlighted-jobs-header">ÖNE ÇIKAN İLANLAR</h1>
        </div>
        {elementsLoading ? (
          <div className="highlighted-jobs-skeleton-list">
            <SkeletonJob />
            <SkeletonJob />
            <SkeletonJob />
            <SkeletonJob />
            <SkeletonJob />
            <SkeletonJob />
          </div>
        ) : (
          <ul className="highlighted-jobs-list">
            {highlightedJobs ? (
              highlightedJobs.map((job) => {
                return (
                  <li key={job._id} className="highlighted-jobs-item">
                    <Job key={job._id} job={job} />
                  </li>
                );
              })
            ) : (
              <div></div>
            )}
          </ul>
        )}
      </div>
      <div className="highlighted-news-container">
        <div className="highlighted-news-header-container">
          <h1 className="highlighted-news-header">KURUMSAL HABERLER</h1>
          {/* <a
            href="https://www.linkedin.com/company/inbusinesstime"
            rel="noreferrer"
            target="_blank"
          >
            <div className="sponsor">
              <div className="sponsor-icon">
                <HandshakeIcon fontSize="small" />
              </div>
              <h1 className="sponsor-header">inbusinesstime</h1>
            </div>
          </a> */}
        </div>
        <div className="higlighted-news-inner-container">
          {elementsLoading ? (
            <div className="news-skeleton-slider">
              <SkeletonNews />
              <SkeletonNews />
              <SkeletonNews />
              <SkeletonNews />
              <SkeletonNews />
            </div>
          ) : (
            <div className="news-slider" id="news-slider" ref={newsSliderRef}>
              {highlightedNews ? (
                highlightedNews.map((news) => {
                  return (
                    <div
                      className={
                        currentSliderNews && currentSliderNews._id === news._id
                          ? "news-active"
                          : "news"
                      }
                      key={news._id}
                      id={news._id}
                      onMouseEnter={() => handleNewsHover(news)}
                      onMouseLeave={() => handleNewsUnHover()}
                    >
                      <div className="news-publisher-container">
                        <a
                          target="_blank"
                          rel="noreferer"
                          href={
                            news.news_publisher
                              ? news.news_publisher.publisher_redirect_link
                              : ""
                          }
                        >
                          <div className="news-publisher-image-container">
                            <img
                              src={
                                news.news_publisher
                                  ? news.news_publisher.logo_image_url === ""
                                    ? process.env.PUBLIC_URL + "/no-image.png"
                                    : news.news_publisher.logo_image_url
                                  : process.env.PUBLIC_URL + "/no-image.png"
                              }
                              alt=""
                            />
                          </div>
                        </a>
                        <a
                          target="_blank"
                          rel="noreferer"
                          href={
                            news.news_publisher
                              ? news.news_publisher.publisher_redirect_link
                              : ""
                          }
                        >
                          <div className="news-publisher-name-container">
                            <h2 className="news-publisher-name">
                              {news.news_publisher
                                ? news.news_publisher.publisher_name
                                : ""}
                            </h2>
                          </div>
                        </a>
                      </div>
                      <a href={`/dashboard/news/${news._id}`}>
                        <div className="news-image-container">
                          <img
                            src={
                              news.image_url === ""
                                ? process.env.PUBLIC_URL + "/no-image.png"
                                : news.image_url
                            }
                            alt=""
                          />
                        </div>
                      </a>
                      <div className="news-title-content-container">
                        <div className="news-title-content">
                          <a href={`/dashboard/news/${news._id}`}>
                            <div className="news-title-container">
                              <h4 className="news-title">{news.news_title}</h4>
                            </div>
                          </a>
                          <a href={`/dashboard/news/${news._id}`}>
                            <div className="news-content-container">
                              <p
                                className="news-content"
                                dangerouslySetInnerHTML={{
                                  __html: news.news_content,
                                }}
                              ></p>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="news-navi-container">
                        <div className="news-info-container">
                          <h5 className="news-date">
                            {toDateHandler(news.news_date)}
                          </h5>
                          <div className="news-info-icon-container">
                            <CircleIcon fontSize="small" />
                          </div>
                          <h5 className="news-min-read">
                            {toReadHelper(news.news_content) === "0"
                              ? `${1} dakikalık okuma`
                              : `${toReadHelper(
                                  news.news_content
                                )} dakikalık okuma`}
                          </h5>
                          {/* <h5 className="news-views">
                            {`${news.news_views} görüntülenme`}
                          </h5> */}
                        </div>
                        <div className="news-settings-etc-container">
                          <ClickAwayListener onClickAway={handleTooltipClose}>
                            <div>
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "3px",
                                        width: "100%",
                                      }}
                                    >
                                      <DoNotDisturbIcon fontSize="small" />
                                      <h4>Bunun gibi daha az göster</h4>
                                    </Box>
                                  </React.Fragment>
                                }
                                onClose={handleTooltipClose}
                                open={tooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                placement="bottom"
                              >
                                <div
                                  className="news-settings-container"
                                  onClick={handleTooltipOpen}
                                >
                                  <MoreHorizIcon fontSize="medium" />
                                </div>
                              </HtmlTooltip>
                            </div>
                          </ClickAwayListener>
                        </div>
                      </div>
                      <div className="signutare"></div>
                    </div>
                  );
                })
              ) : (
                <div></div>
              )}
            </div>
          )}
          <div className="news-slider-main-image">
            <div className="news-publisher-container">
              <a
                target="_blank"
                rel="noreferer"
                href={
                  currentSliderNews && currentSliderNews.news_publisher
                    ? currentSliderNews.news_publisher.publisher_redirect_link
                    : ""
                }
              >
                <div className="news-publisher-image-container">
                  <img
                    src={
                      currentSliderNews && currentSliderNews.news_publisher
                        ? currentSliderNews.news_publisher.logo_image_url === ""
                          ? process.env.PUBLIC_URL + "/no-image.png"
                          : currentSliderNews.news_publisher.logo_image_url
                        : process.env.PUBLIC_URL + "/no-image.png"
                    }
                    alt=""
                  />
                </div>
              </a>
              <a
                target="_blank"
                rel="noreferer"
                href={
                  currentSliderNews && currentSliderNews.news_publisher
                    ? currentSliderNews.news_publisher.publisher_redirect_link
                    : ""
                }
              >
                <div className="news-publisher-name-container">
                  <h2 className="news-publisher-name">
                    {currentSliderNews && currentSliderNews.news_publisher
                      ? currentSliderNews.news_publisher.publisher_name
                      : ""}
                  </h2>
                </div>
              </a>
            </div>
            <a
              href={`/dashboard/news/${
                currentSliderNews ? currentSliderNews._id : ""
              }`}
            >
              <img
                src={
                  currentSliderNews
                    ? [
                        currentSliderNews.image_url === ""
                          ? process.env.PUBLIC_URL + "/no-image.png"
                          : currentSliderNews.image_url,
                      ]
                    : ""
                }
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="highlighted-news-see-more-header-container">
          <Link to="/dashboard/news">
            <h1 className="highlighted-news-see-more-header">Tümünü gör</h1>
          </Link>
          {/* <a
            href="https://www.linkedin.com/company/inbusinesstime"
            rel="noreferrer"
            target="_blank"
          >
            <div className="sponsor">
              <div className="sponsor-icon">
                <HandshakeIcon fontSize="small" />
              </div>
              <h1 className="sponsor-header">inbusinesstime</h1>
            </div>
          </a> */}
        </div>
      </div>
      <div className="bottom-navi-container">
        <div className="bottom-navi-slogan-logo-info-container">
          <div className="slogan-logo-container">
            <div className="slogan-container">
              <p className="slogan">
                Şirketlerin kendi kariyer platformlarındaki ilanları tek tıkla
                keşfet!
              </p>
            </div>
            <div className="logo-container">
              <h1 className="logo-header">Kerbb</h1>
              <div className="logo"></div>
            </div>
          </div>
          <div className="info-container">
            <div className="info-inner-container">
              <div className="info-site-links-container">
                {/* <h4 className="info-site-links-header">Site Linkleri</h4> */}
                <ul className="info-site-links-list">
                  <Link to="/about">
                    <li className="site-links-item">
                      <h5 className="site-links-item-header">Hakkımızda</h5>
                    </li>
                  </Link>
                  <Link to="/contact">
                    <li className="site-links-item">
                      <h5 className="site-links-item-header">İletişim</h5>
                    </li>
                  </Link>
                </ul>
              </div>
              {/* <div className="info-companies-container">
                <h4 className="info-companies-header">Şirketler</h4>
                <ul className="info-companies-list">
                  <li className="companies-item">
                    <h5 className="companies-item-header">Getir</h5>
                  </li>
                  <li className="companies-item">
                    <h5 className="companies-item-header">Sanofi</h5>
                  </li>
                  <li className="companies-item">
                    <h5 className="companies-item-header">Koç Holding</h5>
                  </li>
                  <li className="companies-item">
                    <h5 className="companies-item-header">Unilever</h5>
                  </li>
                  <li className="companies-item">
                    <h5 className="companies-item-header">Arçelik Global</h5>
                  </li>
                </ul>
              </div> */}
              {/* <div className="info-news-container">
                <h4 className="info-news-header">Haberler</h4>
                <ul className="info-news-list">
                  <li className="news-item">
                    <h5 className="news-item-header">Getir</h5>
                  </li>
                  <li className="news-item">
                    <h5 className="news-item-header">Sanofi</h5>
                  </li>
                  <li className="news-item">
                    <h5 className="news-item-header">Koç Holding</h5>
                  </li>
                  <li className="news-item">
                    <h5 className="news-item-header">Unilever</h5>
                  </li>
                </ul>
              </div> */}
              {/* <div className="info-partners-container">
                <h4 className="info-partners-header">Partnerler</h4>
                <ul className="info-partners-list">
                  <li className="partners-item">
                    <a
                      href="https://www.linkedin.com/company/inbusinesstime"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <h5 className="partners-item-header">inbusinesstime</h5>
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <div className="bottom-navi-socials-container">
          <ul className="socials-list">
            <li className="socials-item">
              <a
                href="https://www.instagram.com/kerbbcom"
                rel="noreferrer"
                target="_blank"
              >
                <div className="instagram-icon-container">
                  <InstagramIcon fontSize="large" />
                </div>
              </a>
            </li>
            <li className="socials-item">
              <a
                href="https://www.linkedin.com/company/inbusinesstime"
                rel="noreferrer"
                target="_blank"
              >
                <div className="linkedin-icon-container">
                  <LinkedInIcon fontSize="large" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          scrollTopButton
            ? "scroll-top-button-container-active"
            : "scroll-top-button-container"
        }
        onClick={scrollToTop}
      >
        <DoubleArrowIcon fontSize="large" />
      </div>
    </div>
  );
};

export default LandingPage;
