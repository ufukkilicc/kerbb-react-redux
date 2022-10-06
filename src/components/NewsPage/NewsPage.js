import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../features/news/newsAPI";
import {
  addNews,
  getAllNews,
  includeNews,
} from "../../features/news/newsSlice";
import News from "./News/News";
import "./NewsPage.scss";
import { Helmet } from "react-helmet";
import SkeletonNewsForPage from "../SkeletonNewsForPage/SkeletonNewsForPage";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getScrolledPage,
  updateScrolledPage,
} from "../../features/scrolls/scrollsSlice";

const NewsPage = () => {
  // const [news, setNews] = useState([]);
  const dispatch = useDispatch();
  const newsListRef = useRef();
  const loaderRef = useRef();
  const [pageCount, setPageCount] = useState(1);
  const [elementsLoading, setElementsLoading] = useState(false);
  const [naviSticky, setNaviSticky] = useState(false);
  const [loader, setLoader] = useState(false);
  const [scrolltop, setScrolltop] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setElementsLoading(true);
      const newsResponse = await fetchNews({ page: 1, size: 10 });
      setElementsLoading(false);
      dispatch(addNews(newsResponse.data));
    }
    fetchData();
  }, []);
  let load = async () => {
    if (news.length % 10 === 0 && hasMore) {
      setPageCount(pageCount + 1);
      setLoader(true);
      const newsReResponse = await fetchNews({
        page: pageCount + 1,
        size: 10,
      });
      if (newsReResponse.data.length === 0) {
        setLoader(false);
        setHasMore(false);
        console.log("hey");
      }
      setLoader(false);
      dispatch(includeNews(newsReResponse.data));
    } else {
      console.log("hey");
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
  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      setNaviSticky(true);
    } else {
      setNaviSticky(false);
    }
  };
  const scrollToTop = () => {
    newsListRef.current.scrollTo(0, 0);
  };
  const news = useSelector(getAllNews);
  const scrolledPage = useSelector(getScrolledPage);

  useEffect(() => {
    if (scrolledPage === window.location.pathname) {
      scrollToTop();
      dispatch(updateScrolledPage(""));
    }
  }, [scrolledPage]);

  return (
    <div className="news-page" ref={newsListRef} onWheel={handleWheel}>
      <Helmet>
        <title>Kurumsal Şirket Haberleri</title>
      </Helmet>
      <div className={naviSticky ? "news-page-navi-active" : "news-page-navi"}>
        <div className="news-page-header-container">
          <h1 className="news-page-header">Kurumsal İş Haberleri</h1>
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
      {elementsLoading ? (
        <div className="news-page-skeleton-inner">
          <SkeletonNewsForPage />
          <SkeletonNewsForPage />
          <SkeletonNewsForPage />
          <SkeletonNewsForPage />
          <SkeletonNewsForPage />
        </div>
      ) : (
        <div className="news-page-inner">
          {news.map((newsObject) => {
            return <News news={newsObject} key={newsObject._id} />;
          })}
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
                {news.length > 10 ? (
                  <h5 className="seen-all">Tümünü gördün</h5>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
