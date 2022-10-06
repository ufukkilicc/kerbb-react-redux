import React from "react";
import "./SkeletonCompanySlide.scss";
import Skeleton from "@mui/material/Skeleton";

const SkeletonCompanySlide = () => {
  return (
    <div className="skeleton-company-slide">
      <Skeleton
            animation="wave"
        variant="rectangular"
        width={"100%"}
        height={"100%"}
        sx={{ borderRadius: "5px" }}
      />
    </div>
  );
};

export default SkeletonCompanySlide;
