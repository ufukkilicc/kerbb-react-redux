import React, { useEffect, useRef, useState } from "react";
import "./ContactPage.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { Helmet } from "react-helmet";
import TopMobileNavi from "../TopMobileNavi/TopMobileNavi";
import BottomMobileNavi from "../BottomMobileNavi/BottomMobileNavi";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

const ContactPage = () => {
  const [topNaviHeader, setTopNaviHeader] = useState(null);
  const pageInnerRef = useRef();
  const onScroll = () => {
    const { scrollTop } = pageInnerRef.current;
    if (scrollTop > 50 && topNaviHeader === null) {
      setTopNaviHeader("İletişim");
    } else if (scrollTop < 50 && topNaviHeader !== null) {
      setTopNaviHeader(null);
    }
  };
  return (
    <div
      className="contact-page-container"
      ref={pageInnerRef}
      onScroll={onScroll}
    >
      <Helmet>
        <title>İletişim</title>
        <meta property="og:title" content={`İletişim | Kerbb`} />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/kerbb/image/upload/v1664460395/local/website_photos/WhatsApp_Image_2022-09-29_at_00.17.34_mvym3a.jpg?w=800`}
        />
        <meta
          name="description"
          content={`Yüzlerce kurumsal şirketin iş ilanını ve haberlerini Kerbb ile keşfedin! | Kerbb`}
        />
      </Helmet>
      <div className="contact-page">
        <div className="header-container">
          <h1 className="header">İletişim</h1>
        </div>
        <div className="first-section-container">
          <ul className="first-section-contacts-list">
            <a href="mailto:team@kerbb.com">
              <li className="first-section-contact-item">
                <div className="first-section-contact-icon-container">
                  <EmailIcon fontSize="medium" />
                </div>
                <h2 className="first-section-contact">team@kerbb.com</h2>
              </li>
            </a>
            <a href="tel:+90-531-234-8258">
              <li className="first-section-contact-item">
                <div className="first-section-contact-icon-container">
                  <LocalPhoneIcon fontSize="medium" />
                </div>
                <h2 className="first-section-contact">+90 (531) 234 82 58</h2>
              </li>
            </a>
          </ul>
          <div className="first-section-illustration"></div>
        </div>
      </div>
      <div className="bottom-navi-container">
        <div className="bottom-navi-first">
          <div className="bottom-navi-first-logo-container">
            <div className="logo-container">
              <h1 className="logo-header">Kerbb</h1>
              <div className="logo"></div>
            </div>
            <h1 className="par">Şirketlerin kariyer platformlarındaki ilanları keşfet!</h1>
          </div>
          <div className="bottom-navi-first-navi">
            <Link to="/about">
              <div className="item">
                <h1>Hakkımızda</h1>
              </div>
            </Link>
            <Link to="/contact">
              <div className="item">
                <h1>İletişim</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="bottom-navi-second">
          <h1 className="bottom-navi-second-sss">
            @ 2023 kerbb.com Her Hakkı Saklıdır.
          </h1>
          <div className="bottom-navi-second-socials-container">
            <h1>Bizi Takip Edin</h1>
            <div className="bottom-navi-second-socials">
              <a
                href="https://www.linkedin.com/company/kerbbcom/"
                target="_blank"
              >
                <AiFillInstagram fontSize={30} />
              </a>
              <a href="https://www.instagram.com/kerbbcom/" target="_blank">
                <AiFillLinkedin fontSize={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
