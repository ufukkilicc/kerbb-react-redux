import React from "react";
import "./SkeletonCompany.scss";
import Skeleton from "@mui/material/Skeleton";

const SkeletonCompany = () => {
  return (
    <div className="skeleton-company">
      <div className="skeleton-company-header-image-container">
        <div className="skeleton-company-image-container">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
        <div className="skeleton-company-header-container">
          <Skeleton
            animation="wave"
            variant="text"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
      </div>
      <div className="skeleton-company-inner-container">
        <div className="skeleton-company-job">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={"100%"}
            width={"100%"}
            sx={{ borderRadius: "5px" }}
          />
        </div>
        <div className="skeleton-company-job">
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

export default SkeletonCompany;
