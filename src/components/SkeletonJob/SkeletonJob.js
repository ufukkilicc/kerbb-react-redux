import React from "react";
import "./SkeletonJob.scss";
import Skeleton from "@mui/material/Skeleton";

const SkeletonJob = () => {
  return (
    <div className="skeleton-job">
      <div className="skeleton-header-image-container">
        <div className="skeleton-image-container">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
        <div className="skeleton-header-container">
          <Skeleton
            animation="wave"
            variant="text"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
      </div>
      <div className="skeleton-job-title-container">
        <div className="skeleton-job-title">
          <Skeleton
            animation="wave"
            variant="text"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
      </div>
      <div className="skeleton-info-button-container">
        <div className="skeleton-info-container">
          <Skeleton
            animation="wave"
            variant="text"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
        <div className="skeleton-button-container">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonJob;
