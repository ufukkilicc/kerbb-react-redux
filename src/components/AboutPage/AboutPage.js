import React, { useEffect, useRef, useState } from "react";
import { fetchCompanies } from "../../features/companies/companiesAPI";
import Illustration from "../Illustration/Illustration";
import "./AboutPage.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import TopMobileNavi from "../TopMobileNavi/TopMobileNavi";
import BottomMobileNavi from "../BottomMobileNavi/BottomMobileNavi";

const AboutPage = () => {
  const [illustrationCompanies, setIllustrationCompanies] = useState([]);
  const [topNaviHeader, setTopNaviHeader] = useState(null);
  const pageInnerRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const illustrationCompaniesResponse = await fetchCompanies({
        page: 1,
        size: 20,
        is_active: true,
      });
      setIllustrationCompanies(illustrationCompaniesResponse.data);
    }
    fetchData();
  }, []);
  const onScroll = () => {
    const { scrollTop } = pageInnerRef.current;
    if (scrollTop > 50 && topNaviHeader === null) {
      setTopNaviHeader("Hakkımızda");
    } else if (scrollTop < 50 && topNaviHeader !== null) {
      setTopNaviHeader(null);
    }
  };
  return (
    <div
      className="about-page-container"
      ref={pageInnerRef}
      onScroll={onScroll}
    >
      <Helmet>
        <title>Kerbb nedir?</title>
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
      <div className="about-page">
        <div className="header-container">
          <h1 className="header">Hakkımızda</h1>
        </div>
        <div className="first-section-container">
          <div className="first-section-paragraph-container">
            <h2 className="first-section-paragraph-header">Biz kimiz?</h2>
            <p className="first-section-paragraph">
              Şirketlerin kendi kariyer sayfalarında yayınladıkları iş
              ilanlarını derleyen Kerbb.com karanlıkta kalmış ilanlara ışık
              tutarak, iş arayan adayların zamanlarını verimli kullanmalarını ve
              kendilerine uygun ilanları kolayca keşfetmelerini sağlıyor. Ayrıca
              şirket haberleri ve insan kaynakları alanıyla ilgili son
              gelişmelerin paylaşıldığı Kerbb.com, yüzlerce şirketten binlerce
              ilanı güncel olarak yayınlayabilen HR Tech girişimidir.
            </p>
          </div>
          <div className="first-section-illustration">
            <Illustration
              companies={
                illustrationCompanies.length > 0 ? illustrationCompanies : []
              }
            />
          </div>
        </div>
      </div>
      <div className="bottom-navi-container">
        <div className="bottom-navi-slogan-logo-info-container">
          <div className="slogan-logo-container">
            <div className="slogan-container">
              <p className="slogan">
                Şirketlerin kendi kariyer platformlarındaki ilanları tek tıkla
                keşfet!
              </p>
            </div>
            <div className="logo-container">
              <h1 className="logo-header">Kerbb</h1>
              <div className="logo"></div>
            </div>
          </div>
          <div className="info-container">
            <div className="info-inner-container">
              <div className="info-site-links-container">
                {/* <h4 className="info-site-links-header">Site Linkleri</h4> */}
                <ul className="info-site-links-list">
                  <Link to="/about">
                    <li className="site-links-item">
                      <h5 className="site-links-item-header">Hakkımızda</h5>
                    </li>
                  </Link>
                  <Link to="/contact">
                    <li className="site-links-item">
                      <h5 className="site-links-item-header">İletişim</h5>
                    </li>
                  </Link>
                </ul>
              </div>
              {/* <div className="info-companies-container">
                <h4 className="info-companies-header">Şirketler</h4>
                <ul className="info-companies-list">
                  <li className="companies-item">
                    <h5 className="companies-item-header">Getir</h5>
                  </li>
                  <li className="companies-item">
                    <h5 className="companies-item-header">Sanofi</h5>
                  </li>
                  <li className="companies-item">
                    <h5 className="companies-item-header">Koç Holding</h5>
                  </li>
                  <li className="companies-item">
                    <h5 className="companies-item-header">Unilever</h5>
                  </li>
                  <li className="companies-item">
                    <h5 className="companies-item-header">Arçelik Global</h5>
                  </li>
                </ul>
              </div> */}
              {/* <div className="info-news-container">
                <h4 className="info-news-header">Haberler</h4>
                <ul className="info-news-list">
                  <li className="news-item">
                    <h5 className="news-item-header">Getir</h5>
                  </li>
                  <li className="news-item">
                    <h5 className="news-item-header">Sanofi</h5>
                  </li>
                  <li className="news-item">
                    <h5 className="news-item-header">Koç Holding</h5>
                  </li>
                  <li className="news-item">
                    <h5 className="news-item-header">Unilever</h5>
                  </li>
                </ul>
              </div> */}
              {/* <div className="info-partners-container">
                <h4 className="info-partners-header">Partnerler</h4>
                <ul className="info-partners-list">
                  <li className="partners-item">
                    <a
                      href="https://www.linkedin.com/company/inbusinesstime"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <h5 className="partners-item-header">inbusinesstime</h5>
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <div className="bottom-navi-socials-container">
          <ul className="socials-list">
            <li className="socials-item">
              <a
                href="https://www.instagram.com/kerbbcom"
                rel="noreferrer"
                target="_blank"
              >
                <div className="instagram-icon-container">
                  <InstagramIcon fontSize="large" />
                </div>
              </a>
            </li>
            <li className="socials-item">
              <a
                href="https://www.linkedin.com/company/kerbbcom"
                rel="noreferrer"
                target="_blank"
              >
                <div className="linkedin-icon-container">
                  <LinkedInIcon fontSize="large" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
