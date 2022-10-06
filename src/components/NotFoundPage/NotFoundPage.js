import React from "react";
import "./NotFoundPage.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

const NotFoundPage = () => {
  return (
    <div className="not-found-page-container">
      <Helmet>
        <title>Eyvah! Sayfa Bulunamadı</title>
        <meta property="og:title" content={`Eyvah! Sayfa Bulunamadı | Kerbb`} />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/kerbb/image/upload/v1664460395/local/website_photos/WhatsApp_Image_2022-09-29_at_00.17.34_mvym3a.jpg?w=800`}
        />
        <meta
          name="description"
          content={`Üzgünüz, ancak istediğiniz sayfa bulunamadı | Kerbb`}
        />
      </Helmet>
      <div className="not-found-container">
        <div className="not-found-pre-content-container">
          <h3 className="not-found-pre-content">EYVAH! SAYFA BULUNAMADI</h3>
        </div>
        <div className="not-found-header-container">
          <h1 className="not-found-header">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <div className="not-found-post-content-container">
          <h3 className="not-found-post-content">
            ÜZGÜNÜZ, ANCAK İSTEDİĞİNİZ SAYFA BULUNAMADI
          </h3>
        </div>
        <div className="not-found-navi-container">
          <Link to="/">
            <div className="navi-home-container">
              {/* <div className="navi-home-icon-container">
                <HomeIcon fontSize="medium" />
              </div> */}
              <h1 className="navi-home-header">Ana Sayfa</h1>
            </div>
          </Link>
          <Link to="/dashboard/search">
            <div className="navi-search-container">
              {/* <div className="navi-search-icon-container">
                <SearchIcon fontSize="medium" />
              </div> */}
              <h1 className="navi-search-header">Arama</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
