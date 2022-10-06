import React, { useEffect, useState } from "react";
import "./SideInfoBar.scss";
import CircleIcon from "@mui/icons-material/Circle";
import { fetchNews } from "../../features/news/newsAPI";
import { fetchJobs, incrementJobView } from "../../features/jobs/jobsAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSearchHistory,
  updateSearchObject,
  updateUserSearchHistory,
} from "../../features/auth/authSlice";
import { getLocalStorage } from "../../helpers/authHelper";
import { Link, useNavigate } from "react-router-dom";
import { DateHelper } from "../../helpers/dateHelper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toDateHelper } from "../../helpers/toDateHelper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SideInfoBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [barJobs, setBarJobs] = useState([]);
  const [barNews, setBarNews] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const newsResponse = await fetchNews({ page: 1, size: 3 });
      const jobsResponse = await fetchJobs({
        page: 1,
        size: 3,
        sort_by: "job_views",
        sort: "DESC",
      });
      setBarJobs(jobsResponse.data);
      setBarNews(newsResponse.data);
    }
    const userSearchHistory = getLocalStorage("k_s_h");
    if (userSearchHistory !== undefined) {
      dispatch(updateUserSearchHistory(JSON.parse(userSearchHistory)));
    }
    fetchData();
  }, []);
  const DateHandler = (date) => {
    return DateHelper(date);
  };
  const toDateHandler = (date) => {
    return toDateHelper(date);
  };
  const handleClick = async (id) => {
    await incrementJobView(id);
  };
  const handleSearchObjectChange = async (searchObject) => {
    dispatch(updateSearchObject(searchObject));
    navigate("/dashboard/search");
  };
  const handleSearchObjectWhatChange = async (what) => {
    if (what !== "" || what !== null) {
      dispatch(updateSearchObject({ what, where: "" }));
    }
  };
  const handleSearchObjectWhereChange = async (where) => {
    if (where !== "" || where !== null) {
      dispatch(updateSearchObject({ what: "", where }));
    }
  };
  const userSearchHistory = useSelector(getUserSearchHistory);
  return (
    <div className="side-info-bar-container">
      <div
        className={
          barNews.length === 0
            ? "latest-news-container-display-none"
            : "latest-news-container"
        }
      >
        <div className="latest-news-header-container">
          <div className="latest-news-icon-container">
            <CircleIcon fontSize="small" />
          </div>
          <h4 className="latest-news-header">Son Haberler</h4>
        </div>
        <ul className="latest-news-list">
          {barNews.map((news) => {
            return (
              <a href={`/dashboard/news/${news._id}`}>
                <li className="latest-news-item" key={news._id}>
                  <div className="latest-news-item-publisher-container">
                    <a
                      target="_blank"
                      rel="noreferer"
                      href={
                        news.news_publisher
                          ? news.news_publisher.publisher_redirect_link
                          : ""
                      }
                    >
                      <div className="latest-news-item-publisher-image-container">
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
                      <div className="latest-news-item-publisher-name-container">
                        <h2 className="latest-news-item-publisher-name">
                          {news.news_publisher
                            ? news.news_publisher.publisher_name
                            : ""}
                        </h2>
                      </div>
                    </a>
                  </div>
                  <h4 className="latest-news-item-header">{news.news_title}</h4>
                  <div className="latest-news-item-info">
                    <h6 className="latest-news-item-date">
                      {toDateHandler(news.news_date)}
                    </h6>
                    {/* <div className="latest-news-item-icon-container">
                      <CircleIcon fontSize="small" />
                    </div>
                    <h6 className="latest-news-item-date">
                      {`${news.news_views} görüntülenme`}
                    </h6> */}
                  </div>
                </li>
              </a>
            );
          })}
        </ul>
        <div className="latest-news-see-all-container">
          <a href="/dashboard/news">
            <h5 className="see-all">Tümünü gör</h5>
          </a>
        </div>
      </div>
      <div className="latest-jobs-container">
        <div className="latest-jobs-header-container">
          <div className="latest-jobs-icon-container">
            <CircleIcon fontSize="small" />
          </div>
          <h4 className="latest-jobs-header">En Çok Görüntülenen İlanlar</h4>
        </div>
        <ul className="latest-jobs-list">
          {barJobs.map((job) => {
            return (
              <li className="latest-jobs-item" key={job._id}>
                <div className="latest-jobs-item-company-container">
                  <a
                    href={`/dashboard/companies/${
                      job ? (job.job_company ? job.job_company._id : "") : ""
                    }`}
                  >
                    <div className="latest-jobs-item-company-image-container">
                      <LazyLoadImage
                        effect="opacity"
                        src={
                          job.job_company.logo_image_url === ""
                            ? process.env.PUBLIC_URL + "/no-image.png"
                            : job.job_company.logo_image_url
                        }
                        alt=""
                      />
                    </div>
                  </a>
                  <a href={`/dashboard/companies/${job.job_company._id}`}>
                    <div className="latest-jobs-item-company-header-container">
                      <h5 className="latest-jobs-item-company-header">
                        {job.job_company.name}
                      </h5>
                      <div
                        className={
                          job.job_company.is_approved
                            ? "latest-jobs-item-company-approve-container-active"
                            : "latest-jobs-item-company-approve-container"
                        }
                      >
                        <CheckCircleIcon fontSize="small" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="latest-jobs-item-job-container">
                  <div className="latest-jobs-item-header-container">
                    <h4 className="latest-jobs-item-header">{job.job_title}</h4>
                    <a
                      href={job.job_link}
                      // onClick={() => handleClick(job._id)}
                      rel="noreferrer"
                      target="_blank"
                      onClick={() => handleClick(job._id)}
                    >
                      <div className="latest-jobs-item-job-link-container">
                        <h5 className="latest-jobs-item-job-link-header">
                          Başvur
                        </h5>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {/* <div className="latest-jobs-see-all-container">
          <h5 className="see-all">Tümünü gör</h5>
        </div> */}
      </div>
      {/* {userSearchHistory ? (
        <div className="latest-searches-container">
          <div className="latest-searches-header-container">
            <div className="latest-searches-icon-container">
              <CircleIcon fontSize="small" />
            </div>
            <h4 className="latest-searches-header">Son Arananlar</h4>
          </div>
          <ul className="latest-searches-list">
            {userSearchHistory.map((item) => {
              return (
                <li className="latest-searches-item" key={item["id"]}>
                  <div className="latest-searches-item-header-container">
                    <h5
                      className="latest-searches-item-what-header"
                      onClick={() => handleSearchObjectWhatChange(item["what"])}
                    >
                      {item["what"] === ""
                        ? "-----"
                        : item["what"] === null
                        ? "-----"
                        : item["what"]}
                    </h5>
                    <div className="latest-searches-item-icon-container">
                      <CircleIcon fontSize="small" />
                    </div>
                    <h5
                      className="latest-searches-item-where-header"
                      onClick={() =>
                        handleSearchObjectWhereChange(item["where"])
                      }
                    >
                      {item["where"] === ""
                        ? "-----"
                        : item["where"] === null
                        ? "-----"
                        : item["where"]}
                    </h5>
                  </div>
                  <div className="latest-searches-item-link-container">
                    <h5
                      className="latest-searches-item-header-search-link"
                      onClick={() =>
                        handleSearchObjectChange({
                          what: item["what"],
                          where: item["where"],
                        })
                      }
                    >
                      Ara
                    </h5>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div></div>
      )} */}
      <div className="side-info-bar-footer-container">
        <ul className="footer-list">
          <Link to="/about">
            <li className="footer-item">
              <h6 className="footer-item-header">Hakkımızda</h6>
            </li>
          </Link>
          <Link to="/contact">
            <li className="footer-item">
              <h6 className="footer-item-header">İletişim</h6>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideInfoBar;
