import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Carousel.scss";
import { Link } from "react-router-dom";

export default class Carousel2 extends Component {
  render() {
    return (
      <Carousel
        className="main-slide"
        useKeyboardArrows={true}
        showIndicators={false}
        showStatus={false}
        autoPlay={true}
        preventMovementUntilSwipeScrollTolerance={true}
      >
        <div className="carousel-box">
          <div className="carousel-content-container">
            <div className="carousel-text">
              <p>
                <span>Hayalindeki iş </span> her gün gezdiğin kariyer
                platformlarında yoksa
              </p>
            </div>
            <div>
              <Link to="/dashboard/search">
                <button className="carousel-button">
                  <h1 className="carousel-button-text">Aramaya başla</h1>
                </button>
              </Link>
            </div>
          </div>
          <img
            className="carousel-image"
            src={require("../../common/images/banner_1_image.jpg")}
          />
        </div>
        <div className="carousel-box">
          <div className="carousel-content-container">
            <div className="carousel-text">
              <h1 className="carousel-text-header">
                Yüzlerce kariyer sayfasını tek tek dolaşma!
              </h1>
              <p className="carousel-text-par">
                İş ararken site site dolaşmaktan yorulduysan Kerbb'ü dene!
                Profil oluşturmak YOK, üyelik oluşturmak YOK!
              </p>
            </div>
            <div>
              <Link to="/dashboard/search">
                <button className="carousel-button">
                  <h1 className="carousel-button-text">Aramaya başla</h1>
                </button>
              </Link>
            </div>
          </div>
          <img
            className="carousel-image"
            src={require("../../common/images/banner_2_image.jpg")}
          />
        </div>
        <div className="carousel-box">
          <div className="carousel-content-container">
            <div className="carousel-text">
              <p>
                <span>TEK TIKLA </span> yüzlerce kariyer sayfasını arıyorsan
              </p>
            </div>
            <div>
              <Link to="/dashboard/search">
                <button className="carousel-button">
                  <h1 className="carousel-button-text">Aramaya başla</h1>
                </button>
              </Link>
            </div>
          </div>
          <img
            className="carousel-image"
            src={require("../../common/images/banner_3_image.jpg")}
          />
        </div>
      </Carousel>
    );
  }
}
