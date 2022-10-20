import React, { useState } from "react";
import "./News.scss";
import CircleIcon from "@mui/icons-material/Circle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { DateHelper } from "../../../helpers/dateHelper";
import { ReadHelper } from "../../../helpers/readHelper";
import { toDateHelper } from "../../../helpers/toDateHelper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const News = ({ news }) => {
  const [tooltip, setTooltip] = useState(false);
  const DateHandler = (date) => {
    return DateHelper(date);
  };
  const toDateHandler = (date) => {
    return toDateHelper(date);
  };
  return (
    <div className="news">
      <div className="news-info-navi-container">
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
              <LazyLoadImage
                effect="opacity"
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
                {news.news_publisher ? news.news_publisher.publisher_name : ""}
              </h2>
            </div>
          </a>
        </div>
        <div className="news-info-container">
          <div className="news-title-and-content-container">
            <a href={`/dashboard/news/${news.news_title.toLowerCase()}`}>
              <div className="news-title-container">
                <h2 className="news-title">{news.news_title}</h2>
              </div>
            </a>
            <a href={`/dashboard/news/${news.news_title.toLowerCase()}`}>
              <div className="news-content-container">
                <p
                  className="news-content"
                  dangerouslySetInnerHTML={{ __html: news.news_content }}
                ></p>
              </div>
            </a>
          </div>
          <a href={`/dashboard/news/${news.news_title.toLowerCase()}`}>
            <div className="news-image-container">
              <LazyLoadImage
                effect="opacity"
                src={
                  news.image_url === ""
                    ? process.env.PUBLIC_URL + "/no-image.png"
                    : news.image_url
                }
                alt=""
              />
            </div>
          </a>
        </div>
        <div className="news-navi-container">
          <div className="news-info-container">
            <h5 className="news-date">{toDateHandler(news.news_date)}</h5>
            <div className="news-icon-container">
              <CircleIcon fontSize="small" />
            </div>
            <h5 className="news-min-read">
              {ReadHelper(news.news_content) === "0"
                ? `${1} dakikalık okuma`
                : `${ReadHelper(news.news_content)} dakikalık okuma`}
            </h5>
            {/* <h5 className="news-views">{`${news.news_views} görüntülenme`}</h5> */}
          </div>
          <div className="news-settings-etc-container">
            <div>
              <div className="news-settings-container">
                <MoreHorizIcon fontSize="medium" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
