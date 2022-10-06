import React from "react";
import "./Company.scss";
import CompanyJob from "../CompanyJob/CompanyJob";
import Zoom from "@mui/material/Zoom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#e8e7ff",
    color: "#4e21e7",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    fontFamily: "'Poppins', sans-serif",
    border: "1px solid #dadde9",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
}));

const Company = ({ company }) => {
  return (
    <div className="company">
      <div className="company-info-container">
        <div className="company-image-and-title-container">
          <a href={`/dashboard/companies/${company._id}`}>
            <div className="company-image-container">
              <img
                src={`${
                  company
                    ? company.logo_image_url === ""
                      ? process.env.PUBLIC_URL + "/no-image.png"
                      : company.logo_image_url
                    : process.env.PUBLIC_URL + "/no-image.png"
                }`}
                alt=""
              />
            </div>
          </a>
          <a href={`/dashboard/companies/${company._id}`}>
            <div className="company-title-container">
              <h2 className="company-title">{company.name}</h2>
              <div
                className={
                  company.is_approved
                    ? "company-title-approve-icon-container-active"
                    : "company-title-approve-icon-container"
                }
              >
                <CheckCircleIcon fontSize="small" />
              </div>
            </div>
          </a>
        </div>
        <div className="company-job-count-container">
          <a href={`/dashboard/companies/${company._id}`}>
            <span className="company-job-count">+{company.job_count - 2}</span>
          </a>
        </div>
      </div>
      <div className="company-highlighted-jobs-container">
        {company.highlighted_jobs.map((job) => {
          return <CompanyJob companyJob={job} key={job._id} />;
        })}
      </div>
      <div className="signutare"></div>
    </div>
  );
};

export default Company;
