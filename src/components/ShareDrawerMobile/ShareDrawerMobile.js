import React, { useEffect, useState } from "react";
import "./ShareDrawerMobile.scss";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  InstapaperShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
} from "react-share";
import { useDispatch, useSelector } from "react-redux";
import {
  getShareDrawerCompany,
  updateShareDrawerCompany,
  updateShareMobileOpen,
} from "../../features/shareDrawer/shareDrawerSlice";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import { updateSnackBar } from "../../features/snackbar/snackbarSlice";
import { ColorExtractor } from "react-color-extractor";

const ShareDrawerMobile = () => {
  const dispatch = useDispatch();
  const [colors, setColors] = useState(null);
  const handleCopyClipboard = (link) => {
    navigator.clipboard.writeText(link);
    dispatch(
      updateSnackBar({
        open: true,
        type: "success",
        message: "Link kopyalandı",
      })
    );
  };
  const handleShareDrawerClose = () => {
    dispatch(updateShareMobileOpen(false));
    // setTimeout(() => {
    //   dispatch(updateShareDrawerCompany({}));
    // }, 500);
  };
  const handleShareDrawerCloseByLink = () => {
    setTimeout(() => {
      dispatch(updateShareMobileOpen(false));
    }, 100);
  };
  useEffect(() => {
    if (colors !== null && colors.length > 0) {
      document.getElementById(
        "logo-container"
      ).style.backgroundImage = `radial-gradient( circle farthest-corner at 22.4% 21.7%, #ffffff 0%, ${colors[0]} 100.2%`;
    }
  }, [colors]);
  const shareDrawerCompany = useSelector(getShareDrawerCompany);
  return (
    <div className="share-drawer-mobile-container">
      <div className="share-drawer-header-container">
        <h4 className="share-drawer-header">Şunu paylaşıyorsun:</h4>
        <div
          className="share-drawer-close-button-container"
          onClick={() => handleShareDrawerClose()}
        >
          <CloseIcon fontSize="medium" />
        </div>
      </div>
      <div className="share-drawer-first-section-container">
        <div className="share-drawer-logo-image-container" id="logo-container">
          <ColorExtractor getColors={setColors}>
            <img
              src={
                shareDrawerCompany.logo_image_url !== ""
                  ? shareDrawerCompany.logo_image_url
                  : process.env.PUBLIC_URL + "/no-image.png"
              }
              alt=""
            />
          </ColorExtractor>
        </div>
        <div className="share-drawer-second-section-container">
          <div className="share-drawer-company-info">
            {/* <div className="share-drawer-company-logo-container">
              <img
                src={
                  shareDrawerCompany.logo_image_url !== ""
                    ? shareDrawerCompany.logo_image_url
                    : process.env.PUBLIC_URL + "/no-image.png"
                }
                alt=""
              />
            </div> */}
            <div className="share-drawer-company-name-container">
              <h2 className="share-drawer-company-name">
                {shareDrawerCompany.name}
              </h2>
              {/* <h2 className="share-drawer-company-name-divider">|</h2> */}
              <h4 className="share-drawer-company-info-header">
                {`(${shareDrawerCompany.job_count}) ${shareDrawerCompany.name} İş İlanları`}
              </h4>
            </div>
          </div>
        </div>
        <div className="share-drawer-third-section-container">
          <ul className="share-drawer-socials-list">
            <li
              className="share-drawer-socials-item copy-link"
              onClick={handleShareDrawerCloseByLink}
            >
              <div
                className="copy-link-icon-container"
                onClick={() =>
                  handleCopyClipboard(
                    `https://kerbb.com/dashboard/companies/${shareDrawerCompany._id}`
                  )
                }
              >
                <LinkIcon fontSize="small" />
              </div>
              <div className="share-drawer-socials-item-header-container">
                <h5 className="share-drawer-socials-item-header">Kopyala</h5>
              </div>
            </li>
            <li
              className="share-drawer-socials-item"
              onClick={handleShareDrawerCloseByLink}
            >
              <EmailShareButton
                url={`https://kerbb.com/dashboard/companies/${shareDrawerCompany._id}`}
              >
                <div className="share-drawer-socials-item-icon-container">
                  <EmailIcon borderRadius={30} size="40px" />
                </div>
                <div className="share-drawer-socials-item-header-container">
                  <h5 className="share-drawer-socials-item-header">E-posta</h5>
                </div>
              </EmailShareButton>
            </li>
            <li
              className="share-drawer-socials-item"
              onClick={handleShareDrawerCloseByLink}
            >
              <TwitterShareButton
                url={`https://kerbb.com/dashboard/companies/${shareDrawerCompany._id}`}
              >
                <div className="share-drawer-socials-item-icon-container">
                  <TwitterIcon borderRadius={30} size="40px" />
                </div>
                <div className="share-drawer-socials-item-header-container">
                  <h5 className="share-drawer-socials-item-header">Twitter</h5>
                </div>
              </TwitterShareButton>
            </li>
            <li
              className="share-drawer-socials-item"
              onClick={handleShareDrawerCloseByLink}
            >
              <FacebookShareButton
                url={`https://kerbb.com/dashboard/companies/${shareDrawerCompany._id}`}
              >
                <div className="share-drawer-socials-item-icon-container">
                  <FacebookIcon borderRadius={30} size="40px" />
                </div>
                <div className="share-drawer-socials-item-header-container">
                  <h5 className="share-drawer-socials-item-header">Facebook</h5>
                </div>
              </FacebookShareButton>
            </li>
            <li
              className="share-drawer-socials-item"
              onClick={handleShareDrawerCloseByLink}
            >
              <LinkedinShareButton
                url={`https://kerbb.com/dashboard/companies/${shareDrawerCompany._id}`}
              >
                <div className="share-drawer-socials-item-icon-container">
                  <LinkedinIcon borderRadius={30} size="40px" />
                </div>
                <div className="share-drawer-socials-item-header-container">
                  <h5 className="share-drawer-socials-item-header">LinkedIn</h5>
                </div>
              </LinkedinShareButton>
            </li>
            <li
              className="share-drawer-socials-item"
              onClick={handleShareDrawerCloseByLink}
            >
              <WhatsappShareButton
                url={`https://kerbb.com/dashboard/companies/${shareDrawerCompany._id}`}
              >
                <div className="share-drawer-socials-item-icon-container">
                  <WhatsappIcon borderRadius={30} size="40px" />
                </div>
                <div className="share-drawer-socials-item-header-container">
                  <h5 className="share-drawer-socials-item-header">WhatsApp</h5>
                </div>
              </WhatsappShareButton>
            </li>
            <li
              className="share-drawer-socials-item"
              onClick={handleShareDrawerCloseByLink}
            >
              <TelegramShareButton
                url={`https://kerbb.com/dashboard/companies/${shareDrawerCompany._id}`}
              >
                <div className="share-drawer-socials-item-icon-container">
                  <TelegramIcon borderRadius={30} size="40px" />
                </div>
                <div className="share-drawer-socials-item-header-container">
                  <h5 className="share-drawer-socials-item-header">Telegram</h5>
                </div>
              </TelegramShareButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShareDrawerMobile;
