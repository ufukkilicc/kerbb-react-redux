import React, { useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CompanyDetailPage from "../CompanyDetail/CompanyDetailPage";
import NewsDetailPage from "../NewsDetailPage/NewsDetailPage";
import NewsPage from "../NewsPage/NewsPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import SearchPage from "../SearchPage/SearchPage";
import SideInfoBar from "../SideInfoBar/SideInfoBar";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content-container">
        <Routes>
          <Route path="search" element={<SearchPage />} />
          <Route path="companies/:title" element={<CompanyDetailPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:title" element={<NewsDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {/* <div className="side-info-container">
        <SideInfoBar />
      </div> */}
    </div>
  );
};

export default Dashboard;
