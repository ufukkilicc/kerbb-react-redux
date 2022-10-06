import React from "react";
import "./SkeletonNews.scss";
import Skeleton from "@mui/material/Skeleton";

const SkeletonNews = () => {
  return (
    <div className="skeleton-news">
      <div className="skeleton-news-info-header-container">
        <div className="skeleton-news-info-header-first">
          <Skeleton
            animation="wave"
            variant="text"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
        <div className="skeleton-news-info-header-second">
          <Skeleton
            animation="wave"
            variant="text"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
      </div>
      <div className="skeleton-news-info-content-container">
        <Skeleton
            animation="wave"
          variant="rectangular"
          height={"100%"}
          width={"100%"}
          sx={{ borderRadius: "5px" }}
        />
      </div>
      <div className="skeleton-news-info-settings-container">
        <Skeleton
            animation="wave"
          variant="text"
          height={"100%"}
          width={"100%"}
          sx={{ borderRadius: "5px" }}
        />
      </div>
    </div>
  );
};

export default SkeletonNews;
