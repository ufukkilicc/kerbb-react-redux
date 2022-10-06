import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsOne, incrementNewsView } from "../../features/news/newsAPI";
import "./NewsDetailPage.scss";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import CircleIcon from "@mui/icons-material/Circle";
import { useSelector, useDispatch } from "react-redux";
import {
  getSnackBar,
  updateSnackBar,
} from "../../features/snackbar/snackbarSlice";
import { Helmet } from "react-helmet";
import { DateHelper } from "../../helpers/dateHelper";
import CircleIcon from "@mui/icons-material/Circle";
import { ReadHelper } from "../../helpers/readHelper";
import IosShareIcon from "@mui/icons-material/IosShare";
import { updateShareOpen } from "../../features/shareDrawer/shareDrawerSlice";
import { toDateHelper } from "../../helpers/toDateHelper";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";

const NewsDetailPage = () => {
  const dispatch = useDispatch();
  const newsDetailInnerRef = useRef();
  let { id } = useParams();
  const [news, setNews] = useState({});
  const [tooltip, setTooltip] = useState(false);
  const [scrolltop, setScrolltop] = useState(0);
  const [naviSticky, setNaviSticky] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await incrementNewsView(id);
      const newsResponseDetail = await fetchNewsOne(id);
      setNews(newsResponseDetail.data);
      console.log(newsResponseDetail.data.news_content);
    }
    fetchData();
  }, []);
  const handleTooltipOpen = () => {
    setTooltip(true);
  };
  const handleTooltipClose = () => {
    setTooltip(false);
  };
  const handleCopyClipboard = (link) => {
    navigator.clipboard.writeText(link);
    dispatch(
      updateSnackBar({
        open: true,
        type: "success",
        message: "Link kopyalandı",
      })
    );
  };
  const DateHandler = (date) => {
    return DateHelper(date);
  };
  const toDateHandler = (date) => {
    return toDateHelper(date);
  };
  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      setNaviSticky(true);
    } else {
      setNaviSticky(false);
    }
  };
  const openShareDrawer = () => {
    dispatch(updateShareOpen(true));
  };
  const onScroll = (event) => {
    // if (naviSticky) {
    //   if (naviSticky) {
    //     console.log("made no")
    //     setNaviSticky(false);
    //   }
    // } else {
    //   if (!naviSticky) {
    //     console.log("made yes")
    //     setNaviSticky(true);
    //   }
    // }
  };
  const snackbar = useSelector(getSnackBar);
  return (
    <div
      className="news-detail-page"
      onWheel={handleWheel}
      onScroll={onScroll}
      ref={newsDetailInnerRef}
    >
      <Helmet>
        <title>{news.news_title}</title>
        <meta property="og:title" content={`${news.news_title} | Kerbb`} />
        <meta property="og:image" content={`${news.image_url}?w=800`} />
        <meta name="description" content={news.news_content} />
      </Helmet>
      <div
        className={
          naviSticky
            ? "news-detail-navi-container-active"
            : "news-detail-navi-container"
        }
      >
        <div className="news-detail-publisher-container">
          <a
            target="_blank"
            rel="noreferer"
            href={
              news.news_publisher
                ? news.news_publisher.publisher_redirect_link
                : ""
            }
          >
            <div className="news-detail-publisher-image-container">
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
          <div className="news-detail-publisher-name-outer-container">
            <a
              target="_blank"
              rel="noreferer"
              href={
                news.news_publisher
                  ? news.news_publisher.publisher_redirect_link
                  : ""
              }
            >
              <div className="news-detail-publisher-name-container">
                <h2 className="news-detail-publisher-name">
                  {news.news_publisher
                    ? news.news_publisher.publisher_name
                    : ""}
                </h2>
              </div>
            </a>
            <div className="news-detail-info-container">
              <div className="news-detail-info-inner-container">
                <div className="news-detail-info-date-container">
                  <h6 className="news-detail-info-date">
                    {toDateHandler(news.news_date)}
                  </h6>
                </div>
                <div className="news-icon-container">
                  <CircleIcon fontSize="small" />
                </div>
                <div className="news-detail-info-min-read">
                  <h6 className="news-min-read">
                    {news.news_content
                      ? ReadHelper(news.news_content) === "0"
                        ? `${1} dakikalık okuma`
                        : `${ReadHelper(news.news_content)} dakikalık okuma`
                      : ""}
                  </h6>
                </div>
                {/* <div className="news-detail-info-views-container">
            <h5 className="news-detail-info-views">{`${news.news_views} görüntülenme`}</h5>
          </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="news-detail-settings-and-socials-container">
          <div className="news-detail-socials-container">
            <li className="news-detail-social-item">
              <div className="twitter-icon-container">
                <TwitterShareButton
                  url={`https://kerbb.com/dashboard/news/${news._id}`}
                >
                  <TwitterIcon fontSize="small" />
                </TwitterShareButton>
              </div>
            </li>
            <li className="news-detail-social-item">
              <div className="facebook-icon-container">
                <FacebookShareButton
                  url={`https://kerbb.com/dashboard/news/${news._id}`}
                >
                  <FacebookIcon fontSize="small" />
                </FacebookShareButton>
              </div>
            </li>
            <li className="news-detail-social-item">
              <div className="linkedin-icon-container">
                <LinkedinShareButton
                  url={`https://kerbb.com/dashboard/news/${news._id}`}
                >
                  <LinkedInIcon fontSize="small" />
                </LinkedinShareButton>
              </div>
            </li>
            <li className="news-detail-social-item">
              <div className="whatsapp-icon-container">
                <WhatsappShareButton
                  url={`https://kerbb.com/dashboard/news/${news._id}`}
                >
                  <WhatsAppIcon fontSize="small" />
                </WhatsappShareButton>
              </div>
            </li>
            <li className="news-detail-social-item">
              <div className="telegram-icon-container">
                <TelegramShareButton
                  url={`https://kerbb.com/dashboard/news/${news._id}`}
                >
                  <TelegramIcon fontSize="small" />
                </TelegramShareButton>
              </div>
            </li>
            <li className="news-detail-social-item">
              <div
                className="copy-link-icon-container"
                onClick={() =>
                  handleCopyClipboard(
                    `https://kerbb.com/dashboard/news/${news._id}`
                  )
                }
              >
                <LinkIcon fontSize="small" />
              </div>
            </li>
          </div>
        </div>
      </div>
      <div className="news-detail-inner-container">
        <div className="news-detail-inner-header-container">
          <h1 className="news-detail-inner-header">{news.news_title}</h1>
        </div>
        {news.image_url_secondary === "" ? (
          <div></div>
        ) : (
          <div className="news-detail-inner-image-container">
            <img
              src={
                news.image_url_secondary === ""
                  ? process.env.PUBLIC_URL + "/no-image.png"
                  : news.image_url_secondary
              }
              alt=""
            />
          </div>
        )}
        <div className="news-detail-inner-content-container">
          <p
            className="news-detail-inner-content"
            dangerouslySetInnerHTML={{
              __html: news.news_content,
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
