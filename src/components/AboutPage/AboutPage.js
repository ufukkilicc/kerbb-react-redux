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
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

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
            <div className="first-section-paragraph-header-container">
              <h2 className="first-section-paragraph-header">Biz kimiz?</h2>
              <div className="first-section-paragraph-header-style"></div>
            </div>
            <p className="first-section-paragraph">
              Kerbb, hedef kitlesinin geçtiği zorlu bir iş arama sürecinden
              geçen girişimciler tarafından kurulumuştur, bu nedenle yaşanan
              süreçleri çok iyi biliyor ve ona göre çözümler sunuyor.
            </p>
          </div>
        </div>
        <div className="second-section-container">
          <div className="second-section-paragraph-container">
            <div className="second-section-paragraph-header-container">
              <h2 className="second-section-paragraph-header">Amacımız?</h2>
              <div className="second-section-paragraph-header-style"></div>
            </div>
            <p className="second-section-paragraph">
              Kerbb, kariyer sayfalarındaki bulunan dağınık iş ilanlarını tek
              bir sayfada toplayarak kariyerinin başında olan adayların ilgisini
              çekebilecek tüm ilanları login adımlarıyla uğraştırmadan gösteren
              ve tüm bu süreçte sunduğu içeriklerle adayların iş arama
              süreçlerini iyileştirmeyi amaçlayan bir platformdur.
            </p>
          </div>
        </div>
        <div className="third-section-container">
          <div className="third-section-paragraph-container">
            <div className="third-section-paragraph-header-container">
              <h2 className="third-section-paragraph-header">
                Neler Yapıyoruz?
              </h2>
              <div className="third-section-paragraph-header-style"></div>
            </div>
            <p className="third-section-paragraph">
              Akıllı scrapperlar ile büyük ya da küçük tüm şirketlerin kendi
              kariyer sayfalarındaki dağınık iş ilanlarını derler.
            </p>
            <p className="third-section-paragraph">
              Kerbb login gerektirmez, sayfaya girer girmez ilan tarama ve iş
              arama süreci başlar.
            </p>
            <p className="third-section-paragraph">
              Sunduğu içeriklerle, kariyerinin başındaki kişilerin iş arayış
              süreçlerini optimize eder, stresleirini azaltır.
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-navi-container">
        <div className="bottom-navi-first">
          <div className="bottom-navi-first-logo-container">
            <div className="logo-container">
              <h1 className="logo-header">Kerbb</h1>
              <div className="logo"></div>
            </div>
            <h1 className="par">
              Şirketlerin kariyer platformlarındaki ilanları keşfet!
            </h1>
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

export default AboutPage;
