import React from "react";
import "./Company.scss";
import CompanyJob from "../CompanyJob/CompanyJob";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanySettingsDropdown,
  updateCompanySettingsDropdown,
} from "../../features/companies/companiesSlice";
import {
  updateShareDrawerCompany,
  updateShareMobileOpen,
  updateShareOpen,
} from "../../features/shareDrawer/shareDrawerSlice";
import Img from "react-cloudinary-lazy-image";

const Company = ({ company }) => {
  const dispatch = useDispatch();
  const handleDropdown = () => {
    if (companySettingsDropdown) {
      dispatch(updateCompanySettingsDropdown(""));
    } else {
      dispatch(updateCompanySettingsDropdown(company._id));
    }
  };
  const handleShareDrawerCompanyOpen = () => {
    const width = window.innerWidth;
    dispatch(updateShareDrawerCompany(company));
    if (width <= 1120) {
      dispatch(updateShareMobileOpen(true));
    } else {
      dispatch(updateShareOpen(true));
    }
    dispatch(updateCompanySettingsDropdown(""));
  };
  const companySettingsDropdown = useSelector(getCompanySettingsDropdown);
  return (
    <div className="company">
      <div className="company-info-container">
        {company && company.cover_image_url !== "" ? (
          <img
            src={company.cover_image_url}
            className="company-cover-image"
            alt=""
          />
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/no-image.png"}
            className="company-cover-image"
            alt=""
          />
        )}

        <div
          className="company-settings-container"
          onClick={() => handleDropdown(company._id)}
        >
          <div className="job-settings">
            <MoreHorizIcon fontSize="medium" />
          </div>
          <div
            className={
              companySettingsDropdown === company._id
                ? "company-settings-dropdown-active"
                : "company-settings-dropdown"
            }
          >
            <ul className="company-settings-dropdown-list">
              <li
                className="company-settings-dropdown-item"
                onClick={handleShareDrawerCompanyOpen}
              >
                <div className="company-settings-dropdown-item-icon-container">
                  <IosShareIcon fontSize="small" />
                </div>
                <div className="company-settings-dropdown-item-header-container">
                  <h6 className="company-settings-dropdown-item-header">
                    Paylaş
                  </h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="company-info-inner-container">
          <a href={`/dashboard/companies/${company.name}`}>
            <div className="company-title-container">
              <h2 className="company-title">
                {company.name}
                <sup className="company-job-count">
                  +{company.job_count - 2}
                </sup>
              </h2>
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
      </div>
      <div className="company-jobs-container">
        {company.highlighted_jobs.map((job) => {
          return <CompanyJob key={job._id} companyJob={job} />;
        })}
      </div>
      {/* <div className="company-info-container">
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
      </div> */}
      <div className="signutare"></div>
    </div>
  );
};

export default Company;
