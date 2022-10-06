import React, { useEffect, useMemo, useRef, useState } from "react";
import "./SearchPage.scss";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TuneIcon from "@mui/icons-material/Tune";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import Job from "../Job/Job";
import { useDispatch, useSelector } from "react-redux";
import {
  addJobs,
  getAllJobs,
  getJobSearchObject,
  includeJobs,
} from "../../features/jobs/jobsSlice";
import { fetchJobs } from "../../features/jobs/jobsAPI";
import { fetchTotal } from "../../features/total/totalAPI";
import { addTotal, getTotal } from "../../features/total/totalSlice";
import { useSearchParams } from "react-router-dom";
import { fetchCompanies } from "../../features/companies/companiesAPI";
import {
  addCompanies,
  getAllCompanies,
  includeCompanies,
} from "../../features/companies/companiesSlice";
import Company from "../Company/Company";
import CircleIcon from "@mui/icons-material/Circle";
import Zoom from "@mui/material/Zoom";
import { getLocalStorage, setLocalStorage } from "../../helpers/authHelper";
import {
  getSearchObject,
  getUserSearchHistory,
  updateUserSearchHistory,
} from "../../features/auth/authSlice";
import Dialog from "@mui/material/Dialog";
import { Helmet } from "react-helmet";
import SkeletonJob from "../SkeletonJob/SkeletonJob";
import Filter from "../Filter/Filter";
import Drawer from "@mui/material/Drawer";
import MobileFilter from "../MobileFilter/MobileFilter";
import {
  getDialog,
  getMobileDialog,
  updateDialog,
  updateMobileDialog,
} from "../../features/dialogs/dialogsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import CountUp, { useCountUp } from "react-countup";
import {
  getScrolledPage,
  updateScrolledPage,
} from "../../features/scrolls/scrollsSlice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ClearIcon from "@mui/icons-material/Clear";

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterActive, setFilterActive] = useState(false);
  const [isJobSectionActive, setJobSectionActive] = useState(false);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [naviSticky, setNaviSticky] = useState(false);
  const pageInnerRef = useRef();
  const loaderRef = useRef();
  const autoCompleteRef = useRef();
  const submitButtonRef = useRef();
  const autoCompleteWhereRef = useRef();
  const [pageCount, setPageCount] = useState(1);
  const [whatInput, setWhatInput] = useState("");
  const [whereInput, setWhereInput] = useState("");
  const [elementsLoading, setElementsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [autoCompleteWhatDropdown, setAutoCompleteWhatDropdown] =
    useState(false);
  const [autoCompleteWhereDropdown, setAutoCompleteWhereDropdown] =
    useState(false);
  const [
    autoCompleteWhereDropdownLocations,
    setautoCompleteWhereDropdownLocations,
  ] = useState([]);
  const [autoCompleteWhatDropdownLoading, setAutoCompleteWhatDropdownLoading] =
    useState(false);
  const [
    autoCompleteWhereDropdownLoading,
    setAutoCompleteWhereDropdownLoading,
  ] = useState(false);
  const [
    autoCompleteWhatDropdownCompanies,
    setAutoCompleteWhatDropdownCompanies,
  ] = useState([]);
  const [autoCompleteWhatDropdownJobs, setAutoCompleteWhatDropdownJobs] =
    useState([]);
  // const [companyCount, setCompanyCount] = useState(0);
  // const [jobCount, setJobCount] = useState(0);
  const [turkeyStates, setTurkeyStates] = useState([
    { _id: 1, name: "Adana" },
    { _id: 2, name: "Adıyaman" },
    { _id: 3, name: "Afyon" },
    { _id: 4, name: "Ağrı" },
    { _id: 5, name: "Amasya" },
    { _id: 6, name: "Ankara" },
    { _id: 7, name: "Antalya" },
    { _id: 8, name: "Artvin" },
    { _id: 9, name: "Aydın" },
    { _id: 10, name: "Balıkesir" },
    { _id: 11, name: "Bilecik" },
    { _id: 12, name: "Bingöl" },
    { _id: 13, name: "Bitlis" },
    { _id: 14, name: "Bolu" },
    { _id: 15, name: "Burdur" },
    { _id: 16, name: "Bursa" },
    { _id: 17, name: "Çanakkale" },
    { _id: 18, name: "Çankırı" },
    { _id: 19, name: "Çorum" },
    { _id: 20, name: "Denizli" },
    { _id: 21, name: "Diyarbakır" },
    { _id: 22, name: "Edirne" },
    { _id: 23, name: "Elazığ" },
    { _id: 24, name: "Erzincan" },
    { _id: 25, name: "Erzurum" },
    { _id: 26, name: "Eskişehir" },
    { _id: 27, name: "Gaziantep" },
    { _id: 28, name: "Giresun" },
    { _id: 29, name: "Gümüşhane" },
    { _id: 30, name: "Hakkari" },
    { _id: 31, name: "Hatay" },
    { _id: 32, name: "Isparta" },
    { _id: 33, name: "Mersin" },
    { _id: 34, name: "İstanbul" },
    { _id: 35, name: "İzmir" },
    { _id: 36, name: "Kars" },
    { _id: 37, name: "Kastamonu" },
    { _id: 38, name: "Kayseri" },
    { _id: 39, name: "Kırklareli" },
    { _id: 40, name: "Kırkşehir" },
    { _id: 41, name: "Kocaeli" },
    { _id: 42, name: "Konya" },
    { _id: 43, name: "Kütahya" },
    { _id: 44, name: "Malatya" },
    { _id: 45, name: "Manisa" },
    { _id: 46, name: "Kahramanmaraş" },
    { _id: 47, name: "Mardin" },
    { _id: 48, name: "Muğla" },
    { _id: 49, name: "Muş" },
    { _id: 50, name: "Nevşehir" },
    { _id: 51, name: "Niğde" },
    { _id: 52, name: "Ordu" },
    { _id: 53, name: "Rize" },
    { _id: 54, name: "Sakarya" },
    { _id: 55, name: "Samsun" },
    { _id: 56, name: "Siirt" },
    { _id: 57, name: "Sinop" },
    { _id: 58, name: "Sivas" },
    { _id: 59, name: "Tekirdağ" },
    { _id: 60, name: "Tokat" },
    { _id: 61, name: "Trabzon" },
    { _id: 62, name: "Tunceli" },
    { _id: 63, name: "Şanlıurfa" },
    { _id: 64, name: "Uşak" },
    { _id: 65, name: "Van" },
    { _id: 66, name: "Yozgat" },
    { _id: 67, name: "Zonguldak" },
    { _id: 68, name: "Aksaray" },
    { _id: 69, name: "Bayburt" },
    { _id: 70, name: "Karaman" },
    { _id: 71, name: "Kırıkkale" },
    { _id: 72, name: "Batman" },
    { _id: 73, name: "Şırnak" },
    { _id: 74, name: "Bartın" },
    { _id: 75, name: "Ardahan" },
    { _id: 76, name: "Iğdır" },
    { _id: 77, name: "Yalova" },
    { _id: 78, name: "Karabük" },
    { _id: 79, name: "Kilis" },
    { _id: 80, name: "Osmaniye" },
    { _id: 81, name: "Düzce" },
  ]);
  const [activeCompanyCount, setActiveCompanyCount] = useState(null);
  const [hasMoreJobs, setHasMoreJobs] = useState(false);
  const [hasMoreCompanies, setHasMoreCompanies] = useState(false);
  // const what = searchParams.get("what") || "";
  // const where = searchParams.get("where") || "";

  // const callbackFunction = (entries) => {
  //   const [entry] = entries; // const entry = entries[0]
  //   setLoader(entry.isIntersecting);
  // };

  // const options = useMemo(() => {
  //   return {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.3,
  //   };
  // }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(callbackFunction, options);
  //   const currentTarget = loaderRef.current;
  //   if (currentTarget) observer.observe(currentTarget);
  //   return () => {
  //     if (currentTarget) observer.unobserve(currentTarget);
  //   };
  // }, [loaderRef, options]);

  useEffect(() => {
    async function fetchData() {
      setElementsLoading(true);
      const jobsResponse = await fetchJobs({
        what: whatInput,
        where: whereInput,
        page: pageCount,
        size: 20,
        sort_by: jobSearchObject.sort_by,
        sort: jobSearchObject.sort,
        date: jobSearchObject.date,
      });
      const companiesResponse = await fetchCompanies({
        page: pageCount,
        is_active: true,
      });
      const activeCompanyCountResponse = await fetchCompanies({
        state: "active",
      });
      if (activeCompanyCountResponse.data[0]) {
        setActiveCompanyCount(activeCompanyCountResponse.data[0].total);
      }
      setElementsLoading(false);
      const totalResponse = await fetchTotal();
      dispatch(addCompanies(companiesResponse.data));
      dispatch(addTotal(totalResponse.data));
      // companyCountAnimation(0, totalResponse.data["company"]);
      // jobCountAnimation(0, totalResponse.data["job"]);
      dispatch(addJobs(jobsResponse.data));
      // if (what !== "" || where !== "") {
      //   if (what !== null || where !== null) {
      //     setJobSectionActive(!isJobSectionActive);
      //   } else {
      //     setJobSectionActive(false);
      //   }
      // } else {
      //   setJobSectionActive(false);
      // }
    }
    const userSearchHistory = getLocalStorage("k_s_h");
    if (userSearchHistory !== undefined) {
      dispatch(updateUserSearchHistory(JSON.parse(userSearchHistory)));
    }
    document.addEventListener("click", handleWhatClickCapture, true);
    document.addEventListener("click", handleWhereClickCapture, true);
    fetchData();
    setTimeout(() => {
      setHasMoreCompanies(true);
      setHasMoreJobs(true);
    }, 1000);
  }, []);
  const jobs = useSelector(getAllJobs);
  const companies = useSelector(getAllCompanies);
  const totals = useSelector(getTotal);
  const dialogState = useSelector(getDialog);
  const mobileDialogState = useSelector(getMobileDialog);
  const scrolledPage = useSelector(getScrolledPage);
  const searchObject = useSelector(getSearchObject);
  const searchHistory = useSelector(getUserSearchHistory);
  const jobSearchObject = useSelector(getJobSearchObject);

  let load = async () => {
    if (jobs.length % 10 === 0 && hasMoreJobs) {
      setPageCount(pageCount + 1);
      setLoader(true);
      const jobsResponse = await fetchJobs({
        what: whatInput,
        where: whereInput,
        page: pageCount + 1,
        size: 20,
        sort_by: jobSearchObject.sort_by,
        sort: jobSearchObject.sort,
        date: jobSearchObject.date,
      });
      if (jobsResponse.data === 0) {
        setLoader(false);
        setHasMoreJobs(false);
      }
      setLoader(false);
      dispatch(includeJobs(jobsResponse.data));
    } else {
      setLoader(false);
      setHasMoreJobs(false);
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

  let loadCompanies = async () => {
    if (companies.length % 10 === 0 && hasMoreCompanies) {
      setPageCount(pageCount + 1);
      setLoader(true);
      const companiesResponse = await fetchCompanies({
        page: pageCount + 1,
        size: 10,
        is_active: true,
      });
      console.log(companiesResponse.data);
      if (companiesResponse.data.length === 0) {
        setLoader(false);
        setHasMoreCompanies(false);
      }
      setLoader(false);
      dispatch(includeCompanies(companiesResponse.data));
    } else {
      setLoader(false);
      setHasMoreCompanies(false);
    }
  };
  const loaderrCompanies = useRef(load);
  const observerCompanies = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loaderrCompanies.current();
        }
      },
      { threshold: 0.2 }
    )
  );
  const [elementCompanies, setElementCompanies] = useState(null);

  useEffect(() => {
    loaderrCompanies.current = loadCompanies;
  }, [loadCompanies]);

  useEffect(() => {
    const currentElementCompanies = elementCompanies;
    const currentObserverCompanies = observerCompanies.current;

    if (currentElementCompanies) {
      currentObserverCompanies.observe(currentElementCompanies);
    }

    return () => {
      if (currentElementCompanies) {
        currentObserverCompanies.unobserve(currentElementCompanies);
      }
    };
  }, [elementCompanies]);

  useEffect(() => {
    if (scrolledPage === window.location.pathname) {
      scrollToTop();
      dispatch(updateScrolledPage(""));
    }
  }, [scrolledPage]);

  // useEffect(() => {
  //   async function fetchData() {
  //     setPageCount(1);
  //     setSearchParams({ what: searchObject.what, where: searchObject.where });
  //     setWhatInput(what);
  //     setWhereInput(where);
  //     submitButtonRef.current.click();
  //   }
  //   fetchData();
  // }, [searchObject]);

  useEffect(() => {
    async function fetchData() {
      scrollToTop();
      setPageCount(1);
      // if (!isJobSectionActive) {
      //   setJobSectionActive(!isJobSectionActive);
      // }
      setSearchParams({ what: whatInput, where: whereInput });
      setElementsLoading(true);
      const jobsResponse = await fetchJobs({
        what: whatInput,
        where: whereInput,
        page: 1,
        size: 20,
        sort_by: jobSearchObject.sort_by,
        sort: jobSearchObject.sort,
        date: jobSearchObject.date,
      });
      setElementsLoading(false);
      dispatch(addJobs(jobsResponse.data));
      // if (jobsResponse.data.length > 0) {
      //   if (what.length !== 0 || where.length !== 0) {
      //     const userSearchHistory = getLocalStorage("k_s_h");
      //     if (userSearchHistory === undefined || userSearchHistory === null) {
      //       setLocalStorage("k_s_h", [{ id: 0, what, where }]);
      //     } else {
      //       let array = JSON.parse(userSearchHistory);
      //       if (array.length === 5) {
      //         array.pop();
      //       }
      //       array.unshift({ id: array.length + 1, what, where });
      //       setLocalStorage("k_s_h", array);
      //       dispatch(updateUserSearchHistory(array));
      //     }
      //   }
      // }
    }
    fetchData();
  }, [jobSearchObject]);

  // const companyCountAnimation = (minimum, maximum) => {
  //   for (let count = minimum; count <= maximum; count++) {
  //     setTimeout(() => {
  //       setCompanyCount(count);
  //     }, 500 * (count + 1));
  //   }
  // };
  // const jobCountAnimation = (minimum, maximum) => {
  //   for (let count = minimum; count <= maximum; count++) {
  //     setTimeout(() => {
  //       setJobCount(count);
  //     }, 500 * (count + 1));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    scrollToTop();
    setPageCount(1);
    if (!isJobSectionActive) {
      setJobSectionActive(!isJobSectionActive);
    }
    setSearchParams({ what: whatInput, where: whereInput });
    setElementsLoading(true);
    const jobsResponse = await fetchJobs({
      what: whatInput,
      where: whereInput,
      page: 1,
      size: 20,
      sort_by: jobSearchObject.sort_by,
      sort: jobSearchObject.sort,
      date: jobSearchObject.date,
    });
    setElementsLoading(false);
    dispatch(addJobs(jobsResponse.data));
    if (jobsResponse.data.length > 0) {
      if (whatInput.length !== 0 || whereInput.length !== 0) {
        const userSearchHistory = getLocalStorage("k_s_h");
        if (userSearchHistory === undefined || userSearchHistory === null) {
          setLocalStorage("k_s_h", [{ id: 0, whatInput, whereInput }]);
        } else {
          let array = JSON.parse(userSearchHistory);
          if (array.length === 5) {
            array.pop();
          }
          array.unshift({ id: array.length + 1, whatInput, whereInput });
          setLocalStorage("k_s_h", array);
          dispatch(updateUserSearchHistory(array));
        }
      }
    }
  };
  const handleFilterClick = async () => {
    const width = window.innerWidth;
    setFilterActive(true);
    if (width <= 1120) {
      dispatch(updateMobileDialog(true));
    } else {
      dispatch(updateDialog(true));
    }
  };
  const handleNotificationClick = () => {
    setIsNotificationActive(true);
    // setDialog(!dialog);
  };
  const handleDialogClose = () => {
    // setFilterActive(false);
    // setIsNotificationActive(false);
    dispatch(updateDialog(false));
  };
  const handleMobilDialogClose = () => {
    dispatch(updateMobileDialog(false));
  };
  const ucfirst = (str) => {
    var firstLetter = str.substr(0, 1);
    var last = firstLetter.toUpperCase() + str.substr(1);
    return last.replace("I", "İ");
  };
  const onScroll = async () => {};
  const onChangeHandler = async () => {};
  const handleCompanySectionActive = async () => {
    if (!isJobSectionActive) {
      scrollToTop();
    } else {
      // setElementsLoading(true);
      // const companiesResponse = await fetchCompanies({
      //   page: pageCount,
      //   is_active: true,
      // });
      // setElementsLoading(false);
      // dispatch(addCompanies(companiesResponse.data));
    }
    setJobSectionActive(false);
  };
  const handleJobSectionActive = async () => {
    if (isJobSectionActive) {
      scrollToTop();
    } else {
      // setElementsLoading(true);
      // const jobsResponse = await fetchJobs({
      //   what: whatInput,
      //   where: whereInput,
      //   page: 1,
      //   size: 20,
      //   sort_by: jobSearchObject.sort_by,
      //   sort: jobSearchObject.sort,
      //   date: jobSearchObject.date,
      // });
      // setElementsLoading(false);
      // dispatch(addJobs(jobsResponse.data));
    }
    setJobSectionActive(true);
  };
  const onWhatChange = async (e) => {
    const what = e.target.value;
    setWhatInput(what);
    if (what.length > 0) {
      setAutoCompleteWhatDropdown(true);
      // setAutoCompleteWhatDropdownLoading(true);
      const companiesResponse = await fetchCompanies({
        query_text: what,
        page: 1,
        size: 3,
      });
      const jobsResponse = await fetchJobs({
        what,
        page: 1,
        size: 3,
        sort_by: jobSearchObject.sort_by,
        sort: jobSearchObject.sort,
        date: jobSearchObject.date,
      });
      // setAutoCompleteWhatDropdownLoading(false);
      setAutoCompleteWhatDropdownCompanies(companiesResponse.data);
      setAutoCompleteWhatDropdownJobs(jobsResponse.data);
    } else {
      setAutoCompleteWhatDropdown(false);
    }
  };
  const onWhereChange = async (e) => {
    const where = e.target.value;
    setWhereInput(where);
    if (where.length > 0) {
      setAutoCompleteWhereDropdown(true);
      setAutoCompleteWhereDropdownLoading(true);
      const locations = await turkeyStates.filter((location) =>
        location.name.includes(ucfirst(where))
      );
      setautoCompleteWhereDropdownLocations(locations.slice(0, 3));
      setAutoCompleteWhatDropdownLoading(false);
    } else {
      setAutoCompleteWhereDropdown(false);
    }
  };
  const onWhatKeyUpCapture = (e) => {
    const key = e.code;
    if (key === "Escape") {
      setAutoCompleteWhatDropdown(false);
    }
  };
  const onWhereKeyUpCapture = (e) => {
    const key = e.code;
    if (key === "Escape") {
      setAutoCompleteWhereDropdown(false);
    }
  };
  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      setNaviSticky(true);
    } else {
      setNaviSticky(false);
    }
  };
  const scrollToTop = () => {
    pageInnerRef.current.scrollTo(0, 0);
  };
  const handleWhatClickCapture = (e) => {
    if (autoCompleteRef.current) {
      if (!autoCompleteRef.current.contains(e.target)) {
        setAutoCompleteWhatDropdown(false);
      }
    }
  };
  const handleWhereClickCapture = (e) => {
    if (autoCompleteWhereRef.current) {
      if (!autoCompleteWhereRef.current.contains(e.target)) {
        setAutoCompleteWhereDropdown(false);
      }
    }
  };
  const handleSetAutoCompleteWhatDropdown = (what) => {
    setWhatInput(what);
    setJobSectionActive(true);
    setAutoCompleteWhatDropdown(false);
    setTimeout(() => {
      submitButtonRef.current.click();
    }, 500);
  };
  const handleSetAutoCompleteWhereDropdown = (where) => {
    setWhereInput(where);
    setJobSectionActive(true);
    setAutoCompleteWhereDropdown(false);
    setTimeout(() => {
      submitButtonRef.current.click();
    }, 500);
  };
  const handleCancelWhatInput = () => {
    setWhatInput("");
    setTimeout(() => {
      submitButtonRef.current.click();
    }, 100);
  };
  const handleCancelWhereInput = () => {
    setWhereInput("");
    setTimeout(() => {
      submitButtonRef.current.click();
    }, 100);
  };
  return (
    <div
      className="search-page-container"
      ref={pageInnerRef}
      onScroll={onScroll}
      onWheel={handleWheel}
    >
      <Helmet>
        <title>Kurumsal İş İlanları</title>
        <meta property="og:title" content={`Kurumsal İş İlanları | Kerbb`} />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/kerbb/image/upload/v1664460395/local/website_photos/WhatsApp_Image_2022-09-29_at_00.17.34_mvym3a.jpg?w=800`}
        />
        <meta
          name="description"
          content={`Yüzlerce kurumsal şirketin iş ilanını ve haberlerini Kerbb ile keşfedin! | Kerbb`}
        />
      </Helmet>
      <div
        className={
          naviSticky
            ? "search-page-in-navi-container-active"
            : "search-page-in-navi-container"
        }
      >
        <div className="info-container">
          <div className="info-section-one">
            <div className="company-jobs-switch-container">
              <div
                className={
                  isJobSectionActive
                    ? "company-switch-container"
                    : "company-switch-container-active"
                }
                onClick={handleCompanySectionActive}
              >
                <h4 className="company-switch-header">Şirketler</h4>
              </div>
              <div className="switch-icon">
                <CircleIcon fontSize="small" />
              </div>
              <div
                className={
                  isJobSectionActive
                    ? "job-switch-container-active"
                    : "job-switch-container"
                }
                onClick={handleJobSectionActive}
              >
                <h4 className="job-switch-header">İlanlar</h4>
              </div>
            </div>
          </div>
          <div className="info-section-second">
            <div className="info-jobs-container">
              <span className="jobs-count">
                {totals ? <CountUp end={totals["job"]} duration={0.5} /> : 0}
              </span>
              <h5 className="jobs-header">İş İlanı</h5>
            </div>
            <div className="info-companies-container">
              <span className="companies-count">
                {activeCompanyCount ? (
                  <CountUp end={activeCompanyCount} duration={0.5} />
                ) : (
                  0
                )}
              </span>
              <h5 className="companies-header">Şirket</h5>
            </div>
          </div>
        </div>
        <div className="search-container">
          <form
            onSubmit={handleSubmit}
            onChange={onChangeHandler}
            className="search-form"
          >
            <div className="search-form-what-container">
              <div className="search-form-what-header-container">
                <h3 className="search-form-what-header">Ne</h3>
              </div>
              <input
                type="text"
                className="search-form-what-input"
                placeholder="Pozisyon veya şirket adı"
                value={whatInput}
                onChange={onWhatChange}
                onKeyUpCapture={onWhatKeyUpCapture}
              />
              {whatInput.length > 0 ? (
                <div
                  className="search-form-what-icon-second-container"
                  onClick={handleCancelWhatInput}
                >
                  <ClearIcon fontSize="small" />
                </div>
              ) : (
                <div className="search-form-what-icon-container">
                  <SearchIcon fontSize="small" />
                </div>
              )}

              <div
                className={
                  autoCompleteWhatDropdown
                    ? "search-form-what-autocomplete-dropdown-container-active"
                    : "search-form-what-autocomplete-dropdown-container"
                }
                ref={autoCompleteRef}
              >
                {autoCompleteWhatDropdownLoading ? (
                  <div className="search-form-what-autocomplete-dropdown-loader">
                    <CircularProgress
                      size="30px"
                      sx={{ color: "#4e21e7", opacity: 0.8 }}
                    />
                  </div>
                ) : (
                  <div className="search-form-what-autocomplete-dropdown-inner-container">
                    <div className="companies-dropdown-container">
                      <div className="companies-dropdown-header-container">
                        <h4 className="companies-dropdown-header">ŞİRKETLER</h4>
                      </div>
                      {autoCompleteWhatDropdownCompanies.length === 0 ? (
                        <h5 className="companies-dropdown-none-list-header">
                          Hiçbir sonuç bulunamadı.
                        </h5>
                      ) : (
                        <ul className="companies-dropdown-list">
                          {autoCompleteWhatDropdownCompanies.map((company) => {
                            return (
                              <li
                                className="companies-dropdown-item"
                                key={company._id}
                                onClick={() =>
                                  handleSetAutoCompleteWhatDropdown(
                                    company.name
                                  )
                                }
                              >
                                <div className="companies-dropdown-company">
                                  <div className="companies-dropdown-company-image-container">
                                    <img
                                      src={
                                        company.logo_image_url !== ""
                                          ? company.logo_image_url
                                          : process.env.PUBLIC_URL +
                                            "/no-image.png"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="companies-dropdown-company-name-container">
                                    <h5 className="companies-dropdown-company-name">
                                      {company.name}
                                    </h5>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    <div className="jobs-dropdown-container">
                      <div className="jobs-dropdown-header-container">
                        <h4 className="jobs-dropdown-header">İLANLAR</h4>
                      </div>
                      {autoCompleteWhatDropdownJobs.length === 0 ? (
                        <h5 className="jobs-dropdown-none-list-header">
                          Hiçbir sonuç bulunamadı.
                        </h5>
                      ) : (
                        <ul className="jobs-dropdown-list">
                          {autoCompleteWhatDropdownJobs.map((job) => {
                            return (
                              <li
                                className="jobs-dropdown-item"
                                key={job._id}
                                onClick={() =>
                                  handleSetAutoCompleteWhatDropdown(
                                    job.job_title
                                  )
                                }
                              >
                                <div className="jobs-dropdown-job">
                                  <div className="jobs-dropdown-job-image-container">
                                    <img
                                      src={
                                        job.job_company.logo_image_url !== ""
                                          ? job.job_company.logo_image_url
                                          : process.env.PUBLIC_URL +
                                            "/no-image.png"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="jobs-dropdown-job-name-container">
                                    <h5 className="jobs-dropdown-job-name">
                                      {job.job_title}
                                    </h5>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    <div className="search-history-dropdown-container">
                      <div className="search-history-dropdown-header-container">
                        <h4 className="search-history-dropdown-header">
                          SON ARANANLAR
                        </h4>
                      </div>
                      {searchHistory && searchHistory.length === 0 ? (
                        <div></div>
                      ) : (
                        <ul className="search-history-dropdown-list">
                          {searchHistory ? (
                            searchHistory.map((sh) => {
                              return (
                                <li
                                  className="search-history-dropdown-item"
                                  onClick={() =>
                                    handleSetAutoCompleteWhatDropdown(sh.what)
                                  }
                                >
                                  <div className="search-history-dropdown-search-history">
                                    <div className="search-history-dropdown-icon-container">
                                      <SearchIcon fontSize="small" />
                                    </div>
                                    <div className="search-history-dropdown-name-container">
                                      <h5 className="search-history-dropdown-name">
                                        {sh.what}
                                      </h5>
                                    </div>
                                  </div>
                                </li>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </ul>
                      )}
                    </div>
                    <div className="arrow-container">
                      <PlayArrowIcon />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="search-form-where-container">
              <div className="search-form-where-header-container">
                <h3 className="search-form-where-header">Nerede</h3>
              </div>
              <input
                type="text"
                className="search-form-where-input"
                placeholder="İstanbul'da"
                value={whereInput}
                onChange={onWhereChange}
                onKeyUpCapture={onWhereKeyUpCapture}
              />
              {whereInput.length > 0 ? (
                <div
                  className="search-form-where-icon-second-container"
                  onClick={handleCancelWhereInput}
                >
                  <ClearIcon fontSize="small" />
                </div>
              ) : (
                <div className="search-form-where-icon-container">
                  <LocationOnIcon fontSize="small" />
                </div>
              )}
              <div
                className={
                  autoCompleteWhereDropdown
                    ? "search-form-where-autocomplete-dropdown-container-active"
                    : "search-form-where-autocomplete-dropdown-container"
                }
                ref={autoCompleteWhereRef}
              >
                <div className="search-form-where-autocomplete-dropdown-inner-container">
                  <div className="locations-dropdown-container">
                    <div className="locations-dropdown-header-container">
                      <h4 className="locations-dropdown-header">LOKASYON</h4>
                    </div>
                    {autoCompleteWhereDropdownLocations.length === 0 ? (
                      <h5 className="locations-dropdown-none-list-header">
                        Hiçbir sonuç bulunamadı.
                      </h5>
                    ) : (
                      <ul className="locations-dropdown-list">
                        {autoCompleteWhereDropdownLocations.map((location) => {
                          return (
                            <li
                              className="locations-dropdown-item"
                              key={location._id}
                              onClick={() =>
                                handleSetAutoCompleteWhereDropdown(
                                  location.name
                                )
                              }
                            >
                              <div className="locations-dropdown-location">
                                <div className="locations-dropdown-location-icon-container">
                                  <LocationOnIcon fontSize="small" />
                                </div>
                                <div className="locations-dropdown-location-name-container">
                                  <h5 className="locations-dropdown-location-name">
                                    {location.name}
                                  </h5>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                  <div className="search-history-dropdown-container">
                    <div className="search-history-dropdown-header-container">
                      <h4 className="search-history-dropdown-header">
                        SON ARANANLAR
                      </h4>
                    </div>
                    {searchHistory && searchHistory.length === 0 ? (
                      <div></div>
                    ) : (
                      <ul className="search-history-dropdown-list">
                        {searchHistory ? (
                          searchHistory.map((sh) => {
                            return (
                              <li
                                className="search-history-dropdown-item"
                                onClick={() =>
                                  handleSetAutoCompleteWhereDropdown(sh.where)
                                }
                              >
                                <div className="search-history-dropdown-search-history">
                                  <div className="search-history-dropdown-icon-container">
                                    <SearchIcon fontSize="small" />
                                  </div>
                                  <div className="search-history-dropdown-name-container">
                                    <h5 className="search-history-dropdown-name">
                                      {sh.where}
                                    </h5>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <div></div>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <input
              className="search-form-button"
              ref={submitButtonRef}
              type="submit"
              value="Ara"
            />
          </form>
        </div>
        <div className="filter-and-notification-container">
          <div className="filter-icon-and-filters-live-container">
            <div className="filter-icon-container">
              <div className="filter-icon" onClick={handleFilterClick}>
                <TuneIcon fontSize="medium" />
              </div>
            </div>
            {/* <div className="filters-live-container">
              <ul className="filters-live-list">
                <li className="filters-live-item">
                  <Chip
                    label="Senior"
                    variant="outlined"
                    size="small"
                    // onDelete={handleDelete}
                    icon={<CancelIcon fontSize="small" />}
                  />
                </li>
                <li className="filters-live-item">
                  <Chip
                    label="İstanbul"
                    variant="outlined"
                    size="small"
                    // onDelete={handleDelete}
                    icon={<CancelIcon fontSize="small" />}
                  />
                </li>
                <li className="filters-live-item">
                  <Chip
                    label="Ekonomi"
                    variant="outlined"
                    size="small"
                    // onDelete={handleDelete}
                    icon={<CancelIcon fontSize="small" />}
                  />
                </li>
              </ul>
            </div> */}
          </div>

          <div className="notification-container">
            <div
              className="notification-icon-bell"
              onClick={handleNotificationClick}
            >
              <NotificationsOffIcon fontSize="medium" />
            </div>
            <h5 className="notification-header">bildirim oluştur</h5>
            <div
              className="notification-icon-switch"
              onClick={handleNotificationClick}
            >
              <ToggleOffIcon fontSize="large" />
            </div>
          </div>
        </div>
      </div>
      {elementsLoading ? (
        <div className="skeleton-container">
          <SkeletonJob key={1} />
          <SkeletonJob key={2} />
          <SkeletonJob key={3} />
          <SkeletonJob key={4} />
          <SkeletonJob key={5} />
          <SkeletonJob key={6} />
        </div>
      ) : (
        [
          isJobSectionActive ? (
            jobs.length > 0 ? (
              <div className="jobs-container">
                {jobs.map((job) => {
                  return <Job job={job} key={job._id} />;
                })}
              </div>
            ) : (
              <div className="jobs-container-empty">
                <div className="empty-icon-container">
                  <SearchIcon fontSize="large" />
                </div>
                <h3 className="empty-header">
                  Üzgünüz,{" "}
                  <span className="empty-header-input-what">{whatInput}</span>{" "}
                  {whereInput ? (
                    whereInput.length > 0 ? (
                      <span>- </span>
                    ) : (
                      <div className="empty"></div>
                    )
                  ) : (
                    <div className="empty"></div>
                  )}
                  <span className="empty-header-input-where">
                    {whereInput
                      ? whereInput.length > 0
                        ? whereInput
                        : ""
                      : ""}
                  </span>{" "}
                  için eşleşme bulamadık.
                </h3>
                <p className="empty-paragraph">
                  Lütfen başka bir terimle aramayı deneyin
                </p>
              </div>
            )
          ) : (
            <div className="companies-container">
              {companies.map((company) => {
                return <Company company={company} key={company._id} />;
              })}
            </div>
          ),
        ]
      )}
      <Dialog open={dialogState} onClose={handleDialogClose}>
        <Filter />
      </Dialog>
      <Drawer
        open={mobileDialogState}
        anchor="bottom"
        onClose={handleMobilDialogClose}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        <MobileFilter />
      </Drawer>
      {isJobSectionActive ? (
        <div className="loader-container" ref={setElement}>
          {hasMoreJobs ? (
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
        <div className="loader-container" ref={setElementCompanies}>
          {hasMoreCompanies ? (
            <div className={loader ? "loader-active" : "loader"}>
              <CircularProgress
                size="30px"
                sx={{ color: "#4e21e7", opacity: 0.8 }}
              />
            </div>
          ) : (
            <div className="seen-all-container">
              {companies.length > 10 ? (
                <h5 className="seen-all">Tümünü gördün</h5>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
