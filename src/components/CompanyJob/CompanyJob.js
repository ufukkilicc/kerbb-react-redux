import React from "react";
import "./CompanyJob.scss";
import CircleIcon from "@mui/icons-material/Circle";
import { DateHelper } from "../../helpers/dateHelper";

const CompanyJobs = ({ companyJob }) => {
  const DateHandler = (date) => {
    return DateHelper(date);
  };
  return (
    <a href={companyJob.job_link} target="_blank">
      <div className="company-job">
        <div className="company-job-title-container">
          <h1 className="company-job-title">{companyJob.job_title}</h1>
        </div>
        <div className="company-job-location-date-container">
          <div className="job-location-container">
            <h5 className="job-location">{companyJob.job_location}</h5>
          </div>
          <div className="job-location-icon">
            <CircleIcon fontSize="medium" />
          </div>
          <div className="job-date-container">
            <h5 className="job-date">{DateHandler(companyJob.date)}</h5>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CompanyJobs;
