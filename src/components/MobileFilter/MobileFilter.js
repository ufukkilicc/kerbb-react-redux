import React, { useEffect, useRef, useState } from "react";
import "./MobileFilter.scss";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { updateMobileDialog } from "../../features/dialogs/dialogsSlice";
import {
  addJobs,
  getJobSearchObject,
  updateElementsLoading,
  updateJobsCount,
  updateJobSearchObject,
} from "../../features/jobs/jobsSlice";
import { fetchJobs } from "../../features/jobs/jobsAPI";
import { updateScrolledPage } from "../../features/scrolls/scrollsSlice";

const MobileFilter = () => {
  const [dateFilter, setDateFilter] = useState("whole");
  const [orderFilter, setOrderFilter] = useState("DESC");
  const [orderByFilter, setOrderByFilter] = useState("date");

  const dispatch = useDispatch();

  useEffect(() => {
    setOrderByFilter(jobSearchObject.sort_by);
    setOrderFilter(jobSearchObject.sort);
    setDateFilter(jobSearchObject.date);
  }, []);

  const handleDateChange = (e) => {
    const dateFilterValue = e.target.value;
    setDateFilter(dateFilterValue);
  };
  const handleOrderByChange = (e) => {
    const orderByFilterValue = e.target.value;
    setOrderByFilter(orderByFilterValue);
  };
  const handleOrderChange = (e) => {
    const orderFilterValue = e.target.value;
    setOrderFilter(orderFilterValue);
  };
  const handleMobileDialogClose = () => {
    dispatch(updateMobileDialog(false));
  };
  const handleSubmit = async () => {
    const newJobSearchObject = {
      page: 1,
      size: 20,
      sort_by: orderByFilter,
      sort: orderFilter,
      date: dateFilter,
      what: jobSearchObject.what,
      where: jobSearchObject.where,
    };
    dispatch(updateScrolledPage(window.location.pathname));
    dispatch(updateJobSearchObject(newJobSearchObject));
    dispatch(updateElementsLoading(true));
    const jobsResponse = await fetchJobs(newJobSearchObject);
    const jobsCountResponse = await fetchJobs({
      what: jobSearchObject.what,
      date: dateFilter,
      document_count: true,
    });
    dispatch(updateJobsCount(jobsCountResponse.data));
    dispatch(addJobs(jobsResponse.data));
    dispatch(updateElementsLoading(false));
    handleMobileDialogClose();
  };
  const jobSearchObject = useSelector(getJobSearchObject);
  return (
    <div className="mobile-filter">
      <div className="date-filter-container">
        <h3 className="date-filter-header">Tarih</h3>
        <form className="date-filter-list" onChange={handleDateChange}>
          <li className="date-filter-item">
            <div className="date-filter-item-input-container">
              <input
                type="checkbox"
                id="whole"
                name="whole"
                value="whole"
                checked={dateFilter === "whole"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="whole">Tümü</label>
          </li>
          <li className="date-filter-item">
            <div className="date-filter-item-input-container">
              <input
                type="checkbox"
                id="three-hours"
                name="three-hours"
                value="three-hours"
                checked={dateFilter === "three-hours"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="three-hours">3 saat</label>
          </li>
          <li className="date-filter-item">
            <div className="date-filter-item-input-container">
              <input
                type="checkbox"
                id="twenty-four-hours"
                name="twenty-four-hours"
                value="twenty-four-hours"
                checked={dateFilter === "twenty-four-hours"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="twenty-four-hours">24 saat</label>
          </li>
          <li className="date-filter-item">
            <div className="date-filter-item-input-container">
              <input
                type="checkbox"
                id="seven-days"
                name="seven-days"
                value="seven-days"
                checked={dateFilter === "seven-days"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="seven-days">7 gün</label>
          </li>
          <li className="date-filter-item">
            <div className="date-filter-item-input-container">
              <input
                type="checkbox"
                id="one-month"
                name="one-month"
                value="one-month"
                checked={dateFilter === "one-month"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="one-month">1 ay</label>
          </li>
        </form>
      </div>
      <div className="order-by-filter-container">
        <h3 className="order-by-filter-header">Sıralama</h3>
        <form className="order-by-filter-list" onChange={handleOrderByChange}>
          <li className="order-by-filter-item">
            <div className="order-by-filter-item-input-container">
              <input
                type="checkbox"
                id="header"
                name="header"
                value="job_title"
                checked={orderByFilter === "job_title"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="header">A-z</label>
          </li>
          <li className="order-by-filter-item">
            <div className="order-by-filter-item-input-container">
              <input
                type="checkbox"
                id="date"
                name="date"
                value="date"
                checked={orderByFilter === "date"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="date">Tarih</label>
          </li>
          <li className="order-by-filter-item">
            <div className="order-by-filter-item-input-container">
              <input
                type="checkbox"
                id="views"
                name="views"
                value="job_views"
                checked={orderByFilter === "job_views"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="views">Görüntülenme</label>
          </li>
        </form>
      </div>
      <div className="order-filter-container">
        <h3 className="order-filter-header">Sırala</h3>
        <form className="order-filter-list" onChange={handleOrderChange}>
          <li className="order-filter-item">
            <div className="order-filter-item-input-container">
              <input
                type="checkbox"
                id="asc"
                name="asc"
                value="ASC"
                checked={orderFilter === "ASC"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="asc">Artan</label>
          </li>
          <li className="order-filter-item">
            <div className="order-filter-item-input-container">
              <input
                type="checkbox"
                id="desc"
                name="desc"
                value="DESC"
                checked={orderFilter === "DESC"}
              />
              <div className="check-icon">
                <CheckIcon fontSize="small" />
              </div>
            </div>
            <label for="desc">Azalan</label>
          </li>
        </form>
      </div>
      <div
        // className={
        //   buttonsSticky
        //     ? "apply-cancel-buttons-container-active"
        //     : "apply-cancel-buttons-container"
        // }
        className="apply-cancel-buttons-container"
      >
        <input
          type="button"
          className="apply-button"
          value="Uygula"
          onClick={handleSubmit}
        />
        <input
          type="button"
          className="cancel-button"
          value="İptal"
          onClick={handleMobileDialogClose}
        />
      </div>
    </div>
  );
};

export default MobileFilter;
