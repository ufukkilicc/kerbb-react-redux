import React from "react";
import "./CompanyJob.scss";
import CircleIcon from "@mui/icons-material/Circle";
import { DateHelper } from "../../helpers/dateHelper";

const CompanyJobs = ({ companyJob }) => {
  const DateHandler = (date) => {
    return DateHelper(date);
  };
  return (
    <div className="company-job">
      <div className="company-job-container">
        <a href={companyJob.job_link} rel="noreferrer" target="_blank">
          <div className="company-job-header-and-icon-container">
            <div className="company-job-header-container">
              <h4 className="company-job-header">{companyJob.job_title}</h4>
            </div>
          </div>
          <div className="company-location-and-date-container">
            <div className="company-location-container">
              <div className="company-location-icon-container">
                <CircleIcon fontSize="medium" />
              </div>
              <h5 className="company-location">{companyJob.job_location}</h5>
            </div>
            <div className="company-date-container">
              <div className="company-date-icon-container">
                <CircleIcon fontSize="medium" />
              </div>
              <h5 className="company-date">{DateHandler(companyJob.date)}</h5>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default CompanyJobs;
