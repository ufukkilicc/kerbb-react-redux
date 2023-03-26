import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.scss";
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
import { DateHelper } from "../../helpers/dateHelper";
import { Link } from "react-router-dom";
import { toDateHelper } from "../../helpers/toDateHelper";
import { ReadHelper } from "../../helpers/readHelper";
import CountUp from "react-countup";
import { fetchTotal } from "../../features/total/totalAPI";
import { updateMobileNaviObject } from "../../features/navigation/navigationSlice";
import TopMobileNavi from "../TopMobileNavi/TopMobileNavi";
import BottomMobileNavi from "../BottomMobileNavi/BottomMobileNavi";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import {
  AiFillInstagram,
  AiFillRightCircle,
  AiOutlineRight,
} from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import Carousel from "../Carousel/Carousel";
import Carousel2 from "../Carousel/Carousel";

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
  const [nextLine, setNextLine] = useState(false);
  const [lineEnd, setLineEnd] = useState(false);
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
  const [companyCount, setCompanyCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [topNaviHeader, setTopNaviHeader] = useState(null);
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
      const totals = await fetchTotal();
      setElementsLoading(false);
      setJobCount(totals.data["job"]);
      setCompanyCount(slideCompaniesResponse.data.length);
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
    dispatch(updateMobileNaviObject(null));
    fetchData();

    // const MINUTE_MS = 3000;

    // const interval = setInterval(() => {
    //   const news = highlightedNews[sliderCount];
    //   setCurrentSlidernews(news);
    //   setSliderCount(
    //     (sliderCount) => (sliderCount + 1) % highlightedNews.length
    //   );
    //   (sliderCount);
    // }, MINUTE_MS);

    // return () => clearInterval(interval);
  }, []);
  // let counter = 0;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeout(() => {
  //       if (autoScroll) {
  //         setCurrentSlidernews(highlightedNews[counter]);
  //         (highlightedNews.length);
  //         (counter);
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
  //     (sec.offsetTop);
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
        <Carousel2 />
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
                    {/* <h1 className="index-header">{`0${index + 1}`}</h1> */}
                    <Company key={company._id} company={company} />
                  </li>
                );
              })
            ) : (
              <div></div>
            )}
          </ul>
        )}
        <div className="highlighted-companies-see-more-header-container">
          <Link to="/dashboard/search">
            <h1 className="highlighted-companies-see-more-header">
              Tümünü gör
            </h1>
          </Link>
        </div>
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
        <div className="highlighted-jobs-see-more-header-container">
          <Link to="/dashboard/search">
            <h1 className="highlighted-jobs-see-more-header">Tümünü gör</h1>
          </Link>
        </div>
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
                      <a href={`/dashboard/news/${news.news_title}`}>
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
                          <a href={`/dashboard/news/${news.news_title}`}>
                            <div className="news-title-container">
                              <h4 className="news-title">{news.news_title}</h4>
                            </div>
                          </a>
                          <a href={`/dashboard/news/${news.news_title}`}>
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
                currentSliderNews ? currentSliderNews.news_title : ""
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
        <div className="bottom-navi-first">
          <div className="bottom-navi-first-logo-container">
            <div className="logo-container">
              <h1 className="logo-header">Kerbb</h1>
              <div className="logo"></div>
            </div>
            <h1 className="par">
              Şirketlerin kariyer platformlarındaki ilanları keşfet!
            </h1>
          </div>
          <div className="bottom-navi-first-navi">
            <Link to="/about">
              <div className="item">
                <h1>Hakkımızda</h1>
              </div>
            </Link>
            <Link to="/contact">
              <div className="item">
                <h1>İletişim</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="bottom-navi-second">
          <h1 className="bottom-navi-second-sss">
            @ 2023 kerbb.com Her Hakkı Saklıdır.
          </h1>
          <div className="bottom-navi-second-socials-container">
            <h1>Bizi Takip Edin</h1>
            <div className="bottom-navi-second-socials">
              <a
                href="https://www.linkedin.com/company/kerbbcom/"
                target="_blank"
              >
                <AiFillInstagram fontSize={30} />
              </a>
              <a href="https://www.instagram.com/kerbbcom/" target="_blank">
                <AiFillLinkedin fontSize={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <DoubleArrowIcon
        fontSize="large"
        className={
          scrollTopButton
            ? "scroll-top-button-container-active"
            : "scroll-top-button-container"
        }
        onClick={scrollToTop}
      />
    </div>
  );
};

export default LandingPage;
