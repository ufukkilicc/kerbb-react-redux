import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../features/companies/companiesAPI";
import {
  addCompanies,
  getAllCompanies,
  getCompaniesCount,
  getCompaniesSearchObject,
  getElementsLoadingCompany,
  includeCompanies,
  updateCompaniesCount,
  updateCompaniesSearchObject,
  updateElementsLoadingCompany,
} from "../../features/companies/companiesSlice";
import "./CompaniesPage.scss";
import CountUp from "react-countup";
import SkeletonCompany from "../SkeletonCompany/SkeletonCompany";
import Company from "../Company/Company";
import CircularProgress from "@mui/material/CircularProgress";

const CompaniesPage = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    async function fetchData() {
      dispatch(updateElementsLoadingCompany(true));
      const companiesResponse = await fetchCompanies({
        page: 1,
        size: 10,
        is_active: true,
      });
      // const companiesCountResponse = await fetchCompanies({
      //   what: "",
      //   date: jobSearchObject.date,
      //   document_count: true,
      // });
      // dispatch(updateCompaniesCount(jobsCountResponse.data));
      dispatch(addCompanies(companiesResponse.data));
      dispatch(
        updateCompaniesSearchObject({
          page: 1,
          size: 10,
          is_active: true,
        })
      );
      dispatch(updateElementsLoadingCompany(false));
    }
    fetchData();
  }, []);
  let load = async () => {
    if (companies.length % 10 === 0 && hasMore) {
      let newCompaniesSearchObject = {
        page: companiesSearchObject.page + 1,
        size: companiesSearchObject.size,
        is_active: true,
      };
      dispatch(updateCompaniesSearchObject(newCompaniesSearchObject));
      setLoader(true);
      const companiesResponse = await fetchCompanies(newCompaniesSearchObject);
      if (companiesResponse.data.length === 0) {
        setLoader(false);
        setHasMore(false);
      }
      setLoader(false);
      dispatch(includeCompanies(companiesResponse.data));
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
  const companiesCount = useSelector(getCompaniesCount);
  const companiesSearchObject = useSelector(getCompaniesSearchObject);
  const elementsLoading = useSelector(getElementsLoadingCompany);
  const companies = useSelector(getAllCompanies);
  return (
    <div className="companies-page">
      {/* <div className="companies-page-navi-container">
        <div className="search-container"></div>
        <div className="search-result-count-container">
          <h4 className="search-result-count">
            <CountUp end={companiesCount} duration={0.5} />
          </h4>
          <h4 className="search-result-count-header">sonuç bulundu</h4>
        </div>
      </div> */}
      <div className="companies-container">
        {elementsLoading ? (
          <div className="companies-skeleton-container">
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
            <SkeletonCompany />
          </div>
        ) : (
          <div className="companies-inner-container">
            {companies.map((company) => {
              return <Company key={company._id} company={company} />;
            })}
          </div>
        )}
      </div>
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
            {companies.length > 20 ? (
              <h5 className="seen-all">Tümünü gördün</h5>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;
