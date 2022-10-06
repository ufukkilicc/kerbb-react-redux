import React from "react";
import "./JobFilter.scss";

const JobFilter = () => {
  return (
    <div className="job-filter">
      <div className="job-filters-container">
        <div className="job-category-filter-container">
          <div className="category-filter-header-container">
            <h4 className="category-filter-header">Category</h4>
          </div>
          <ul className="job-category-filter">
            <li className="job-category" draggable={true}>
              Fashion <span>+</span>
            </li>
            <li className="job-category" draggable={true}>
              FEeding <span>+</span>
            </li>
            <li className="job-category" draggable={true}>
              Nursery <span>+</span>
            </li>
            <li className="job-category" draggable={true}>
              Blue <span>+</span>
            </li>
          </ul>
        </div>
        <div className="job-color-filter-container">
          <div className="color-filter-header-container">
            <h4 className="color-filter-header">Color</h4>
          </div>
          <ul className="job-color-filter">
            <li className="job-color" draggable={true}>
              Blue <span>+</span>
            </li>
            <li className="job-color" draggable={true}>
              Red <span>+</span>
            </li>
            <li className="job-color" draggable={true}>
              Purple <span>+</span>
            </li>
            <li className="job-color">
              Pink<span>+</span>
            </li>
          </ul>
        </div>
        <div className="job-size-filter-container">
          <div className="size-filter-header-container">
            <h4 className="size-filter-header">Size</h4>
          </div>
          <ul className="job-size-filter">
            <li className="job-category" draggable={true}>
              Large <span>+</span>
            </li>
            <li className="job-category" draggable={true}>
              Medium <span>+</span>
            </li>
            <li className="job-category" draggable={true}>
              Small <span>+</span>
            </li>
          </ul>
        </div>
      </div>
      <hr className="first-line" />
      <hr className="second-line" />
    </div>
  );
};

export default JobFilter;
