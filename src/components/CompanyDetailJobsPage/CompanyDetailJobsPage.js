import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addCompanyDetailJobs,
  getAllCompanyDetailJobs,
  getCompanyDetailElementsLoading,
  getCompanyDetailJobSearchObject,
  includeCompanyDetailJobs,
  updateCompanyDetailElementsLoading,
  updateCompanyDetailJobSearchObject,
} from "../../features/companyDetail/companyDetailSlice";
import { fetchJobs } from "../../features/jobs/jobsAPI";
import Job from "../Job/Job";
import SkeletonJob from "../SkeletonJob/SkeletonJob";
import "./CompanyDetailJobsPage.scss";

const CompanyDetailJobsPage = () => {
  const dispatch = useDispatch();
  const { title } = useParams();
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchData() {
      dispatch(updateCompanyDetailElementsLoading(true));
      let newCompanyDetailJobSearchObject = {
        page: companyDetailJobsSearchObject.page,
        size: companyDetailJobsSearchObject.size,
        sort_by: companyDetailJobsSearchObject.sort_by,
        sort: companyDetailJobsSearchObject.sort,
        date: companyDetailJobsSearchObject.date,
        what: companyDetailJobsSearchObject.what,
        where: companyDetailJobsSearchObject.where,
        company: title,
      };
      const jobsResponse = await fetchJobs(newCompanyDetailJobSearchObject);
      dispatch(addCompanyDetailJobs(jobsResponse.data));
      dispatch(
        updateCompanyDetailJobSearchObject(newCompanyDetailJobSearchObject)
      );
      dispatch(updateCompanyDetailElementsLoading(false));
    }
    fetchData();
  }, []);
  let load = async () => {
    if (companyDetailJobs.length % 10 === 0 && hasMore) {
      let newCompanyDetailJobSearchObject = {
        page: companyDetailJobsSearchObject.page + 1,
        size: companyDetailJobsSearchObject.size,
        sort_by: companyDetailJobsSearchObject.sort_by,
        sort: companyDetailJobsSearchObject.sort,
        date: companyDetailJobsSearchObject.date,
        what: companyDetailJobsSearchObject.what,
        where: companyDetailJobsSearchObject.where,
        company: title,
      };
      dispatch(
        updateCompanyDetailJobSearchObject(newCompanyDetailJobSearchObject)
      );
      setLoader(true);
      const jobsResponse = await fetchJobs(newCompanyDetailJobSearchObject);
      console.log(jobsResponse);
      if (jobsResponse.data.length === 0) {
        setLoader(false);
        setHasMore(false);
      }
      setLoader(false);
      dispatch(includeCompanyDetailJobs(jobsResponse.data));
    } else {
      setLoader(false);
      setHasMore(false);
    }
  };
  const loaderr = useRef(load);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loaderr.current();
        }
      },
      { threshold: 0.2 }
    )
  );
  const [element, setElement] = useState(null);

  useEffect(() => {
    loaderr.current = load;
  }, [load]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);
  const companyDetailJobs = useSelector(getAllCompanyDetailJobs);
  const companyDetailElementsLoading = useSelector(
    getCompanyDetailElementsLoading
  );
  const companyDetailJobsSearchObject = useSelector(
    getCompanyDetailJobSearchObject
  );
  return (
    <div className="company-detail-jobs-page-container">
      {companyDetailJobs.length > 0 ? (
        <div>
          {companyDetailElementsLoading ? (
            <div className="jobs-skeleton-container">
              <SkeletonJob />
              <SkeletonJob />
              <SkeletonJob />
              <SkeletonJob />
              <SkeletonJob />
              <SkeletonJob />
              <SkeletonJob />
              <SkeletonJob />
              <SkeletonJob />
              <SkeletonJob />
            </div>
          ) : (
            <div className="jobs-inner-container">
              {companyDetailJobs.map((job) => {
                return <Job key={job._id} job={job} />;
              })}
            </div>
          )}
          <div className="loader-container" ref={setElement}>
            {hasMore ? (
              <div className={loader ? "loader-active" : "loader"}>
                <CircularProgress
                  size="30px"
                  sx={{ color: "#4e21e7", opacity: 0.8 }}
                />
              </div>
            ) : (
              <div className="seen-all-container">
                {companyDetailJobs.length > 20 ? (
                  <h5 className="seen-all">Tümünü gördün</h5>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="jobs-none-container">
          <h1 className="header">Sonuç bulunamadı.</h1>
        </div>
      )}
    </div>
  );
};

export default CompanyDetailJobsPage;
