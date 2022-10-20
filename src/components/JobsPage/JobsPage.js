import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/jobs/jobsAPI";
import {
  addJobs,
  getAllJobs,
  getElementsLoading,
  getJobsCount,
  getJobSearchObject,
  includeJobs,
  updateElementsLoading,
  updateJobsCount,
  updateJobSearchObject,
} from "../../features/jobs/jobsSlice";
import Job from "../Job/Job";
import SkeletonJob from "../SkeletonJob/SkeletonJob";
import "./JobsPage.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Filter from "../Filter/Filter";
import MobileFilter from "../MobileFilter/MobileFilter";
import Drawer from "@mui/material/Drawer";
import Dialog from "@mui/material/Dialog";
import {
  getDialog,
  getMobileDialog,
  updateDialog,
  updateMobileDialog,
} from "../../features/dialogs/dialogsSlice";
import CountUp from "react-countup";

const JobsPage = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newJobSearchObject = {
      page: 1,
      size: jobSearchObject.size,
      sort_by: jobSearchObject.sort_by,
      sort: jobSearchObject.sort,
      date: jobSearchObject.date,
      what: searchInput,
      where: jobSearchObject.where,
    };
    dispatch(updateElementsLoading(true));
    const jobsCountResponse = await fetchJobs({
      what: searchInput,
      date: jobSearchObject.date,
      document_count: true,
    });
    const jobsResponse = await fetchJobs(newJobSearchObject);
    dispatch(updateJobsCount(jobsCountResponse.data));
    dispatch(addJobs(jobsResponse.data));
    dispatch(updateJobSearchObject(newJobSearchObject));
    dispatch(updateElementsLoading(false));
  };
  const handleDialogClose = () => {
    dispatch(updateDialog(false));
  };
  const handleMobileDialogClose = () => {
    dispatch(updateMobileDialog(false));
  };
  useEffect(() => {
    async function fetchData() {
      dispatch(updateElementsLoading(true));
      const jobsResponse = await fetchJobs(jobSearchObject);
      const jobsCountResponse = await fetchJobs({
        what: "",
        date: jobSearchObject.date,
        document_count: true,
      });
      dispatch(updateJobsCount(jobsCountResponse.data));
      dispatch(addJobs(jobsResponse.data));
      dispatch(updateElementsLoading(false));
    }
    fetchData();
  }, []);
  let load = async () => {
    if (jobs.length % 10 === 0 && hasMore) {
      let newJobSearchObject = {
        page: jobSearchObject.page + 1,
        size: jobSearchObject.size,
        sort_by: jobSearchObject.sort_by,
        sort: jobSearchObject.sort,
        date: jobSearchObject.date,
        what: jobSearchObject.what,
        where: jobSearchObject.where,
      };
      dispatch(updateJobSearchObject(newJobSearchObject));
      setLoader(true);
      const jobsResponse = await fetchJobs(newJobSearchObject);
      if (jobsResponse.data.length === 0) {
        setLoader(false);
        setHasMore(false);
      }
      setLoader(false);
      dispatch(includeJobs(jobsResponse.data));
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
  const onChangeSearchInput = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };
  const jobSearchObject = useSelector(getJobSearchObject);
  const jobs = useSelector(getAllJobs);
  const elementsLoading = useSelector(getElementsLoading);
  const dialog = useSelector(getDialog);
  const mobileDialog = useSelector(getMobileDialog);
  const jobsCount = useSelector(getJobsCount);
  return (
    <div className="jobs-page">
      <div className="jobs-page-navi-container">
        <div className="search-result-count-container">
          <h4 className="search-result-count">
            <CountUp end={jobsCount} duration={0.5} />
          </h4>
          <h4 className="search-result-count-header">sonuç bulundu</h4>
        </div>
      </div>
      <div className="jobs-container">
        {elementsLoading ? (
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
            {jobs.map((job) => {
              return <Job key={job._id} job={job} />;
            })}
          </div>
        )}
      </div>
      {jobs.length > 0 ? (
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
              {jobs.length > 20 ? (
                <h5 className="seen-all">Tümünü gördün</h5>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div> yok</div>
      )}
      <Dialog open={dialog} onClose={handleDialogClose}>
        <Filter />
      </Dialog>
      <Drawer
        open={mobileDialog}
        anchor="bottom"
        onClose={handleMobileDialogClose}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        <MobileFilter />
      </Drawer>
    </div>
  );
};

export default JobsPage;
