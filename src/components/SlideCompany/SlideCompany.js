import React from "react";
import "./SlideCompany.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SlideCompany = ({ company }) => {
  return (
    <div className="slide-company-container">
      <div className="slide-company-image-container">
        <a href={`/dashboard/companies/${company._id}`}>
          <img
            src={
              company.logo_image_url === ""
                ? process.env.PUBLIC_URL + "/no-image.png"
                : company.logo_image_url
            }
            alt=""
          />
        </a>
      </div>
      <div className="slide-company-title-container">
        <h4 className="slide-company-title">{company.name}</h4>
      </div>
      <div
        className={
          company.is_approved
            ? "slide-company-approve-container-active"
            : "slide-company-approve-container"
        }
      >
        <CheckCircleIcon fontSize="medium" />
      </div>
    </div>
  );
};

export default SlideCompany;
