import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    fetch("https://geolocation-db.com/json/").then((result) => {
      result.json().then((res) => {
        console.warn(res.city);
        setSearch(res.city);
      });
    });
  }, []);
  useEffect(() => {
    const getcitydata = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=05f900ede40e39dd6f06d664b729c68f&units=metric`;

      const result = await fetch(url);
      const res = await result.json();
      setCity(res.main);
    };
    getcitydata();
  }, [search]);
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4">
            <div className="card text-center">
              <h2 className="title">Weather</h2>
              <input
                type="search"
                placeholder="Search City"
                name="city_name"
                id="cityname"
                autoCorrect="false"
                autoComplete="off"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              ></input>

              <div className="weather-data">
                {!city ? (
                  <h3>No City Found</h3>
                ) : (
                  <div>
                    <h3>
                      <i className="fas fa-map-marker-alt"></i>
                      &nbsp;{search}
                    </h3>
                    <h3>{city.temp}&nbsp;°C</h3>
                  </div>
                )}
              </div>
              <div>
                <svg
                  className="waves"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 24 150 28"
                  preserveAspectRatio="none"
                  shape-rendering="auto"
                >
                  <defs>
                    <path
                      id="gentle-wave"
                      d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                  </defs>
                  <g className="parallax">
                    <use
                      xlinkHref="#gentle-wave"
                      x="48"
                      y="0"
                      fill="rgba(255,255,255,0.7"
                    />
                    <use
                      xlinkHref="#gentle-wave"
                      x="48"
                      y="3"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <use
                      xlinkHref="#gentle-wave"
                      x="48"
                      y="5"
                      fill="rgba(255,255,255,0.3)"
                    />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
