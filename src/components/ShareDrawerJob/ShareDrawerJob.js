import React, { useEffect, useState } from "react";
import "./ShareDrawerJob.scss";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  TelegramShareButton,
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
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import { updateSnackBar } from "../../features/snackbar/snackbarSlice";
import {
  getShareDrawerJob,
  updateShareDrawerJob,
  updateShareJobOpen,
} from "../../features/shareDrawerJob/shareDrawerJobSlice";
import { ColorExtractor } from "react-color-extractor";

const ShareDrawerJob = () => {
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
    dispatch(updateShareJobOpen(false));
    // setTimeout(() => {
    //   dispatch(updateShareDrawerJob({}));
    // }, 500);
  };
  const handleShareDrawerJobCloseByLink = () => {
    setTimeout(() => {
      dispatch(updateShareJobOpen(false));
    }, 100);
  };
  useEffect(() => {
    if (colors !== null && colors.length > 0) {
      document.getElementById(
        "logo-container"
      ).style.backgroundImage = `radial-gradient( circle farthest-corner at 22.4% 21.7%, #ffffff 0%, ${colors[0]} 100.2%`;
    }
  }, [colors]);
  const shareDrawerJob = useSelector(getShareDrawerJob);
  return (
    <div className="share-drawer-job-container">
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
                shareDrawerJob.job_company.logo_image_url !== ""
                  ? shareDrawerJob.job_company.logo_image_url
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
                  shareDrawerJob.job_company.logo_image_url !== ""
                    ? shareDrawerJob.job_company.logo_image_url
                    : process.env.PUBLIC_URL + "/no-image.png"
                }
                alt=""
              />
            </div> */}
            <div className="share-drawer-company-name-container">
              <h2 className="share-drawer-company-name">
                {shareDrawerJob.job_company.name}
              </h2>
              {/* <h2 className="share-drawer-company-name-divider">|</h2> */}
              <h4 className="share-drawer-company-info-header">
                {`${shareDrawerJob.job_title}`}
              </h4>
            </div>
          </div>
        </div>
        <div className="share-drawer-third-section-container">
          <ul className="share-drawer-socials-list">
            <li
              className="share-drawer-socials-item copy-link"
              onClick={handleShareDrawerJobCloseByLink}
            >
              <div
                className="copy-link-icon-container"
                onClick={() =>
                  handleCopyClipboard(`${shareDrawerJob.job_link}`)
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
              onClick={handleShareDrawerJobCloseByLink}
            >
              <EmailShareButton url={`${shareDrawerJob.job_link}`}>
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
              onClick={handleShareDrawerJobCloseByLink}
            >
              <TwitterShareButton url={`${shareDrawerJob.job_link}`}>
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
              onClick={handleShareDrawerJobCloseByLink}
            >
              <FacebookShareButton url={`${shareDrawerJob.job_link}`}>
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
              onClick={handleShareDrawerJobCloseByLink}
            >
              <LinkedinShareButton url={`${shareDrawerJob.job_link}`}>
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
              onClick={handleShareDrawerJobCloseByLink}
            >
              <WhatsappShareButton url={`${shareDrawerJob.job_link}`}>
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
              onClick={handleShareDrawerJobCloseByLink}
            >
              <TelegramShareButton url={`${shareDrawerJob.job_link}`}>
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

export default ShareDrawerJob;
