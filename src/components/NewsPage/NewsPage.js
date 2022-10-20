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
import CircularProgress from "@mui/material/CircularProgress";
import {
  getScrolledPage,
  updateScrolledPage,
} from "../../features/scrolls/scrollsSlice";
import TopMobileNavi from "../TopMobileNavi/TopMobileNavi";
import BottomMobileNavi from "../BottomMobileNavi/BottomMobileNavi";

const NewsPage = () => {
  const dispatch = useDispatch();
  const newsListRef = useRef();
  const [pageCount, setPageCount] = useState(1);
  const [elementsLoading, setElementsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [topNaviHeader, setTopNaviHeader] = useState(null);
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
      }
      setLoader(false);
      dispatch(includeNews(newsReResponse.data));
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

  const onScroll = () => {
    const { scrollTop } = newsListRef.current;
    if (scrollTop > 50 && topNaviHeader === null) {
      setTopNaviHeader("Şirket Haberleri");
    } else if (scrollTop < 50 && topNaviHeader !== null) {
      setTopNaviHeader(null);
    }
  };

  return (
    <div className="news-page" ref={newsListRef} onScroll={onScroll}>
      <Helmet>
        <title>Şirket Haberleri | Kerbb</title>
        <meta property="og:title" content={`Şirket Haberleri | Kerbb`} />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/kerbb/image/upload/v1664460395/local/website_photos/WhatsApp_Image_2022-09-29_at_00.17.34_mvym3a.jpg?w=800`}
        />
        <meta
          name="description"
          content={`Yüzlerce kurumsal şirketin iş ilanını ve haberlerini Kerbb ile keşfedin! | Kerbb`}
        />
      </Helmet>
      <div className="top-mobile-navbar-container">
        <TopMobileNavi header={topNaviHeader} path={window.location.pathname} />
      </div>
      <div className="news-page-navi">
        <div className="news-page-header-container">
          <h1 className="news-page-header">Şirket Haberleri</h1>
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
          <div className="bottom-mobile-navbar-container">
            <BottomMobileNavi />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
