import React, { useState } from "react";
import { useEffect } from "react";
import "./Illustration.scss";

const Illustration = ({ companies }) => {
  const [currentCompanies, setCurrentCompanies] = useState([]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    setCurrentCompanies(shuffle(companies).slice(0, 10));
  }, [companies]);

  useEffect(() => {
    const MINUTE_MS = 5000;

    const interval = setInterval(() => {
      currentCompanies.forEach((company) => {
        const element = document.getElementById(company._id);
        element.style.top = `${generateRandom(0, 75)}%`;
        element.style.left = `${generateRandom(0, 75)}%`;
      });
    }, MINUTE_MS);

    return () => clearInterval(interval);
  });

  // useEffect(() => {
  //   let comps = [];
  //   let randomInt = generateRandom(0, companies.length);
  //   while (comps.length < 10) {
  //     comps.push(companies[randomInt]);
  //   }
  //   setCurrentCompanies(comps);
  // }, []);

  const generateRandom = (min = 0, max = 100) => {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
  };
  return (
    <div className="illustration">
      {currentCompanies.length > 0 ? (
        <ul className="companies-list">
          {currentCompanies.map((company) => {
            return (
              <a href={`/dashboard/companies/${company._id}`} key={company._id}>
                <li
                  className="companies-item"
                  key={company._id}
                  id={company._id}
                  style={{
                    top: `${generateRandom(0, 75)}%`,
                    left: `${generateRandom(0, 75)}%`,
                  }}
                >
                  <img
                    src={
                      company.logo_image_url === ""
                        ? process.env.PUBLIC_URL + "/no-image.png"
                        : company.logo_image_url
                    }
                    alt=""
                  />
                </li>
              </a>
            );
          })}
        </ul>
      ) : (
        <ul className="companies-list-none">
          {Array.from({ length: 20 }, (_, i) => {
            return (
              <li
                className="companies-item"
                style={{
                  top: `${generateRandom(0, 75)}%`,
                  left: `${generateRandom(0, 75)}%`,
                }}
              >
                <img src={process.env.PUBLIC_URL + "/no-image.png"} alt="" />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Illustration;
