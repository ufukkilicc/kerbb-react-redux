import React from "react";
import "./SkeletonNewsForPage.scss";
import Skeleton from "@mui/material/Skeleton";

const SkeletonNewsForPage = () => {
  return (
    <div className="skeleton-news-for-page">
      <div className="skeleton-news-for-page-info-container">
        <div className="skeleton-news-for-page-info-header-container">
          <div className="skeleton-news-for-page-info-header-first">
            <Skeleton
              animation="wave"
              variant="text"
              height={"100%"}
              width={"100%"}
              sx={{ borderRadius: "5px" }}
            />
          </div>
          <div className="skeleton-news-for-page-info-header-second">
            <Skeleton
              animation="wave"
              variant="text"
              height={"100%"}
              width={"100%"}
              sx={{ borderRadius: "5px" }}
            />
          </div>
        </div>
        <div className="skeleton-news-for-page-info-content-container">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
        <div className="skeleton-news-for-page-info-settings-container">
          <Skeleton
            animation="wave"
            variant="text"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
      </div>
      <div className="skeleton-news-for-page-image-container">
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={"100%"}
          width={"100%"}
          sx={{ borderRadius: "5px" }}
        />
      </div>
    </div>
  );
};

export default SkeletonNewsForPage;
