import React, { useEffect, useState } from "react";
import "./Job.scss";
import { incrementJobView } from "../../features/jobs/jobsAPI";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DateHelper } from "../../helpers/dateHelper";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IosShareIcon from "@mui/icons-material/IosShare";
import {
  getJobSettingsDropdown,
  updateJobSettingsDropdown,
} from "../../features/jobs/jobsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  updateShareDrawerJob,
  updateShareJobMobileOpen,
  updateShareJobOpen,
} from "../../features/shareDrawerJob/shareDrawerJobSlice";
import { getCompanyDetailThemeColor } from "../../features/companyDetail/companyDetailSlice";

const Job = ({ job }) => {
  const dispatch = useDispatch();
  const handleClick = async (id) => {
    console.log(id);
    await incrementJobView(id);
  };
  const DateHandler = (date) => {
    return DateHelper(date);
  };
  const handleDropdown = () => {
    if (jobSettingsDropdown) {
      dispatch(updateJobSettingsDropdown(""));
    } else {
      dispatch(updateJobSettingsDropdown(job._id));
    }
  };
  const handleShareDrawerJobOpen = () => {
    const width = window.innerWidth;
    dispatch(updateShareDrawerJob(job));
    if (width <= 1120) {
      dispatch(updateShareJobMobileOpen(true));
    } else {
      dispatch(updateShareJobOpen(true));
    }
    dispatch(updateJobSettingsDropdown(""));
  };
  useEffect(() => {
    console.log(
      window.location.pathname.includes("/companies/") &&
        companyDetailThemeColor
    );
  }, []);
  const jobSettingsDropdown = useSelector(getJobSettingsDropdown);
  const companyDetailThemeColor = useSelector(getCompanyDetailThemeColor);
  return (
    // <a
    //   href={job.job_link}
    //   onClick={() => handleClick(job._id)}
    //   rel="noreferrer"
    //   target="_blank"
    // >
    <div className="job">
      {/* <div className="job-company-container">
        <h2 className="job-company">Getir</h2>
      </div> */}
      <div className="job-info-container">
        <div className="job-company-and-image-container">
          <a
            href={`/dashboard/companies/${
              job
                ? job.job_company
                  ? job.job_company.name
                  : ""
                : ""
            }`}
          >
            <div className="company-image-container">
              <img
                src={`${
                  job
                    ? job.job_company
                      ? job.job_company.logo_image_url === ""
                        ? process.env.PUBLIC_URL + "/no-image.png"
                        : job.job_company.logo_image_url
                      : process.env.PUBLIC_URL + "/no-image.png"
                    : process.env.PUBLIC_URL + "/no-image.png"
                }`}
                alt=""
                className="job_image"
              />
            </div>
          </a>
          <a
            href={`/dashboard/companies/${
              job
                ? job.job_company
                  ? job.job_company.name
                  : ""
                : ""
            }`}
          >
            <div className="job-company-container">
              <h2 className="job-company">{job.company}</h2>
              <div
                className={
                  job
                    ? job.job_company
                      ? job.job_company.is_approved
                        ? "job-company-approve-icon-container-active"
                        : "job-company-approve-icon-container"
                      : ""
                    : ""
                }
              >
                <CheckCircleIcon fontSize="small" />
              </div>
            </div>
          </a>
        </div>

        <div className="job-title-container">
          <a
            href={job.job_link}
            onClick={() => handleClick(job._id)}
            rel="noreferrer"
            target="_blank"
          >
            <h4 className="job-title">{job.job_title}</h4>
          </a>
        </div>
        <div className="job-location-date-container">
          <div className="job-location-container">
            <div className="job-location-icon">
              <CircleIcon fontSize="medium" />
            </div>
            <h5 className="job-location">{job.job_location}</h5>
          </div>
          <div className="job-date-container">
            <div className="job-date-icon">
              <CircleIcon fontSize="medium" />
            </div>
            <h5 className="job-date">{DateHandler(job.date)}</h5>
          </div>
        </div>
      </div>
      <div className="job-button-and-settings-container">
        {/* <div className="job-settings-container">
            <h5 className="job-settings">{`#${job.tracking_id}`}</h5>
          </div> */}
        <div
          className="job-settings-container"
          onClick={() => handleDropdown(job._id)}
        >
          <div className="job-settings">
            <MoreHorizIcon fontSize="medium" />
          </div>
          <div
            className={
              jobSettingsDropdown === job._id
                ? "job-settings-dropdown-active"
                : "job-settings-dropdown"
            }
          >
            <ul className="job-settings-dropdown-list">
              <li
                className="job-settings-dropdown-item"
                onClick={handleShareDrawerJobOpen}
              >
                <div className="job-settings-dropdown-item-icon-container">
                  <IosShareIcon fontSize="small" />
                </div>
                <div className="job-settings-dropdown-item-header-container">
                  <h6 className="job-settings-dropdown-item-header">Paylaş</h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <a
          href={job.job_link}
          onClick={() => handleClick(job._id)}
          rel="noreferrer"
          target="_blank"
        >
          <button
            className="job-button"
            style={{
              backgroundColor:
                window.location.pathname.includes("/companies/") &&
                companyDetailThemeColor !== ""
                  ? companyDetailThemeColor
                  : "#4e21e7",
            }}
          >
            Başvur
          </button>
        </a>
      </div>
      <div
        className="signutare"
        style={{
          borderRightColor:
            window.location.pathname.includes("/companies/") &&
            companyDetailThemeColor !== ""
              ? companyDetailThemeColor
              : "#4e21e7",
          borderTopColor:
            window.location.pathname.includes("/companies/") &&
            companyDetailThemeColor !== ""
              ? companyDetailThemeColor
              : "#4e21e7",
        }}
      ></div>
    </div>
    // </a>
  );
};

export default Job;
