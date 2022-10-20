import React from "react";
import "./Company.scss";
import CompanyJob from "../CompanyJob/CompanyJob";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Company = ({ company }) => {
  return (
    <div className="company">
      <div className="company-info-container">
        <div className="company-image-and-title-container">
          <a href={`/dashboard/companies/${company.name}`}>
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
          <a href={`/dashboard/companies/${company.name}`}>
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
          <a href={`/dashboard/companies/${company.name}`}>
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
